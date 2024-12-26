from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
from sklearn.feature_selection import SelectKBest, chi2
from .serializers import CancerPredictionSerializer

# Load dataset and prepare the model
data = load_breast_cancer()
df = pd.DataFrame(data.data, columns=data.feature_names)

def create_svm_pipeline():
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('svm', SVC())
    ])
    param_grid = {
        'svm__C': [0.1, 1, 10, 100],
        'svm__gamma': ['scale', 'auto', 0.1, 1],
        'svm__kernel': ['rbf', 'linear']
    }
    grid_search = GridSearchCV(pipeline, param_grid, cv=5, scoring='accuracy')
    return grid_search

# Feature Selection - Select top 10 features based on univariate statistical tests (Chi-Squared)
def select_top_features(X, y, top_k=10):
    selector = SelectKBest(chi2, k=top_k)  # Using Chi-Squared test for feature selection
    selector.fit(X, y)
    selected_columns = X.columns[selector.get_support()]  # Get names of selected features
    return selected_columns

# Train the model once when the app starts
X = df
y = data.target
svm_model = create_svm_pipeline()

# Select top 10 features
top_features = select_top_features(X, y, top_k=10)
print("Top 10 Selected Features:", top_features)

# Using only the selected top 10 features for training
X_top = X[top_features]
svm_model.fit(X_top, y)

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

        # Convert the input data to a DataFrame using only the top 10 selected features
        input_df = pd.DataFrame(input_data, columns=top_features)  # Use only top 10 features
        
        # Predict
        predictions = svm_model.predict(input_df)
        results = ["Malignant" if pred == 0 else "Benign" for pred in predictions]

        # Model evaluation metrics (using top 10 features for training)
        accuracy = accuracy_score(y, svm_model.predict(X_top))  # Accuracy on training data
        precision = precision_score(y, svm_model.predict(X_top))
        recall = recall_score(y, svm_model.predict(X_top))
        f1 = f1_score(y, svm_model.predict(X_top))
        
        # Classification Report and Confusion Matrix (on the top 10 features)
        class_report = classification_report(y, svm_model.predict(X_top), output_dict=True)
        cm = confusion_matrix(y, svm_model.predict(X_top))

        return Response({
            "predictions": results,
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
            "best_params": svm_model.best_params_,
            "classification_report": class_report,
            "confusion_matrix": cm.tolist()  # Convert to list for JSON serialization
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
