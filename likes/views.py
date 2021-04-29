from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# from django.db.models import Count
from django.db.models import Sum


from .models import Like
from loops.models import Loop
from loops.serializers.common import LoopSerializer
from loops.serializers.populated import PopulatedLoopSerializer

from .serializers.common import LikeSerializer
from .serializers.populated import PopulatedLikeSerializer


class LikeHandler(APIView):
    permission_classes = (IsAuthenticated,)

    def get_loop(self, pk):
        try:
            print(f'🚀 Loop Found likes')
            return Loop.objects.get(pk=pk)
        except Loop.DoesNotExist:
            print("🆘 Cannot find that loop to like")
            raise NotFound(detail="🆘 Cannot find that loop to like ")

    def post(self, request, pk):
        print('request: LIKING  🟩 ', request.user, 'PK', pk)
        loop_to_like = self.get_loop(pk=pk)
        result = Loop.objects.values(
            'likes').annotate(total_likes=Sum('likes'))
        # !! to get total like count, can we send this like a virtual field?
        like_count = Loop.objects.values('likes').count()
        count = Loop.objects.filter(likes__loop=loop_to_like).count()
        print('result: 🟫', like_count)
        print('result: 🟫', count)  # This one counts

        like_to_add = LikeSerializer(data=request.data)

        if like_to_add.is_valid():
            print('🐝')
            print('request.user.id: 🟥', request.user.id)
            like_to_add.save()
            return Response(like_to_add.data, status=status.HTTP_200_OK)
        # Get loop likes
        # check if theres a like with owner = to request owner
        # if true like.delete()
        # elis like.save()
        # like_to_add

        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)



    def get_like(self,pk):
        try:
            print(f'🚀 Loop Found likes')
            like_to_delete = Like.objects.get(pk=pk)
            print('like_to_delete: ', like_to_delete)
            return like_to_delete
        except Like.DoesNotExist:
            print("🆘 Cannot find that like to delete")
            raise NotFound(detail=" 🟥 No like to delete ")
    
    def delete(self, request, pk):
        like_to_delete = self.get_like(pk=pk)
        like_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
