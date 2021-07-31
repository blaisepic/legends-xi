import scrape
import requests
from bs4 import BeautifulSoup
import re
from nltk.tokenize import regexp_tokenize
import psycopg2
import getpass

# with open('fifa-data', 'r') as f:
#     reader = csv.reader(f)
#     for row in reader:
#         print(row)
players = []
playerLinks = []

def createTable():
    password = getpass.getpass("Password: ")
    conn = psycopg2.connect("host=localhost dbname=fifa user=blaise password=" + password)
    cur = conn.cursor()
    print("executing...")
    cur.execute("""
        CREATE TABLE players(
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

def insertIntoTable(players):
    password = getpass.getpass("Password: ")
    conn = psycopg2.connect("host=localhost dbname=fifa user=blaise password=" + password)
    cur = conn.cursor()
    print("executing...")
    for player in players:
        insert_query1 = "Insert into players VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)" 
        insert_query2 = (player.key, player.name, player.pos, player.overall, 
        player.attributes["ball_skills"], player.attributes["defence"], 
        player.attributes["mental"], player.attributes["passing"], 
        player.attributes["physical"], player.attributes["shooting"], 
        player.attributes["goalkeeper"])

        cur.execute(insert_query1, insert_query2)

    conn.commit()

def playerLinkFinder(url): #given page, find all player links
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    ageElements = soup.find_all("td", {"data-title": "Age"})

    players = []

    for e in ageElements:
        players.append(e.parent)

    for e in players:
        playerLinks.append("https://www.fifaindex.com" + e.find('a', {"class": "link-player"}).get("href"))



def main():
    playerList = ["https://www.fifaindex.com/players/?page=2&order_by=overallrating&order=0",
    "https://www.fifaindex.com/players/?page=3&order_by=overallrating&order=0",
    "https://www.fifaindex.com/players/?page=4&order_by=overallrating&order=0",
    "https://www.fifaindex.com/players/?page=5&order_by=overallrating&order=0",
    "https://www.fifaindex.com/players/?page=6&order_by=overallrating&order=0",
    "https://www.fifaindex.com/players/?page=7&order_by=overallrating&order=0"]


    for link in playerList:
        playerLinkFinder(link)
    
    for link in playerLinks:
        print(link)
        print("_____________________")
        players.append(scrape.getAttributes(link, True))

    # scrape.printPlayers(players)
    scrape.createTable()
    scrape.insertIntoTable(players)
    


    # for link in playerLinks:
    #     print("I am here...")
    #     print(link)
    #     players.append(scrape.getAttributes(link, False))

    # createTable()
    # insertIntoTable(players)


    #     link = "https://www.fifaindex.com/players/?page=2&order_by=overallrating&order=0"
    
   
    # playerLinkFinder(link)



if __name__ == "__main__":
    main()
