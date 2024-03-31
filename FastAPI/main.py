from fastapi import FastAPI, Depends, HTTPException, Query
from database import create_connection, upsert_player_data
from riot_api import get_riot_account_info, get_summoner_info


app = FastAPI()

def get_db():
    try:
        db = create_connection()
        yield db
    finally:
        db.close()


@app.get('/player/')
async def get_player(name: str = Query(...), tag: str = Query(...)):
    player_data = await get_riot_account_info(name, tag)

    puuid = player_data.get('puuid')

    if puuid:
        summoner_info = await get_summoner_info(puuid)

        player_data.update({
            'accountId': summoner_info.get('accountId'),
            'profileIconId': summoner_info.get('profileIconId'),
            'summonerLevel': summoner_info.get('summonerLevel')
        })
    else:
        raise HTTPException(status_code=404, detail='Player no Found')
    
    upsert_player_data(player_data)
    
    return player_data

