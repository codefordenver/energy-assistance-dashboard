from typing import Any
from pydantic import BaseModel

class GenericResponse(BaseModel):
  message: str

class CountyResponse(GenericResponse):
  data: Any
  last_updated: str = ""