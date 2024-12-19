# Import necessary libraries
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import KFold, cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

# Load datasets
train = pd.read_cmsv('./dataset/DengAI_Predicting_Disease_Spread_-_Training_Data_Features.csv')
test = pd.read_csv('./dataset/DengAI_Predicting_Disease_Spread_-_Test_Data_Features.csv')
train_labels = pd.read_csv('./dataset/DengAI_Predicting_Disease_Spread_-_Training_Data_Labels.csv')


# Fill missing values with mean only for numeric columns
numeric_cols = train.select_dtypes(include=[np.number]).columns
train[numeric_cols] = train[numeric_cols].fillna(train[numeric_cols].mean())

numeric_cols_test = test.select_dtypes(include=[np.number]).columns
test[numeric_cols_test] = test[numeric_cols_test].fillna(train[numeric_cols].mean())

# Merge training data and labels
df = pd.merge(train, train_labels, on=['city', 'year', 'weekofyear'])

# Convert date columns to datetime
df['week_start_date'] = pd.to_datetime(df['week_start_date'])

# Separate data by city
sj_data = df[df['city'] == 'sj']
iq_data = df[df['city'] == 'iq']

# Visualization: NDVI plots for both cities
plt.figure(figsize=(10, 10))
for col in ['ndvi_ne', 'ndvi_nw', 'ndvi_se', 'ndvi_sw']:
    sj_data[col].plot(label=f'SJ {col}')
    iq_data[col].plot(label=f'IQ {col}')
plt.legend()
plt.show()

# Select features and target variable
features = df.drop(columns=['city', 'week_start_date', 'total_cases', 'weekofyear'])
target = df['total_cases']

# Model evaluation setup
k_fold = KFold(n_splits=10, shuffle=True, random_state=0)
models = {
    "KNeighborsClassifier": KNeighborsClassifier(n_neighbors=13),
    "DecisionTreeClassifier": DecisionTreeClassifier(),
    "RandomForestClassifier": RandomForestClassifier(n_estimators=13),
    "GaussianNB": GaussianNB(),
    "SVC": SVC()
}

# Evaluate each model
for model_name, model in models.items():
    score = cross_val_score(model, features, target, cv=k_fold, scoring='accuracy')
    print(f"{model_name}: {np.mean(score) * 100:.2f}%")

# Train and predict using the best model (example: RandomForest)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(features, target)

# Prepare the test set
test_features = test.drop(columns=['city', 'week_start_date', 'weekofyear'])

# Make predictions
predictions = clf.predict(test_features)

# Save predictions to a submission file
submission = pd.DataFrame({"total_cases": predictions})
submission.to_csv('submission_format.csv', index=False)
print(submission.head())



# Sample input data (based on the provided row)
sample_data = np.array([
    [
        0.1226, 1990, 0.103725, 0.1984833, 0.1776167, 12.42, 297.572857143, 
        297.742857143, 292.414285714, 299.8, 295.9, 32.0, 73.3657142857, 
        12.42, 14.0128571429, 2.62857142857, 25.4428571429, 6.9, 29.4, 
        20.0, 16.0
    ]
])

# Ensure the input matches the number of features used for training
if sample_data.shape[1] != test_features.shape[1]:
    print(f"Error: Sample data must have {test_features.shape[1]} features, but it has {sample_data.shape[1]} features.")
else:
    # Predict total cases for the sample data
    sample_prediction = clf.predict(sample_data)

    # Print the prediction result
    print("\nSample Input Data Prediction:")
    print(f"Predicted Total Cases: {sample_prediction[0]}")


