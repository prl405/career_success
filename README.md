# Career Success AI API + SPA

The goal of this mini project is create an AI REST API with a complementry SPA (WIP) that allows an indiviudual to query a prediction for their starting salary based on their educational background and career experience.

The data used to train this model was taken from a submittion from the open resource: https://www.kaggle.com/datasets/adilshamim8/education-and-career-success

The `/api` directory consists of:

1. Data Preprocessing and training the neural network model using Keras; see 'ai_model'
2. API creating using FastAPI; see 'app'
3. Manual testing the API locally; see 'manual_test.ipynb'

The `/spa` directory consists of:

1. A SPA built using React with Typescript which provides a UI for a user to input their educational and career background to use the backend API.
2. SPA unit tests

#### Running the API and SPA

To test both the API and SPA together you will need to run each component on separate terminals.

### Run the API:
1. Navigate to the `/api/app` directory
2. Run the command `fastapi dev main.py` to start the backend locally
3. Run the `manual_test` notebook to test the api

### Run the SPA:
1. Navigate to the `/spa` directory
2. Run the command `npm run dev` to start the UI on http://localhost:5173/
3. Run the command `npm test` to run unit tests

### Project Extensions:
- Deploy to a containerised environment
- Build a UI to interact with the API ✔
- Build a test framework
- Integrate with a data pipeline so that the model represents the latest data