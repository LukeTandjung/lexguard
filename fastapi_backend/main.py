from fastapi import FastAPI
from classes.GeminiModel import GeminiModel
from models.PromptRequest import PromptRequest
from models.PromptResponse import PromptResponse

app = FastAPI(
    title="Lexguard API backend",
    description="For Cambridge Legal Hack",
    version="1.0.0"
)

@app.get("/review", response_model=PromptResponse)
async def review_email(request: PromptRequest):
    model = GeminiModel()
    response = await model.review_email(request)
    return response
