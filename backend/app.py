from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})

model = pickle.load(open('ml_model.pkl', 'rb'))

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
# Define a route for making predictions
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         print(data)
#         query_df = pd.DataFrame([data])
#         print(query_df.columns)
#         prediction = model.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)}),400


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Convert numeric fields properly
        data['Year'] = int(data['Year'])
        data['Present_Price'] = float(data['Present_Price'])
        data['Kms_Driven'] = int(data['Kms_Driven'])
        data['Owner'] = int(data['Owner'])
        data['Fuel_Type'] = int(data['Fuel_Type'])
        data['Seller_Type'] = int(data['Seller_Type'])
        data['Transmission'] = int(data['Transmission'])

        query_df = pd.DataFrame([data])

        prediction = model.predict(query_df)

        return jsonify({'Prediction': list(prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)