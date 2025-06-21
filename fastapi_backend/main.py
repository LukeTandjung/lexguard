from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from classes.GeminiModel import GeminiModel
from models.PromptRequest import PromptRequest
from models.PromptResponse import PromptResponse

app = FastAPI(
    title="Lexguard API backend",
    description="For Cambridge Legal Hack",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

@app.post("/review", response_model=PromptResponse)
async def review_email(request: PromptRequest):
    model = GeminiModel()
    response = await model.review_email(request)

    return response
