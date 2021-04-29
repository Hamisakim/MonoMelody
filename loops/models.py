from django.db import models
# from django.contrib.postgres.fields import JSONField
from django.db.models import JSONField
# from django.contrib.postgres.fields import ArrayField   

class Loop(models.Model):
    title = models.CharField(max_length=50, null=True, unique=True) #//! change to required 
    steps = models.CharField(max_length=2000000)
    bpm = models.IntegerField(default=120)
    synth = models.CharField(max_length=50, default="fmSynth")
    key = models.CharField(max_length=10, default="c")
    scale = models.CharField(max_length=50, default="major")
    effect = models.CharField(max_length=500, default="freeverb")
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        # related_name='created_loops',
        related_name='loops_created',
        on_delete = models.CASCADE
    ) 
    genres = models.ManyToManyField('genres.Genre', related_name="loops")

    # comments
    # likes 

    def __str__(self):
        return f"{self.title} by {self.owner}"
















# class loop_data(models.Model):
#         steps = models.CharField(max_length=50, null=True, unique=True),
#         bpm = models.IntegerField(null=True,),
#         volume = models.IntegerField(null=True,),
#         synth = models.IntegerField(null=True,),
#         attack = models.IntegerField(null=True,),
#         sustain = models.IntegerField(null=True,),
#         decay = models.IntegerField(null=True,),
#         release = models.IntegerField(null=True,),



# class Person(models.Model):
#     name = models.CharField(max_length=128)

#     def __str__(self):
#         return self.name

# class Group(models.Model):
#     name = models.CharField(max_length=128)
#     members = models.ManyToManyField(Person, through='Membership')

#     def __str__(self):
#         return self.name




# class Membership(models.Model):
#     person = models.ForeignKey(Person, on_delete=models.CASCADE)
#     group = models.ForeignKey(Group, on_delete=models.CASCADE)
#     date_joined = models.DateField()
#     invite_reason = models.CharField(max_length=64)
