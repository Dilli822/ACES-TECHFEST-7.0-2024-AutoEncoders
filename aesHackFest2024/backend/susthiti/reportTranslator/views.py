
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
from django.conf import settings
import cv2
import pytesseract
from datetime import datetime
import json
from gtts import gTTS  # Import gTTS for text-to-speech conversion
from pydub import AudioSegment  # Import pydub for audio manipulation

class TextExtractor:
    def __init__(self, output_dir="extracted_texts"):
        self.logger = logging.getLogger(__name__)
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.results_dir = os.path.join(output_dir, f"extraction_{timestamp}")
        os.makedirs(self.results_dir, exist_ok=True)

    def extract_text_from_image(self, image_path):
        image = cv2.imread(image_path)
        if image is None:
            return None
        text = pytesseract.image_to_string(image)
        return text

    def extract_and_save(self, image_path=None):
        if image_path is None:
            return None, {'success': False, 'error': 'No image path provided.'}

        extracted_text = self.extract_text_from_image(image_path)
        if extracted_text is None:
            return None, {'success': False, 'error': 'Text extraction failed'}

        text_file = os.path.join(self.results_dir, 'extracted_text.txt')
        with open(text_file, 'w', encoding='utf-8') as f:
            f.write(extracted_text)

        info = {
            'timestamp': datetime.now().isoformat(),
            'text_file': text_file,
            'success': True
        }
        info_file = os.path.join(self.results_dir, 'info.json')
        with open(info_file, 'w', encoding='utf-8') as f:
            json.dump(info, f, indent=4)

        return extracted_text, info

def text_to_speech(text, save_path="output.mp3"):
    tts = gTTS(text, lang='en', slow=False)
    tts.save(save_path)

    audio = AudioSegment.from_mp3(save_path)
    audio = audio.speedup(playback_speed=1.0)
    audio.export(save_path, format="mp3")
    return save_path

class ImageTextToSpeech(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({"error": "No image file provided"}, status=status.HTTP_400_BAD_REQUEST)

        image = request.FILES['image']
        image_path = os.path.join(settings.MEDIA_ROOT, image.name)
        
        # Save the image file to the server
        with open(image_path, 'wb') as f:
            for chunk in image.chunks():
                f.write(chunk)

        # Extract text and process it
        extractor = TextExtractor()
        extracted_text, info = extractor.extract_and_save(image_path=image_path)

        if not extracted_text:
            return Response(info, status=status.HTTP_400_BAD_REQUEST)

        # Convert the text to speech
        audio_file_path = os.path.join(extractor.results_dir, "extracted_text.mp3")
        text_to_speech(extracted_text, save_path=audio_file_path)

        # Return the audio file as a response
        with open(audio_file_path, 'rb') as f:
            audio_data = f.read()

        return Response(audio_data, content_type="audio/mp3")







from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import TextAndAudio
from .serializers import TextAndAudioSerializer

class TextAndAudioView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    
    def get(self, request, pk, *args, **kwargs):
        """
        Retrieve the text and audio record for the authenticated user.
        """
        try:
            instance = TextAndAudio.objects.get(id=pk, user=request.user)
        except TextAndAudio.DoesNotExist:
            return Response({"error": "Record not found or you don't have permission to access it."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TextAndAudioSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        """
        Create a new text and audio record for the authenticated user.
        """
        data = request.data.copy()
        data['user'] = request.user.id  # Automatically set the user to the authenticated user
        
        serializer = TextAndAudioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, *args, **kwargs):
        """
        Update the text and audio record for the authenticated user.
        """
        try:
            instance = TextAndAudio.objects.get(id=pk, user=request.user)
        except TextAndAudio.DoesNotExist:
            return Response({"error": "Record not found or you don't have permission to modify it."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TextAndAudioSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        """
        Delete the text and audio record for the authenticated user.
        """
        try:
            instance = TextAndAudio.objects.get(id=pk, user=request.user)
        except TextAndAudio.DoesNotExist:
            return Response({"error": "Record not found or you don't have permission to delete it."}, status=status.HTTP_404_NOT_FOUND)
        
        instance.delete()
        return Response({"message": "Record deleted successfully."}, status=status.HTTP_204_NO_CONTENT)





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from googletrans import Translator
from gtts import gTTS
import os
from django.conf import settings
from django.http import HttpRequest
from .serializers import TextInputSerializer

class TextInputView(APIView):
    def post(self, request, *args, **kwargs):
        # Initialize the Google Translate translator
        translator = Translator()

        # Get the input text from the request data
        input_text = request.data.get('text', None)
        if not input_text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Translate the input text into Nepali (if it's not already Nepali)
        translated_text = None
        voice_url = None

        if 'translated_text' not in request.data:
            translated_text = self.translate_to_nepali(input_text, translator)

        # Generate Nepali voice from translated text if not provided
        if 'voice_url' not in request.data:
            voice_url = self.generate_nepali_voice(translated_text if translated_text else input_text, request)

        # Prepare the data to save
        data = {
            'text': input_text,
            'translated_text': translated_text if translated_text else None,
            'voice_url': voice_url if voice_url else None
        }

        # Serialize and save the data
        serializer = TextInputSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # Save the received text to the database
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def translate_to_nepali(self, text, translator):
        """
        This function translates the given text to Nepali using Google Translate API.
        """
        try:
            # Perform translation (translate to Nepali)
            translated = translator.translate(text, src='en', dest='ne')  # 'en' for English and 'ne' for Nepali
            return translated.text
        except Exception as e:
            # If translation fails, log the error and return the original text
            return f"Translation Error: {str(e)}"

    def generate_nepali_voice(self, text, request: HttpRequest):
        """
        This function generates a Nepali voice file using gTTS and returns the file URL.
        """
        try:
            tts = gTTS(text, lang='ne')  # Generate Nepali speech
            filename = f"nepali_voice_{hash(text)}.mp3"
            file_path = os.path.join(settings.MEDIA_ROOT, filename)
            tts.save(file_path)  # Save the audio file

            # Construct the absolute URL to access the audio file
            voice_url = request.build_absolute_uri(os.path.join(settings.MEDIA_URL, filename))
            return voice_url
        except Exception as e:
            return None
