from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from .models import CustomUser
from rest_framework import serializers


class CustomUserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'password', 'first_name', 'last_name')

class CustomUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name')

