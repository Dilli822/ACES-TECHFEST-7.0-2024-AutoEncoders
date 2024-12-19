from django.urls import path
from .views import CancerPredictionView  # Import the view

urlpatterns = [
    path('predict-diabetes/', CancerPredictionView.as_view(), name='predict-diabetes'),  # Define your endpoint
]
