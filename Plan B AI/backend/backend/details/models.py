from django.db import models
from django.conf import settings

class Details(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    college = models.CharField(max_length=255, blank=True, null=True)  # optional field
    degree = models.CharField(max_length=255, blank=True, null=True)   # optional field now
    graduation_year = models.CharField(max_length=10, blank=True, null=True)  # allow null for existing rows
    cgpa = models.CharField(max_length=10, blank=True, null=True)  # optional now
    skills = models.TextField(blank=True, null=True)  # optional
    certifications = models.TextField(blank=True, null=True)  # optional

    def __str__(self):
        return f"{self.user.email} - Profile Details"