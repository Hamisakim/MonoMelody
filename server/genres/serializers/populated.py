from .common import GenreSerializer
from loops.serializers.common import LoopSerializer

class PopulatedGenreSerializer(GenreSerializer):

    loops = LoopSerializer(many=True)