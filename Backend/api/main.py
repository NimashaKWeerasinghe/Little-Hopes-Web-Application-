from fastapi import FastAPI,Form
import uvicorn
from typing import Annotated
from pydantic import BaseModel
import pickle
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
     "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# loading the saved model
model = pickle.load(open('donation_prediction_model.sav', 'rb'))

# Defining the model input types
class model_input(BaseModel):
    
    age : float
    workclass : int
    education : int
    marital_status : int
    relationship : int
    sex : int
    hours_per_week : float


# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to online employee hireability prediction model"}


@app.post('/predict_donation')
async def  get_predict(data : model_input):
    
     sample = [[
        data.age,
        data.workclass,
        data.education,
        data.marital_status,
        data.relationship,
        data.sex,
        data.hours_per_week
    ]]
    
     hired = model.predict(sample).tolist()[0]
    
     return {
        "data": {
            'prediction': hired,
            'interpretation': 'Will not give donation' if hired == 1 else 'will give donation.'
        }
    }

# Configuring the server host and port
if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8080)