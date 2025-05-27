from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import CareerSurvey, Details
from .serializers import DetailsSerializer, UserSerializer, CareerSurveySerializer
from .ml_utils.career_predict import predict_career
from rest_framework.permissions import AllowAny
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

User = get_user_model()

class DetailsCreateView(generics.CreateAPIView):
    serializer_class = DetailsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class CareerSurveyCreateView(generics.CreateAPIView):
    serializer_class = CareerSurveySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        try:
            survey = CareerSurvey.objects.get(user=user)
            serializer.instance = survey  
            serializer.update(survey, serializer.validated_data)
        except CareerSurvey.DoesNotExist:
            serializer.save(user=user)

class CareerSurveyDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            survey = CareerSurvey.objects.get(user=request.user)
        except CareerSurvey.DoesNotExist:
            return Response({"detail": "CareerSurvey not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = CareerSurveySerializer(survey)
        return Response(serializer.data)

    def put(self, request):
        try:
            survey = CareerSurvey.objects.get(user=request.user)
        except CareerSurvey.DoesNotExist:
            return Response({"detail": "CareerSurvey not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = CareerSurveySerializer(survey, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CareerPredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            survey = CareerSurvey.objects.get(user=request.user)
        except CareerSurvey.DoesNotExist:
            return Response({"detail": "CareerSurvey not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            prediction = predict_career(survey)
        except FileNotFoundError as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except RuntimeError as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "predicted_category": prediction.get("predicted_category"),
            "suggested_roles": prediction.get("possible_roles", [])
        })

class ChatWithGeminiView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_input = request.data.get("message")
        if not user_input:
            return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=user_input
            )

            return Response({"reply": response.text})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)