import google.generativeai as genai
from typing import Optional
import os
import json
import re
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

        with open("prompts/system_prompt.txt", "r") as prompt_file:
            self.system_prompt = prompt_file.read()

    def _clean_response(self, text: str) -> str:
            """Clean up the model's response by removing markdown and ensuring valid JSON."""
            # Remove markdown code blocks if present
            clean_text = re.sub(r'```json\s*|\s*```', '', text)

            try:
                # Try to parse and re-serialize to ensure valid JSON
                parsed = json.loads(clean_text)
                return json.dumps(parsed)
            except json.JSONDecodeError:
                # If that fails, try to extract just the JSON object
                json_match = re.search(r'{.*}', clean_text, re.DOTALL)
                if json_match:
                    return json_match.group(0)
                raise ValueError(f"Could not extract valid JSON from response: {text}")

    async def review_email(self, request: PromptRequest) -> dict | PromptResponse:
        prompt = f"""
        {self.system_prompt}

        Input email:
        {request.content}
        """
        response = self.model.generate_content(
            prompt,
        )

        try:
            # Clean and parse the response
            clean_json = self._clean_response(response.text)


            # Parse the response into your Pydantic model
            result = PromptResponse.model_validate_json(clean_json)  # type: ignore
            return result

        except Exception as e:
            # Fallback response if parsing fails
            return PromptResponse(
                has_issue=True,
                reason=["error"],
                suggested_email="Error parsing model response: " + str(e)
            )
