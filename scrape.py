import requests
from bs4 import BeautifulSoup
import re
from nltk.tokenize import regexp_tokenize
import psycopg2
import getpass

legendLinks = []
playerLinks = []
legends = []
players = []
key = 0

class Player:
    def __init__(self, key, name, pos, overall, attributes):
        self.key = key
        self.name = name
        self.pos = pos
        self.overall = overall
        self.attributes = attributes

# called by toLinkFinder, gets all individual links to legend pages
def legendLinkFinder(url): #given page, find all player links for legends
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    ageElements = soup.find_all("td", {"data-title": "Age"})

    legends = []

    # find the elements with age > 38
    for e in ageElements:
        if int(e.text) > 38:
            legends.append(e.parent)

    for e in legends:
        legendLinks.append("https://www.fifaindex.com" + e.find('a', {"class": "link-player"}).get("href"))

# called by linkFinder, gets all individual links to player pages
def playerLinkFinder(url): #given page, find all player links
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    ageElements = soup.find_all("td", {"data-title": "Age"})

    players = []

    for e in ageElements:
        players.append(e.parent)

    for e in players:
        playerLinks.append("https://www.fifaindex.com" + e.find('a', {"class": "link-player"}).get("href"))

def getSoup(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    return soup

# this is where the magic happens
def getAttributes(url): # given a link for a player, find that players attributes
    soup = getSoup(url)
    attributes = {}
    name, pos, overall = "", [], 0
    nameList, attList = [], []

    masonry = soup.select('span[class*="badge"]')
    # for m in masonry:
    #     print(m.parent.parent.text)
    #     print("______________")


    for idx, m in enumerate(masonry): 
        attribute = regexp_tokenize(m.parent.parent.text, "[\D]+")
        attribute = str(attribute[0]).strip()
        if attribute == "Ball Control":
            nameList = masonry[:idx]
            attList = masonry[idx:]
            break

    for att in attList:
        value = regexp_tokenize(att.parent.parent.text, "[\d]+")
        if len(value) > 0: value = int(value[0])
        attribute = regexp_tokenize(att.parent.parent.text, "[\D]+")
        attribute = str(attribute[0]).strip()
        attributes[attribute] = (value)
        
    for idx, e in enumerate(nameList):
        attribute = regexp_tokenize(e.parent.parent.text, "[\D]+")
        attribute = str(attribute[0]).strip()

        if idx == 1:
            name = getName(attribute)
            overall = regexp_tokenize(e.parent.parent.text, "[\d]+")[0]
        if idx == 2: 
            pos = getPosition(attribute)

    global key
    key += 1
    return Player(key, name, pos, overall, compressAttributes(attributes))

def getListOfAttributes(attributes):
    dict = []
    for e in attributes:
        dict.append(e)

    return dict

def getName(string):
    arr = re.split("\d", string)
    return arr[0]

def getPosition(pos):
    posSplit = "GK|RB|RWB|LB|LWB|CB|CDM|CM|CAM|RW|LW|RM|LM|CF|ST"
    return regexp_tokenize(pos, posSplit)

# pass this function a list of the pages containing the players (or legends)
def toLinkFinder(listOfLinks, ifLegend):
    for link in listOfLinks:
        if ifLegend:
            legendLinkFinder(link)
        else:
            playerLinkFinder(link)

def createTable():
    password = getpass.getpass("Password: ")
    conn = psycopg2.connect("host=localhost dbname=fifa user=blaise password=" + password)
    cur = conn.cursor()
    print("executing...")
    cur.execute("""
        CREATE TABLE legends(
            id integer PRIMARY KEY,
            name text,
            pos text,
            overall integer,
            ball_skills integer,
            defence integer,
            mental integer,
            passing integer,
            physical integer,
            shooting integer,
            goalkeeper integer
    )
    """)

    conn.commit()

# TODO: differentiate between legend and player compress functions
# takes all the attributes and compresses them into 7 primary categories
def compressAttributes(att): 
    newAttributes = {}
    newAttributes["ball_skills"] = round((att["Ball Control"] + 
    att["Dribbling"]) / 2, 0)

    newAttributes["defence"] = round((att["Marking"] + att["Slide Tackle"] + 
    att["Stand Tackle"]) / 3, 0)

    newAttributes["mental"] = round((att["Aggression"] + att["Reactions"] +
    att["Att. Position"] + att["Interceptions"] + att["Vision"] + 
    att["Composure"]) / 6, 0)

    newAttributes["passing"] = round((att["Crossing"] + att["Short Pass"] +
    att["Long Pass"]) / 3, 0)

    newAttributes["physical"] = round((att["Acceleration"] + att["Stamina"] + 
    att["Strength"] + att["Balance"] + att["Sprint Speed"] + 
    att["Agility"] + att["Jumping"]) / 7, 0)

    newAttributes["shooting"] = round((att["Heading"] + att["Shot Power"] + 
    att["Finishing"] + att["Long Shots"] + att["Curve"] + 
    att["FK Acc."] + att["Penalties"] + att["Volleys"]) / 8, 0)

    newAttributes["goalkeeper"] = round((att["GK Positioning"] + att["GK Diving"] + 
    att["GK Handling"] + att["GK Kicking"] + att["GK Reflexes"]) / 5, 0)

    return newAttributes

def main():
    legendList = ["https://www.fifaindex.com/players/?order_by=overallrating&order=0", 
    "https://www.fifaindex.com/players/?page=2&order_by=overallrating&order=0"]
    toLinkFinder(legendList, True)

    playerList = ["https://www.fifaindex.com/players/fifa05_1/", 
    "https://www.fifaindex.com/players/fifa05_1/?page=2",
    "https://www.fifaindex.com/players/fifa05_1/?page=3",
    "https://www.fifaindex.com/players/fifa05_1/?page=4"]
    toLinkFinder(playerList, False)

    # for link in legendLinks:
    #     legends.append(getAttributes(link))

    # createTable()

    # # for link in playerLinks:
    # #     players.append(getAttributes(link))

    # listOfAttributes = getListOfAttributes(legends[0].attributes)
    # print(listOfAttributes)

    # for player in legends:
    #     print(player.key)
    #     print(player.name)
    #     print(player.pos)
    #     print(player.overall)
    #     print(player.attributes)
    #     print("________________________")


if __name__ == "__main__":
    main()
