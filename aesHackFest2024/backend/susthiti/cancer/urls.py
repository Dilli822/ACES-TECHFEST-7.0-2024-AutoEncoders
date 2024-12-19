from django.urls import path
from .views import CancerPredictionView

urlpatterns = [
    path('predict-cancer/', CancerPredictionView.as_view(), name='predict-cancer'),
]
