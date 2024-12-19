import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import matplotlib.pyplot as plt

input_data = np.array([[
    12.78, 16.49, 81.37, 502.5, 0.09831, 0.05234, 0.03653, 0.02864, 0.159,
    0.05653, 0.2368, 0.8732, 1.471, 18.33, 0.007962, 0.005612, 0.01585, 0.008662,
    0.02254, 0.001906, 13.46, 19.76, 85.67, 554.9, 0.1296, 0.07061, 0.1039,
    0.05882, 0.2383, 0.0641
]])

# Load the breast cancer dataset
from sklearn.datasets import load_breast_cancer
data = load_breast_cancer()

# Create DataFrame for training data
df = pd.DataFrame(data.data, columns=data.feature_names)

# Create and train the model pipeline
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

# Prepare the data
def prepare_data(df):
    X = df
    y = data.target
    return X, y

# Load and prepare data
X, y = prepare_data(df)

# Create and train the model
svm_model = create_svm_pipeline()
svm_model.fit(X, y)

# Make prediction for the single input data
input_df = pd.DataFrame(input_data, columns=data.feature_names)
prediction = svm_model.predict(input_df)

# Print prediction
print("Prediction for the input data:", "Malignant" if prediction[0] == 0 else "Benign")

# Print best parameters from grid search
print("\nBest Parameters:")
print(svm_model.best_params_)

# Evaluate the model on the training set
y_pred = svm_model.predict(X)

# Print classification report
print("\nClassification Report:")
print(classification_report(y, y_pred))

# Print confusion matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y, y_pred))

# Print model performance metrics
print("\nModel Performance Metrics:")
print(f"Accuracy: {accuracy_score(y, y_pred):.4f}")
print(f"Precision: {precision_score(y, y_pred):.4f}")
print(f"Recall: {recall_score(y, y_pred):.4f}")
print(f"F1 Score: {f1_score(y, y_pred):.4f}")

# Plot confusion matrix
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y, y_pred)
plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
plt.title('Confusion Matrix')
plt.colorbar()
tick_marks = np.arange(2)
plt.xticks(tick_marks, ['Malignant', 'Benign'], rotation=45)
plt.yticks(tick_marks, ['Malignant', 'Benign'])
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.tight_layout()
plt.show()