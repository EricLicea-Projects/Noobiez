import httpx
from config.config_loader import API_KEY

async def fetch_from_riot_api(url: str):
    headers = {"X-Riot-Token": API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()


async def get_riot_account_info(name: str, tag: str):
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{name}/{tag}"
    return await fetch_from_riot_api(url)


async def get_summoner_info(puuid: str):
    url = f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    return await fetch_from_riot_api(url)


async def get_match_ids(puuid: str) -> list:
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids"
    return await fetch_from_riot_api(url)
