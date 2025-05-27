import os
import joblib
from django.conf import settings

def predict_career(survey):
    model_path = os.path.join(settings.BASE_DIR, 'ml_models', 'career_model.pkl')
    
    if not os.path.exists(model_path):
        raise FileNotFoundError("Model file not found.")

    try:
        model = joblib.load(model_path)
    except Exception as e:
        raise RuntimeError(f"Failed to load model: {e}")

    features = [
        survey.total_cgpa,
        survey.logical_quotient_rating,
        survey.hackathons,
        survey.coding_skills_rating,
        survey.public_speaking_points
        # Add more fields here if your model uses them
    ]

    try:
        prediction = model.predict([features])[0]
    except Exception as e:
        raise RuntimeError(f"Prediction error: {e}")

    return prediction
