from django.urls import path
from .views import (
    CareerPredictionView, CareerSurveyCreateView, CareerSurveyDetailView
)

urlpatterns = [
    path('predict-career/', CareerPredictionView.as_view(), name='predict-career'),
    path('career-survey/', CareerSurveyCreateView.as_view(), name='career-survey'),
    path('career-survey/detail/', CareerSurveyDetailView.as_view(), name='career-survey-detail'),
]