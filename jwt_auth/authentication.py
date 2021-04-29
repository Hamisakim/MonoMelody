from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
# * pipenv install pyjwt
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):
    
    def authenticate(self, request):
        # get token from request
        header = request.headers.get('Authorization')
        # if headers dont exist return none
        if not header:
            return None
        
        # if token is in wrong format, throw an error
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail='Invalid Auth token')

        # if bearer token exists, remove bearer space to leave just the token
        token = header.replace('Bearer ', '')

        try:
            # get payload from the token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            # get user from the db using sub from thte payload
            user = User.objects.get(pk=payload.get('sub'))
        # check that token is valid
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid token')
        except User.DoesNotExist:
            raise PermissionDenied(detail='User not found')
        
        return (user, token)

