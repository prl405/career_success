from fastapi import FastAPI, HTTPException
from keras.models import load_model
from app.schemas.request import RequestModel
from app.schemas.response import ResponseModel
import numpy as np

# Initialise the FastAPI
app = FastAPI(title="Career Success API", description="A simple AI-powered REST API with FastAPI that predicts an indiviual's career succes.")

# Load the saved AI model
ai_model = load_model('model_data/career_success_model.keras')

# # Include routers
# app.include_router(predict.router, prefix="/api")

# Health check endpoint
@app.get("/")
def root():
    return {"health_check": "OK"}

# Career success prediction endpoint
@app.post("/predict", response_model=ResponseModel)
def predict(request: RequestModel):
    try:
        prediction = ai_model.predict(map_request_to_ai(request))
        return ResponseModel(prediction[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def map_request_to_ai(request: RequestModel):
    # This must transform the request cats and scale

    # Order of AI data features

    # Age	High_School_GPA	SAT_Score	University_GPA	Internships_Completed	
    # Projects_Completed	Certifications	Soft_Skills_Score	Networking_Score	
    # Starting_Salary	Gender_Female	Gender_Male	Gender_Other	
    # Field_of_Study_Arts	Field_of_Study_Business	Field_of_Study_Computer Science	
    # Field_of_Study_Engineering	Field_of_Study_Law	Field_of_Study_Mathematics	
    # Field_of_Study_Medicine
    
    ai_input = np.zeros(18)
    ai_input[0] = (request.age - 18) / (30 - 18)
    ai_input[1] = request.high_school_gpa / 4
    ai_input[2] = (request.sat - 400) / (1600 - 400)
    ai_input[3] = request.university_gpa / 4
    ai_input[3] = (request.interships - 1.9822) / 1.408219
    ai_input[4] = (request.projects - 4.5628) / 2.872927
    ai_input[5] = (request.certifications - 2.5122) / 1.703183
    ai_input[6] = request.soft_skills / 10
    ai_input[7] = request.networking / 10

    match request.gender:
        case 'female':
            ai_input[8] = 1
        case 'male':
            ai_input[9] = 1
        case 'other':
            ai_input[10] = 1

    match request.field:
        case 'arts':
            ai_input[11] = 1
        case 'business':
            ai_input[12] = 1
        case 'computer_science':
            ai_input[13] = 1
        case 'engineering':
            ai_input[14] = 1
        case 'law':
            ai_input[15] = 1
        case 'mathematics':
            ai_input[16] = 1
        case 'medicine':
            ai_input[17] = 1
   
    return ai_input