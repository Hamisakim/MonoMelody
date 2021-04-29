from .common import UserSerializer
from loops.serializers.common import LoopSerializer

class PopulatedUserSerializer(UserSerializer):

    loops_created = LoopSerializer(many=True)