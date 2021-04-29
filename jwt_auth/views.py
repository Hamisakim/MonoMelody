from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from .serializers.common import UserSerializer, EditUserSerializer
from .serializers.populated import PopulatedUserSerializer

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        # run user through serializer
        user_to_create = UserSerializer(data=request.data)
        # check if user is valid
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
    def post(self, request):
        print('request:🟨 ', request.data)
        # get some data off the request
        username = request.data.get('username')
        email = request.data.get('email')
        print('email: ', email)
        print('username: ', username)
        password = request.data.get('password')
        # get user from the db
        try:
            user_to_login = User.objects.get(username=username)
            # user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid credentials")
        if not user_to_login.check_password(password): # check password against hashed version in db
            raise PermissionDenied(detail="Invalid credentials")
        
        dt = datetime.now() + timedelta(days=7) # generate expiry for token

        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY, 
            algorithm='HS256'
        )

        return Response({'token': token, 'message': f'Welcome back {user_to_login.first_name}'})


class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)


class UserDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_user(self, pk):
        try:
            print("🚀 User found")
            return User.objects.get(pk=pk) 
        except User.DoesNotExist:
            print("🆘 Cannot find that user")
            raise NotFound(detail="🆘 Cannot find that user")

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        user_to_delete = self.get_user(pk=pk)
        user_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        user_to_edit = self.get_user(pk=pk)
        print('user_to_edit: 😎', user_to_edit)
        updated_user = EditUserSerializer(user_to_edit, data=request.data)
        print('updated_user: 🤣', updated_user)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)