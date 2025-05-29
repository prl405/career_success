from fastapi import FastAPI, HTTPException, APIRouter
from keras.models import load_model
from app.schemas.request import RequestModel
from app.schemas.response import ResponseModel
from starlette.middleware.cors import CORSMiddleware
import numpy as np

# Initialise the FastAPI
app = FastAPI(title="Career Success API", description="A simple AI-powered REST API with FastAPI that predicts an indiviual's career succes.")

# Load the saved AI model
ai_model = load_model('model_data/career_success_model.keras')

# Prefix the appilcation path
prefix_router = APIRouter(prefix="/career_success")

# Health check endpoint
@prefix_router.get("/")
def root():
    return {"health_check": "OK"}

# Career success prediction endpoint
@prefix_router.post("/predict", response_model=ResponseModel)
def predict(request: RequestModel):
    try:
        prediction = round(float(ai_model.predict(map_request_to_ai(request).reshape(1, -1))[0][0]), 2)
        return ResponseModel(salary=prediction)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

origins = [
    "http://localhost",
    "http://localhost:5173",
]

# Include router
app.include_router(prefix_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def map_request_to_ai(request: RequestModel):
    # Order of AI data features

    # Age	High_School_GPA	SAT_Score	University_GPA	Internships_Completed	
    # Projects_Completed	Certifications	Soft_Skills_Score	Networking_Score	
    # Starting_Salary	Gender_Female	Gender_Male	Gender_Other	
    # Field_of_Study_Arts	Field_of_Study_Business	Field_of_Study_Computer Science	
    # Field_of_Study_Engineering	Field_of_Study_Law	Field_of_Study_Mathematics	
    # Field_of_Study_Medicine
    
    ai_input = np.zeros(19)
    ai_input[0] = (request.age - 18) / (30 - 18)
    ai_input[1] = request.high_school_gpa / 4
    ai_input[2] = (request.sat - 400) / (1600 - 400)
    ai_input[3] = request.university_gpa / 4
    ai_input[4] = (request.internships - 1.9822) / 1.408219
    ai_input[5] = (request.projects - 4.5628) / 2.872927
    ai_input[6] = (request.certifications - 2.5122) / 1.703183
    ai_input[7] = request.soft_skills / 10
    ai_input[8] = request.networking / 10

    match request.gender:
        case 'female':
            ai_input[9] = 1
        case 'male':
            ai_input[10] = 1
        case 'other':
            ai_input[11] = 1

    match request.field:
        case 'arts':
            ai_input[12] = 1
        case 'business':
            ai_input[13] = 1
        case 'computer_science':
            ai_input[14] = 1
        case 'engineering':
            ai_input[15] = 1
        case 'law':
            ai_input[16] = 1
        case 'mathematics':
            ai_input[17] = 1
        case 'medicine':
            ai_input[18] = 1
   
    return ai_input