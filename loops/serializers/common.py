from rest_framework import serializers 
from ..models import Loop 

class LoopSerializer(serializers.ModelSerializer):

    class Meta:
        model = Loop 
        fields = '__all__'