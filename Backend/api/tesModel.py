import json
import requests


url = ' http://127.0.0.1:8000/predict_donation'

input_data_for_model = {
    
   'age' : 0.328767 ,
    'workclass' : 0 ,
    'education' : 2 ,
    'marital_status' : 2,
    'relationship' : 1,
    'sex' : 1,
    'hours_per_week' : 0.244898
    
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)

print(response.text)