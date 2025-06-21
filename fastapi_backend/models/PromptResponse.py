from pydantic import BaseModel

class PromptResponse(BaseModel):
    has_issue: bool
    suggested_email: str
