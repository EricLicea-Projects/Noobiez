from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from database import *
from riot_api import *


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


@app.get('/riotAPI/player/')
async def get_player(gameName: str = Query(...), tagLine: str = Query(...)):
    player_data = await get_riot_account_info(gameName, tagLine)

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


@app.get('/riotAPI/matches/')
async def get_matches(puuid: str = Query(...)):
    match_ids = await get_match_ids(puuid)
    if match_ids:
        new_match_ids = filter_existing_matches(match_ids)
        if not new_match_ids:
            return {"message": "No new matches to process."}

        # matches_data = []
        for match_id in new_match_ids:
            match_data = await get_match_data(match_id)
            insert_match_data(match_data)
            # matches_data.append(match_data)
        return {"new_match_data": new_match_ids}
    else:
        raise HTTPException(status_code=400, detail="Player not Found")
    

@app.get("/noobiez/player")
async def read_player(gameName: str = Query(...), tagLine: str = Query(...)):
    player_info = get_player_info(gameName, tagLine)
    if player_info:
        return player_info
    else:
        return await get_player(gameName, tagLine)


@app.get('/noobiez/matches')
async def read_matches(puuid: str = Query(...)):
    matches_data = fetch_player_games(puuid)
    if matches_data:
        return matches_data
    else:
        return await get_matches(puuid)
