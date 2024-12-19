from rest_framework import serializers
from .models import TextAndAudio

class TextAndAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextAndAudio
        fields = '__all__'  # Include all fields in the model

    def validate_audio(self, value):
        """
        Ensure that only MP3 files are uploaded.
        """
        if not value.name.endswith('.mp3'):
            raise serializers.ValidationError("Only MP3 files are allowed.")
        return value


from rest_framework import serializers
from .models import TextInput

class TextInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextInput
        fields = ['id', 'text', 'translated_text', 'voice_url']
        extra_kwargs = {
            'translated_text': {'required': False},  # Make it optional
            'voice_url': {'required': False},        # Make it optional
        }
