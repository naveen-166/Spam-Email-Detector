from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Load the pre-trained model
model_filename = './model/spam_detection_model.pkl'  # Fixed file path

try:
    clf = joblib.load(model_filename)
except Exception as e:
    print(f"Error loading model: {e}")
    clf = None

@app.route('/predict', methods=['POST'])
def predict():
    if clf is None:
        print("Model not found")
        return jsonify({'error': 'Model not loaded'}), 500
    data = request.json
    print("Model loaded")
    emails = data.get('emails', [])
    
    if not emails:
        return jsonify({'error': 'No emails provided'}), 400
    
    # Here you might want to preprocess emails if necessary
    try:
        predictions = clf.predict(emails)
        results = ['It is a Spam Email' if pred == 1 else 'Original Mail' for pred in predictions]
        return jsonify({'predictions': results})
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {e}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

