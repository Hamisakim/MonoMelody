from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Loop 
from .serializers.common import LoopSerializer
from .serializers.populated import PopulatedLoopSerializer


class LoopListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        loops = Loop.objects.all() # return everything from the db
        serialized_loops = PopulatedLoopSerializer(loops, many=True) # convert the data
        return Response(serialized_loops.data, status=status.HTTP_200_OK)

    def post(self, request):
        print('🟦 request post loop:', request.data)
        request.data["owner"] = request.user.id
        loop_to_add = LoopSerializer(data=request.data)
        print('loop_to_add ->', loop_to_add)

        if loop_to_add.is_valid():
            loop_to_add.save()
            print('🟩 loops-> view: Loop has saved',loop_to_add.data)
            return Response(loop_to_add.data, status=status.HTTP_201_CREATED)
        return Response(loop_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoopDetailView(APIView):
        # permission_classes = (IsAuthenticatedOrReadOnly,) 
    # //! Don't need authentication
    def get_loop(self, pk):
        try:
            print('🚀 Loop Found')
            return Loop.objects.get(pk=pk)
        except Loop.DoesNotExist:
            print("🆘 Cannot find that loop")
            raise NotFound(detail="🆘 Cannot find that loop")  

    def get(self, _request,pk):
        loop = self.get_loop(pk=pk)
        print('🟩 getting loop ->', loop)
        serialized_loop = PopulatedLoopSerializer(loop)
        return Response(serialized_loop.data, status=status.HTTP_200_OK)


