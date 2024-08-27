import streamlit as st
import joblib
import requests
import json

# Load the pre-trained model
model_filename = 'model/spam_detection_model.pkl'
try:
    clf = joblib.load(model_filename)
except Exception as e:
    st.error(f"Error loading model: {e}")
    clf = None

# Define the prediction function
def predict_spam(emails):
    if clf is None:
        st.error("Model not loaded")
        return []

    if not emails:
        st.warning("No emails provided")
        return []

    try:
        predictions = clf.predict(emails)
        results = ['It is a Spam Email' if pred == 1 else 'Original Mail' for pred in predictions]
        return results
    except Exception as e:
        st.error(f'Prediction failed: {e}')
        return []

# Streamlit app
st.title('Spam Email Classifier')

# Input text for emails
emails_input = st.text_area("Enter emails (one per line):")

if st.button('Classify'):
    if emails_input:
        # Split input by lines to get individual emails
        emails = emails_input.split('\n')
        predictions = predict_spam(emails)

        # Display results
        for email, prediction in zip(emails, predictions):
            st.write(f"Email: {email}")
            st.write(f"Prediction: {prediction}")
    else:
        st.warning("Please enter some emails to classify.")
