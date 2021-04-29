from jwt_auth.serializers.common import UserSerializer
from .common  import CommentSerializer

class PopulatedCommentSerializer(CommentSerializer):
    owner = UserSerializer()