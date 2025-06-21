from pydantic import BaseModel
from typing import Optional

class PromptRequest(BaseModel):
    email_content: str
    temperature: Optional[float] = 0.1
