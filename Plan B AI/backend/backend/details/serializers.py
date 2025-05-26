from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Details, CareerSurvey


User = get_user_model()


class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = '__all__'
        read_only_fields = ['user']

class UserSerializer(serializers.ModelSerializer):
    details = DetailsSerializer(read_only=True)  # nested serializer

    class Meta:
        model = User
        fields = ['id', 'email', 'details']


class CareerSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerSurvey
        exclude = ['user'] 
