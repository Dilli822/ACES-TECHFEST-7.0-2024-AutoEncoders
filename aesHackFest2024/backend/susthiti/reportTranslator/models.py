from django.db import models
from django.conf import settings  # Import settings to access AUTH_USER_MODEL
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver

import re  # Add this import statement

# Function to split text into sentences using regex
def split_into_sentences(text):
    # Regular expression pattern to split sentences by period, exclamation mark, or question mark
    sentences = re.split(r'(?<=\w[.!?])\s+', text.strip())
    return sentences


def validate_mp3_file(value):
    """
    Validator to ensure only MP3 files are uploaded.
    """
    if not value.name.endswith('.mp3'):
        raise ValidationError("Only MP3 files are allowed.")
    return value



class TextAndAudio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='text_and_audio_records', help_text="The user who owns this record.")
    text = models.TextField(help_text="Store your text here.")  # Field to store the text
    audio = models.FileField(
        upload_to='audio_files/', 
        validators=[validate_mp3_file], 
        blank=True,  # Allow the field to be blank (optional)
        null=True,  # Allow the field to be null (optional)
        help_text="Upload an MP3 file. This field is optional."
    )  # Field to store the MP3 file

    # New fields for sentences, final analysis, and diabetes diagnosis
    sentences = models.JSONField(blank=True, null=True, help_text="Store sentences after splitting text.")  # Store the sentences in JSON format
    final_analysis = models.TextField(blank=True, null=True, help_text="Store the analysis result of the text.")  # Final analysis based on the text
    diabetes_diagnosis = models.JSONField(blank=True, null=True, help_text="Store diabetes diagnosis for each sentence.")  # Store diagnosis for each sentence

    created_at = models.DateTimeField(auto_now_add=True, help_text="Date and time the record was created.")
    updated_at = models.DateTimeField(auto_now=True, help_text="Date and time the record was last updated.")

    def __str__(self):
        return f"TextAndAudio {self.id} - {self.user.username} - {self.created_at}"


# Function to analyze the text and create final analysis
def analyze_text(text):
    # Here you can perform further analysis, for example, checking for key words, performing sentiment analysis, etc.
    # For this example, we are just returning a basic analysis of word count and sentence count
    word_count = len(text.split())
    sentence_count = len(split_into_sentences(text))
    
    # Example analysis (you can modify it based on your needs)
    analysis = f"Word Count: {word_count}\nSentence Count: {sentence_count}"
    return analysis

# Function to analyze diabetes status based on ADA criteria in a sentence
def analyze_diabetes_status(sentence):
    # Define thresholds based on ADA criteria
    low_threshold = 70  # Low blood sugar threshold (example)
    high_threshold = 126  # High blood sugar threshold for FBS (example)
    
    # Look for blood sugar values in the sentence
    match = re.search(r'(FBS|RBS)\s*[:\-]?\s*(\d+)', sentence)
    
    if match:
        # Extract the blood sugar value
        blood_sugar = int(match.group(2))
        
        # Determine the diabetes status based on the value
        if blood_sugar < low_threshold:
            return "Low Blood Sugar"
        elif blood_sugar >= high_threshold:
            return "High Blood Sugar"
        else:
            return "Normal Blood Sugar"
    
    return "No Blood Sugar Data"


from django.db.models.signals import pre_save
from django.dispatch import receiver
from langdetect import detect
from django.core.exceptions import ValidationError

@receiver(pre_save, sender=TextAndAudio)
def process_text(sender, instance, **kwargs):
    if instance.text:
        # Check if the text is in English
        try:
            language = detect(instance.text)
            if language != 'en':
                raise ValidationError("The text is not in English. Please upload a clean and clear report in English.")
        except Exception as e:
            raise ValidationError("Error in detecting language: " + str(e))

        # Split text into sentences
        sentences = split_into_sentences(instance.text)
        
        # Perform final analysis of the text
        final_analysis = analyze_text(instance.text)
        
        # Analyze each sentence for diabetes status
        diabetes_diagnosis = []
        for sentence in sentences:
            diagnosis = analyze_diabetes_status(sentence)
            diabetes_diagnosis.append(diagnosis)
        
        # Save the results in the model fields
        instance.sentences = sentences
        instance.final_analysis = final_analysis
        instance.diabetes_diagnosis = diabetes_diagnosis



from django.db import models

class TextInput(models.Model):
    text = models.TextField()  # Original input text
    translated_text = models.TextField(blank=True, null=True)  # Optional translated text
    voice_url = models.URLField(blank=True, null=True)  # Optional voice URL

    def __str__(self):
        return self.text[:50]  # Display first 50 characters in the admin panel
