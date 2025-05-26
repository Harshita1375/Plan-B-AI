import pickle
import json
import pandas as pd
from scipy.sparse import hstack

class CareerPredictor:
    def __init__(self):
        with open('details/ml_utils/final_model.sav', 'rb') as f:
            self.model = pickle.load(f)

        with open('details/ml_utils/encoder.pkl', 'rb') as f:
            self.encoder = pickle.load(f)

        with open('details/ml_utils/scaler.pkl', 'rb') as f:
            self.scaler = pickle.load(f)

        with open('details/ml_utils/job_categories.json', 'r') as f:
            self.job_categories = json.load(f)

    def preprocess(self, survey):
        data = {
            'Total CGPA': survey.total_cgpa,
            'Logical quotient rating': survey.logical_quotient_rating,
            'hackathons': survey.hackathons,
            'coding skills rating': survey.coding_skills_rating,
            'public speaking points': survey.public_speaking_points,
            'can work long time before system?': survey.can_work_long_time_before_system,
            'self-learning capability?': survey.self_learning_capability,
            'certifications': survey.certifications,
            'reading and writing skills': survey.reading_and_writing_skills,
            'memory capability score': survey.memory_capability_score,
            'Interested subjects': survey.interested_subjects,
            'interested career area': survey.interested_career_area,
            'Job/Higher Studies?': survey.job_or_higher_studies,
            'Type of company want to settle in?': survey.type_of_company_want_to_settle,
            'interested in games': survey.interested_in_games,
            'Interested Type of Books': survey.interested_type_of_books,
            'Salary Range Expected': survey.salary_range_expected,
            'Gentle or Tuff behaviour?': survey.gentle_or_tuff_behaviour,
            'Management or Technical': survey.management_or_technical,
            'worked in teams ever?': survey.worked_in_teams_ever,
            'Introvert': survey.introvert,
        }

        df = pd.DataFrame([data])

   
        full_data = self.encoder.transform(df) 

        X_scaled = self.scaler.transform(full_data)

        return X_scaled

    def predict(self, survey):
        X = self.preprocess(survey)
        prediction = self.model.predict(X)
        category = prediction[0]

        import re

        category_normalized = re.sub(r'[^a-zA-Z0-9]', '', category).strip().lower()
        matched_roles = None

        for key, roles in self.job_categories.items():
            key_normalized = re.sub(r'[^a-zA-Z0-9]', '', key).strip().lower()
            if key_normalized == category_normalized:
                matched_roles = roles
                break

        if not matched_roles:
            matched_roles = self.job_categories.get("Others", ["Others"])
        print("Predicted category:", category)
        print("Matched roles:",matched_roles)
    
        print("Available categories in JSON:", list(self.job_categories.keys()))
        return {"predicted_category": category, "possible_roles": matched_roles}

predictor = CareerPredictor()

def predict_career(survey):
    return predictor.predict(survey)
