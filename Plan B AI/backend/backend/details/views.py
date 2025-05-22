from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Details
from .serializers import DetailsSerializer

class DetailsCreateView(generics.CreateAPIView):
    serializer_class = DetailsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)