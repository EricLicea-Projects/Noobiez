from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from database import create_connection, upsert_player_data, get_player_info
from riot_api import get_riot_account_info, get_summoner_info, get_match_ids, get_match_data


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


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


@app.get("/players/")
async def read_player(gameName: str = Query(...), tagLine: str = Query(...)):
    player_info = get_player_info(gameName, tagLine)
    if player_info:
        return player_info
    else:
        raise HTTPException(status_code=404, detail="Player not found")


@app.get('/matches/')
async def get_matches(puuid: str = Query(...)):
    match_ids = await get_match_ids(puuid)
    if match_ids:
        first_match_data = await get_match_data(match_ids[0])
        return first_match_data
    else:
        raise HTTPException(status_code=400, detail="Player not Found")