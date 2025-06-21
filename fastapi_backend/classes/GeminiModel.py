import google.genai as genai
from typing import Optional
import os
from models.PromptRequest import PromptRequest
from models.PromptResponse import PromptResponse

class GeminiModel:
    def __init__(self):
        self._google_api_key: str | None = os.getenv("GOOGLE_API_KEY")

        if not self._google_api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set")
            return

        genai.configure(api_key=self._google_api_key) # type: ignore
        self.model = genai.GenerativeModel('gemini-2.5-flash') # type: ignore

        with open("fastapi_backend/prompts/system_prompts.txt", "r") as prompt_file:
            self.system_prompt = prompt_file.read()

    async def review_email(self, request: PromptRequest) -> dict | PromptResponse:
        prompt = f"""
        {self.system_prompt}

        Input email:
        {request.content}
        """
        response = self.model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.1,
                "top_p": 0.8
            }
        )

        try:
            # Parse the response into your Pydantic model
            result = PromptResponse.model_validate_json(response.text)  # type: ignore
            return result

        except Exception as e:
            # Fallback response if parsing fails
            return PromptResponse(
                has_issue=True,
                reason="error",
                suggested_email="Error parsing model response: " + str(e)
            )
