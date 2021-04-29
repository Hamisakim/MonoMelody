from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    profile_image = models.CharField(max_length=300, null=True)
    location = models.CharField(max_length=300, null=True)
    bio = models.TextField(max_length=600, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.username}"

