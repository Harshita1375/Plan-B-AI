from django.db import models
from django.conf import settings

class Details(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    college = models.CharField(max_length=255, blank=True, null=True)  
    degree = models.CharField(max_length=255, blank=True, null=True)   
    graduation_year = models.CharField(max_length=10, blank=True, null=True)  
    cgpa = models.CharField(max_length=10, blank=True, null=True) 
    skills = models.TextField(blank=True, null=True)  
    certifications = models.TextField(blank=True, null=True) 

    def __str__(self):
        return f"{self.user.email} - Profile Details"

class CareerSurvey(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_cgpa = models.FloatField()
    logical_quotient_rating = models.IntegerField()
    hackathons = models.IntegerField()
    coding_skills_rating = models.IntegerField()
    public_speaking_points = models.IntegerField()

    can_work_long_time_before_system = models.CharField(max_length=50)
    self_learning_capability = models.CharField(max_length=50)
    certifications = models.TextField()
    reading_and_writing_skills = models.CharField(max_length=100)
    memory_capability_score = models.CharField(max_length=50)
    interested_subjects = models.TextField()
    interested_career_area = models.CharField(max_length=100)
    job_or_higher_studies = models.CharField(max_length=50)
    type_of_company_want_to_settle = models.CharField(max_length=100)
    interested_in_games = models.CharField(max_length=50)
    interested_type_of_books = models.CharField(max_length=100)
    salary_range_expected = models.CharField(max_length=50)
    gentle_or_tuff_behaviour = models.CharField(max_length=50)
    management_or_technical = models.CharField(max_length=50)
    worked_in_teams_ever = models.CharField(max_length=50)
    introvert = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.email} - Career Options"