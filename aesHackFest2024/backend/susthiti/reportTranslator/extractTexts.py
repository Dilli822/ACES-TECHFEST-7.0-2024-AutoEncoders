import cv2
import pytesseract
import os
from datetime import datetime
import json
import logging
from gtts import gTTS  # Import gTTS for text-to-speech conversion
from pydub import AudioSegment  # Import pydub for audio manipulation

class TextExtractor:
    def __init__(self, output_dir="extracted_texts"):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.results_dir = os.path.join(output_dir, f"extraction_{timestamp}")
        os.makedirs(self.results_dir, exist_ok=True)

    def extract_text_from_image(self, image_path):
        try:
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError(f"Could not load image from: {image_path}")

            # Perform OCR on the image
            text = pytesseract.image_to_string(image)
            return text
        except Exception as e:
            self.logger.error(f"Error in text extraction: {str(e)}")
            return None

    def extract_and_save(self, image_path=None):
        try:
            if image_path is None:
                raise ValueError("No image path provided.")

            extracted_text = self.extract_text_from_image(image_path)
            if extracted_text is None:
                raise ValueError("Text extraction failed")

            # Save the extracted text
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
            
        except Exception as e:
            self.logger.error(f"Error processing the image: {str(e)}")
            return None, {'success': False, 'error': str(e)}

def text_to_speech(text, save_path="output.mp3"):
    """Convert the provided text to speech and save it as an mp3 file."""
    try:
        # Initialize gTTS engine and save speech to an mp3 file with standard voice and speed
        tts = gTTS(text, lang='en', slow=False)  # Standard speed (1x)
        tts.save(save_path)
        print(f"Speech saved to {save_path}")
        
        # Adjust playback speed to 1x (no speed change)
        audio = AudioSegment.from_mp3(save_path)
        audio = audio.speedup(playback_speed=1.0)  # 1.0 is the standard playback speed (no change)
        audio.export(save_path, format="mp3")
        print(f"Playback speed set to 1x for: {save_path}")

    except Exception as e:
        print(f"Error in text-to-speech conversion: {str(e)}")

# Example usage
if __name__ == "__main__":
    # Provide the local image path here
    image_path = "img2_processed.png"  # Replace with the actual path to your image file

    extractor = TextExtractor()
    extracted_text, info = extractor.extract_and_save(image_path=image_path)
    
    if info['success']:
        print("Extracted Text:")
        print(extracted_text)
        print("Metadata saved in:", info['text_file'])    

        # Save the extracted text as speech in an mp3 file with standard voice and speed
        if extracted_text:  # Check if text extraction was successful
            audio_file_path = os.path.join(extractor.results_dir, "extracted_text.mp3")
            text_to_speech(extracted_text, save_path=audio_file_path)
        else:
            print("No text was extracted from the image.")
    else:
        print("Error:", info['error'])
