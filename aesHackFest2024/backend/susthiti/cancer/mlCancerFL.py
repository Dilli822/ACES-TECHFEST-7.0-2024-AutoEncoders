import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import matplotlib.pyplot as plt
from sklearn.feature_selection import SelectKBest, f_classif

# Assuming the same SVM model and data setup from the previous code
from sklearn.datasets import load_breast_cancer
data = load_breast_cancer()
df = pd.DataFrame(data.data, columns=data.feature_names)

# Apply feature selection (Select top 10 features)
def select_top_k_features(X, k=10):
    selector = SelectKBest(score_func=f_classif, k=k)
    X_new = selector.fit_transform(X, data.target)
    return X_new, selector.get_support(indices=True)  # Get the indices of selected features

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

# Select top 10 features
X_new, selected_features = select_top_k_features(X, k=10)

# Print the names of the selected features
selected_feature_names = data.feature_names[selected_features]

# Now, ask the user to input the values for the top 10 features via terminal
print("Please enter values for the following features:")
for feature in selected_feature_names:
    value = float(input(f"{feature}: "))  # Prompt user for each feature
    if feature == selected_feature_names[0]:
        input_data = np.array([[value]])
    else:
        input_data = np.append(input_data, np.array([[value]]), axis=1)

# Create DataFrame using the selected feature names
input_df_selected = pd.DataFrame(input_data, columns=selected_feature_names)

# Create and train the model (GridSearchCV will be used to select the best parameters)
svm_model = create_svm_pipeline()
svm_model.fit(X_new, y)  # Ensure the model is trained with selected features

# Get the best pipeline from the grid search
best_pipeline = svm_model.best_estimator_

# Standardize the input data using the same StandardScaler used in the pipeline
input_scaled = best_pipeline.named_steps['scaler'].transform(input_df_selected)

# Make prediction using the trained model
prediction = best_pipeline.predict(input_scaled)

# Print the prediction
print("\nPrediction for the input data:", "Malignant" if prediction[0] == 0 else "Benign")
