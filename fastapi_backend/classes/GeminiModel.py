import google.genai as genai
import os

class GeminiModel:
    def __init__(self):
        self.google_api_key: str | None = os.getenv("GOOGLE_API_KEY")

        if not self.google_api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set")
            return

    def return_key(self):
        return self.google_api_key
