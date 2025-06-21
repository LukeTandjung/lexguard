from pydantic import BaseModel

class PromptResponse(BaseModel):
    has_issue: bool
    reason: list[str]
    suggested_email: str
