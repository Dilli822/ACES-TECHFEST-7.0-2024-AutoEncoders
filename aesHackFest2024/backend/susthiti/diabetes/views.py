from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from .serializers import CancerPredictionSerializer

# Load dataset (can be any dataset you want, here we use the Pima Indians Diabetes dataset as an example)
url = 'https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv'
columns = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 
           'DiabetesPedigreeFunction', 'Age', 'Outcome']
data = pd.read_csv(url, header=None, names=columns)

# Prepare data
X = data.drop('Outcome', axis=1)
y = data['Outcome']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature Scaling (important for Naive Bayes)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Naive Bayes model
nb = GaussianNB()

# Train the model
nb.fit(X_train_scaled, y_train)

# Class-based API view
class CancerPredictionView(APIView):
    def post(self, request, *args, **kwargs):
        # Deserialize the input data
        serializer = CancerPredictionSerializer(data=request.data)
        if serializer.is_valid():
            input_data = serializer.validated_data['input_data']
            
            # Ensure input_data is a list of lists containing numerical values
            if not isinstance(input_data, list) or not all(isinstance(i, list) for i in input_data):
                return Response({"error": "Input data must be a list of lists."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Ensure all values in the input data are numbers
            try:
                input_data = np.array(input_data, dtype=np.float64)  # Convert to numpy array of floats
            except ValueError:
                return Response({"error": "All input data must be numeric."}, status=status.HTTP_400_BAD_REQUEST)

            # Convert the input data to a DataFrame
            input_df = pd.DataFrame(input_data, columns=data.columns[:-1])
            
            # Scale the input data using the same scaler as for the training data
            input_data_scaled = scaler.transform(input_df)
            
            # Predict using the trained Naive Bayes model
            prediction = nb.predict(input_data_scaled)
            result = "No Diabetes" if prediction == 0 else "Has Diabetes"
            
            # Model evaluation metrics (using the training data to calculate metrics)
            accuracy = accuracy_score(y_test, nb.predict(X_test_scaled))  # Accuracy on the test set
            class_report = classification_report(y_test, nb.predict(X_test_scaled), output_dict=True)

            return Response({
                "prediction": result,
                "accuracy": accuracy,
                "classification_report": class_report
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
