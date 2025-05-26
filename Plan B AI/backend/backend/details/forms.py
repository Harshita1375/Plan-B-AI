from django import forms
from .models import ExtendedProfile

class ExtendedProfileForm(forms.ModelForm):
    class Meta:
        model = ExtendedProfile
        exclude = ['user']  # user will be set in the view, not from form input
