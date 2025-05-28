from pydantic import BaseModel

class RequestModel(BaseModel):
    age: int
    gender: str
    high_school_gpa: float
    sat: int
    university_gpa: float
    field: str
    interships: int
    projects: int
    certifications: int
    soft_skills: int
    networking: int