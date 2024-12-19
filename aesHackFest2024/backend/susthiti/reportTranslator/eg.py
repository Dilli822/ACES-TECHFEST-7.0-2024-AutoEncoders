import cv2
import numpy as np
import torch
import torchvision.transforms as transforms
from PIL import Image
from crnn_model import CRNN  # Assuming you have the CRNN model (you need to create or download it)

# Load the EAST pre-trained model for text detection
east_model_path = "frozen_east_text_detection.pb"
net = cv2.dnn.readNet(east_model_path)

# Function to decode predictions from EAST
def decode_predictions(scores, geometry, min_confidence=0.5):
    boxes = []
    confidences = []
    num_rows = scores.shape[2]
    num_cols = scores.shape[3]

    for y in range(num_rows):
        for x in range(num_cols):
            score = scores[0, 0, y, x]
            if score < min_confidence:
                continue
            offset_x, offset_y, angle, h, w = geometry[0, :, y, x]
            p1 = (int(x * 4 + offset_x), int(y * 4 + offset_y))
            p2 = (int((x + w) * 4 + offset_x), int((y + h) * 4 + offset_y))
            boxes.append([p1, p2])
            confidences.append(score)

    return boxes, confidences

# Function to detect text regions in the image using EAST
def detect_text_regions(image_path):
    image = cv2.imread(image_path)
    orig = image.copy()
    (H, W) = image.shape[:2]

    newW, newH = (int(W / 32) * 32, int(H / 32) * 32)
    image_resized = cv2.resize(image, (newW, newH))

    blob = cv2.dnn.blobFromImage(image_resized, 1.0, (newW, newH), (123.68, 116.78, 103.94), True, crop=False)
    net.setInput(blob)

    scores, geometry = net.forward(["feature_fusion/Conv_7/Sigmoid", "feature_fusion/concat_3"])
    
    boxes, confidences = decode_predictions(scores, geometry, 0.5)

    return boxes, confidences, orig

# Function to recognize text from image using CRNN
def recognize_text_from_image(image_path, model):
    image = Image.open(image_path).convert('L')  # Convert image to grayscale
    transform = transforms.Compose([transforms.Resize((32, 100)),
                                    transforms.ToTensor(),
                                    transforms.Normalize((0.5,), (0.5,))])  # Normalize the image
    image_tensor = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        output = model(image_tensor)
    
    # Decode the output from the model (this part will depend on the CRNN model output format)
    text = decode_output(output)
    return text

def decode_output(output):
    # Assuming the output is a list of character indices (this is model-dependent)
    decoded_text = ''.join([chr(i) for i in output[0]])  # Example, adjust based on your model output format
    return decoded_text

# Load pre-trained CRNN model (ensure you have a `.pth` file for your CRNN model)
crnn_model = CRNN()
crnn_model.load_state_dict(torch.load('crnn_pretrained_model.pth'))
crnn_model.eval()

# Main function to extract text
def extract_text_from_image(image_path):
    # Detect text regions using EAST
    boxes, confidences, orig = detect_text_regions(image_path)
    
    # For each detected box, crop the image and perform text recognition
    extracted_text = ""
    for box in boxes:
        p1, p2 = box
        cropped_image = orig[p1[1]:p2[1], p1[0]:p2[0]]
        
        # Recognize text from cropped image
        text = recognize_text_from_image(cropped_image, crnn_model)
        extracted_text += text + "\n"

    return extracted_text

# Usage Example
image_path = 'report.jpeg'
text = extract_text_from_image(image_path)
print("Extracted Text:")
print(text)
