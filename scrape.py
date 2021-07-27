import requests
from bs4 import BeautifulSoup
import re
from nltk.tokenize import regexp_tokenize

legendLinks = []
playerLinks = []
legends = []
players = []

class Player:
    def __init__(self, name, pos, attributes):
        self.name = name
        self.pos = pos
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

def getAttributes(url): # given a link for a player, find that players attributes
    soup = getSoup(url)
    attributes = {}
    name = ""
    pos = []
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
        if idx == 2: 
            pos = getPosition(attribute)

    return Player(name, pos, attributes)


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

def main():
    legendList = ["https://www.fifaindex.com/players/?order_by=overallrating&order=0", 
    "https://www.fifaindex.com/players/?page=2&order_by=overallrating&order=0"]
    toLinkFinder(legendList, True)

    playerList = ["https://www.fifaindex.com/players/fifa05_1/", 
    "https://www.fifaindex.com/players/fifa05_1/?page=2",
    "https://www.fifaindex.com/players/fifa05_1/?page=3",
    "https://www.fifaindex.com/players/fifa05_1/?page=4"]
    toLinkFinder(playerList, False)

    # player = getAttributes(legendLinks[3])
    # print(player.name)
    # print(player.pos)
    # for link in legendLinks:
    #     legends.append(getAttributes(link))

    for link in playerLinks:
        players.append(getAttributes(link))

    for player in players:
        print(player.name)
        print(player.pos)
        print(player.attributes)


if __name__ == "__main__":
    main()
