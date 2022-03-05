from inspect import _void
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
from urllib.request import urlopen

payload={}
headers = {}

def getAPI(selectedDate: str, requestType: str) -> _void:
    url = "https://opendata.corona.go.jp/api/Covid19JapanAll?date=" + selectedDate
    print(url)
    response = requests.request(requestType, url, headers=headers, data=payload)
    info = response.json()
    with open("C:/Users/harur/react/three-app/frontend/src/data/covids.json", "w",encoding='utf-8') as outfile:
        json.dump(info, outfile, ensure_ascii=False)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.get("/info", tags=["todos"])
async def get_todos() -> dict:
    return info


@app.get("/covid", tags=["todos"])
def add_todo() -> dict:
    url = "https://opendata.corona.go.jp/api/Covid19JapanAll"
    response = requests.get(url)
    dateJson = response.json()
    #print(yDate, yDate)
    """ for t,y in zip(tDate['itemList'], yDate['itemList']):
        n = int(t['npatients']) - int(y['npatients'])
        t['npatients'] = str(n) """
    return dateJson