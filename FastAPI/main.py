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

@app.get('/')
async def hello():
    return {'Welcome to Snuggie Net'}


@app.get('/riotAPI/player/')
async def get_player(gameName: str = Query(...), tagLine: str = Query(...)):
    player_data = await get_riot_account_info(gameName, tagLine)

    puuid = player_data.get('puuid')

    if puuid:
        summoner_info = await get_summoner_info(puuid)

        player_data.update({
            'summonerId': summoner_info.get('id'),
            'accountId': summoner_info.get('accountId'),
            'profileIconId': summoner_info.get('profileIconId'),
            'summonerLevel': summoner_info.get('summonerLevel')
        })
    else:
        raise HTTPException(status_code=404, detail='Player no Found')
    
    upsert_player_data(player_data)
    
    summoner_rank_info = await get_summoner_rank(summoner_info.get('id'))
    ranked_solo_info = next((item for item in summoner_rank_info if item['queueType'] == 'RANKED_SOLO_5x5'), None)

    if ranked_solo_info:
        # Update player_data with tier and rank information
        player_data['tier'] = ranked_solo_info['tier']
        player_data['rank'] = ranked_solo_info['rank']
    else:
        # Optionally handle the case where RANKED_SOLO_5x5 data is not found
        player_data['tier'] = 'Unranked'
        player_data['rank'] = 'Unranked'

    return player_data

@app.get('/riotAPI/puuid/')
async def get_player_puuid(puuid: str = Query(...)):
    player_data = await get_riot_account_puuid(puuid)

    puuid = player_data.get('puuid')

    if puuid:
        summoner_info = await get_summoner_info(puuid)

        player_data.update({
            'summonerId': summoner_info.get('id'),
            'accountId': summoner_info.get('accountId'),
            'profileIconId': summoner_info.get('profileIconId'),
            'summonerLevel': summoner_info.get('summonerLevel')
        })
    else:
        raise HTTPException(status_code=404, detail='Player no Found')
    
    upsert_player_data(player_data)

    summoner_rank_info = await get_summoner_rank(summoner_info.get('id'))
    ranked_solo_info = next((item for item in summoner_rank_info if item['queueType'] == 'RANKED_SOLO_5x5'), None)

    if ranked_solo_info:
        # Update player_data with tier and rank information
        player_data['tier'] = ranked_solo_info['tier']
        player_data['rank'] = ranked_solo_info['rank']
    else:
        # Optionally handle the case where RANKED_SOLO_5x5 data is not found
        player_data['tier'] = 'Unranked'
        player_data['rank'] = 'Unranked'
    
    return player_data


@app.get('/riotAPI/liveGame')
async def live_game(puuid: str = Query(...)):
    live_game = await get_live_game(puuid)

    if live_game:
        if 'status' in live_game:
            return {}
        return live_game
    else:
        raise HTTPException(status_code=404, detail='No Game Found')
    


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
        print(new_match_ids)
        return await read_matches(puuid)
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
        raise HTTPException(status_code=400, detail="No Match Data")

@app.get("/noobiez/specialist")
async def get_win_rate():
    win_rate = find_proficient_players_for_all_champions()
    if win_rate:
        return win_rate
    else:
        raise HTTPException(status_code=400, detail='No Win Rate')