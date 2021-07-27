import requests
from bs4 import BeautifulSoup
import re
from nltk.tokenize import regexp_tokenize

legendLinks = []
playerLinks = []

class Player:
    def __init__(self, name, pos, attributes):
        self.name = name
        self.pos = pos
        self.attributes = attributes

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

def linkFinder(url): #given page, find all player links
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    ageElements = soup.find_all("td", {"data-title": "Age"})

    players = []

    for e in ageElements:
        players.append(e.parent)

    for e in players:
        playerLinks.append("fifaindex.com" + e.find('a', {"class": "link-player"}).get("href"))

def getSoup(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    return soup

def getAttributes(url): # given a link for a player, find that players attributes
    soup = getSoup(url)
    attributes = {}

    masonry = soup.select('span[class*="badge"]')
    for m in masonry: # TODO: figure out a way to skip to ball control
        value = regexp_tokenize(m.parent.parent.text, "[\d]+")
        if len(value) > 0: value = int(value[0])
        attribute = regexp_tokenize(m.parent.parent.text, "[\D]+")
        attribute = str(attribute[0]).strip()

        # print(m.parent.parent.text)
        # print("val: " + str(value))
        # print("att: " + attribute)
        attributes[attribute].append(value)
        
        # print("________________________________________")
    for att in attributes:
        print(att)
    # return url

def getName(string):
    print("tokenizing...")
    arr = re.split("\d", string)
    return arr[0]


def getPosition(pos):
    posSplit = "GK|RB|RWB|LB|LWB|CB|CDM|CM|CAM|RW|LW|RM|LM|CF|ST"

    print("tokenizing...")
    return regexp_tokenize(pos, posSplit)

def main():
    legendLinkFinder("https://www.fifaindex.com/players/?order_by=overallrating&order=0")
    legendLinkFinder("https://www.fifaindex.com/players/?page=2&order_by=overallrating&order=0")

    # for l in legendLinks:
        # print(l)

    print(getAttributes(legendLinks[0]))

    # getPosition("RWBRBCB")
    # getName("Pelé98 98")

if __name__ == "__main__":
    main()
