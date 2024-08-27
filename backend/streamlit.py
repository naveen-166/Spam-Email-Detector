

import streamlit as st
import joblib

# Load the pre-trained model
model_filename = 'model/spam_detection_model.pkl'
try:
    clf = joblib.load(model_filename)
except Exception as e:
    st.error(f"Error loading model: {e}")
    clf = None

# Define the prediction function
def predict_spam(text):
    if clf is None:
        st.error("Model not loaded")
        return []

    if not text:
        st.warning("No text provided")
        return []

    try:
        # Assuming the model expects a list of texts, even if it's a single entry
        predictions = clf.predict([text])
        result = 'It is a Spam Email' if predictions[0] == 1 else 'Original Mail'
        return result
    except Exception as e:
        st.error(f'Prediction failed: {e}')
        return "Prediction failed"

# Streamlit app
st.title('Spam Email Classifier')

# Input text for emails
emails_input = st.text_area("Enter your email text:")

if st.button('Classify'):
    if emails_input:
        # Pass the entire input text as one single email
        prediction = predict_spam(emails_input)

        # Display result
        st.write(f"Text: {emails_input}")
        st.write(f"Prediction: {prediction}")
    else:
        st.warning("Please enter some text to classify.")
