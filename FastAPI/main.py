from fastapi import FastAPI, Depends, HTTPException
from database import create_connection
from pydantic import BaseModel
from config_loader import API_KEY
import httpx

app = FastAPI()

class Player(BaseModel):
    name: str
    tag: str

def get_db():
    try:
        db = create_connection()
        yield db
    finally:
        db.close()


@app.get('/player/')
async def get_player(player: Player):
    pass

print(API_KEY)