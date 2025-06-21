from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional

class PromptRequest(BaseModel):
    sender: EmailStr
    receiver: EmailStr
    session_id: UUID4
    title: str
    content: str
    status: str
