from fastapi import FastAPI, HTTPException
from keras.models import load_model
from app.schemas.request_client_model import RequestModel
from schemas.response import ResponseModel

# Initialise the FastAPI
app = FastAPI(title="Career Success API", description="A simple AI-powered REST API with FastAPI that predicts an indiviual's career succes.")

# Load the saved AI model
ai_model = load_model('/model_data/career_success_model.keras')

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
        prediction = ai_model.predict(request.features)
        return ResponseModel(prediction=prediction[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def map_request_to_ai(request):

    return