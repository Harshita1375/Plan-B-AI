from django.urls import path
from .views import (
    DetailsCreateView,
    CareerPredictionView,
    CareerSurveyCreateView,
    CareerSurveyDetailView,
    ChatWithGeminiView
)

urlpatterns = [
    path('', DetailsCreateView.as_view(), name='create-details'),  # matches /api/details/
    path('predict-career/', CareerPredictionView.as_view(), name='predict-career'),
    path('career-survey/', CareerSurveyCreateView.as_view(), name='career-survey'),
    path('career-survey/detail/', CareerSurveyDetailView.as_view(), name='career-survey-detail'),
    path('chat/', ChatWithGeminiView.as_view(), name='gemini-chat'),
]
