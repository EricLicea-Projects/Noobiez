from fastapi import FastAPI, Depends, HTTPException, Query
from database import create_connection
from config_loader import API_KEY
import httpx

app = FastAPI()

def get_db():
    try:
        db = create_connection()
        yield db
    finally:
        db.close()

async def get_riot_account_info(name: str, tag: str):
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{name}/{tag}"
    headers = {"X-Riot-Token": API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch player data.")

async def get_summoner_info(puuid: str):
    url = f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    headers = {"X-Riot-Token": API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

@app.get('/player/')
async def get_player(name: str = Query(...), tag: str = Query(...)):
    player_data = await get_riot_account_info(name, tag)

    puuid = player_data.get('puuid')

    if puuid:
        summoner_info = await get_summoner_info(puuid)

        player_data.update({
            'accountID': summoner_info.get('accountId'),
            'profileIconId': summoner_info.get('profileIconId'),
            'summonerLevel': summoner_info.get('summonerLevel')
        })
    else:
        raise HTTPException(status_code=404, detail='Player no Found')
    
    return player_data

