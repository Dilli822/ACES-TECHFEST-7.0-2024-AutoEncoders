from django.urls import path
from .views import *

urlpatterns = [
    path('outcome/', ImageTextToSpeech.as_view(), name='extract-text'),
    path('text-and-audio/<int:pk>/', TextAndAudioView.as_view(), name='text_and_audio_detail'),
    path('text-and-audio/', TextAndAudioView.as_view(), name='text_and_audio_create'),  # For creating new records
    path('submit-text/', TextInputView.as_view(), name='submit-text'),
]
