from rest_framework import serializers
from .models import Details

class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = '__all__'
        read_only_fields = ['user']