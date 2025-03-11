# Career Success AI API

The goal of this mini project is create an AI REST API that allows an indiviudual to query a prediction for their starting salary based on their educational background and career experience.

This data used to train this model was taken from a submittion from the open resource: https://www.kaggle.com/datasets/adilshamim8/education-and-career-success

The project consists of:

1. Data Preprocessing and training the neural network model using Keras; see 'ai_model'
2. API creating using FastAPI; see 'app'
3. Manual testing the API locally; see 'manual_test.ipynb'

### Test the app:
1. Navigate to the 'app' directory
2. Run the command 'fastapi dev main.py'
3. Run the 'manual_test' notebook

### Project Extensions:
- Deploy to a containerised environment such as Docker
- Build a UI to interact with the API
- Build a test framework
- Integrate with a data pipeline so that the model represents the latest data