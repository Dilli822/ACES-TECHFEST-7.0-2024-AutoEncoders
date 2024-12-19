import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

def predict_total_cases(input_data):
    # Load training data
    train = pd.read_csv('./dataset/DengAI_Predicting_Disease_Spread_-_Training_Data_Features.csv')
    test = pd.read_csv('./dataset/DengAI_Predicting_Disease_Spread_-_Test_Data_Features.csv')
    train_labels = pd.read_csv('./dataset/DengAI_Predicting_Disease_Spread_-_Training_Data_Labels.csv')

    # Fill missing values with mean for numeric columns (only for training data)
    numeric_cols = train.select_dtypes(include=[np.number]).columns
    train[numeric_cols] = train[numeric_cols].fillna(train[numeric_cols].mean())
    
    # Use the mean of training data for test data as well
    test[numeric_cols] = test[numeric_cols].fillna(train[numeric_cols].mean())

    # Merge training data and labels
    df = pd.merge(train, train_labels, on=['city', 'year', 'weekofyear'])

    # Select features and target variable
    features = df.drop(columns=['city', 'week_start_date', 'total_cases', 'weekofyear'])
    target = df['total_cases']

    # Train the RandomForest model
    clf = RandomForestClassifier(n_estimators=100)
    clf.fit(features, target)

    # Prepare the test data for prediction
    test_features = test.drop(columns=['city', 'week_start_date', 'weekofyear'])

    # Ensure the input matches the number of features
    if len(input_data[0]) != test_features.shape[1]:
        raise ValueError(f"Sample data must have {test_features.shape[1]} features, but it has {len(input_data[0])} features.")

    # Make predictions for all input samples
    predictions = clf.predict(input_data)

    return predictions
