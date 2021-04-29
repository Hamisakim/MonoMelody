from django.urls import path
from .views import LikeHandler

urlpatterns =[
    path('<int:pk>/', LikeHandler.as_view() )
]