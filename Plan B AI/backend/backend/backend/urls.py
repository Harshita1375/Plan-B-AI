"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from details.views import DetailsCreateView, UserProfileView, CareerSurveyCreateView, CareerSurveyDetailView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/details/', DetailsCreateView.as_view(), name='create-details'),
    path('api/profile/', UserProfileView.as_view(), name='user-profile'),
    path('career-survey/create/', CareerSurveyCreateView.as_view(), name='career-survey-create'),
    path('career-survey/', CareerSurveyDetailView.as_view(), name='career-survey-detail'),
    path('api/details/', include('details.urls')),


]
