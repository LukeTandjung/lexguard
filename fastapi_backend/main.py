from fastapi import FastAPI
from classes.GeminiModel import GeminiModel

app = FastAPI(
    title="Lexguard API backend",
    description="For Cambridge Legal Hack",
    version="1.0.0"
)

@app.get("/")
async def root():
    model = GeminiModel()
    return model.return_key()
