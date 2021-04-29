from django.urls import path
from .views import LoopListView, LoopDetailView

urlpatterns = [
    path('', LoopListView.as_view()),
    path('<int:pk>/', LoopDetailView.as_view())
]
