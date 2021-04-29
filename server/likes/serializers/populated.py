from jwt_auth.serializers.common import UserSerializer
from .common import LikeSerializer

class PopulatedLikeSerializer(LikeSerializer):
    owner = UserSerializer()
    # comments = PopulatedCommentSerializer(many=True)
    
