from sklearn.datasets import load_diabetes
import pandas as pd

# Load the diabetes dataset
diabetes_data = load_diabetes()

# Create a DataFrame from the dataset
df = pd.DataFrame(diabetes_data.data, columns=diabetes_data.feature_names)
df['target'] = diabetes_data.target

# Save the DataFrame to a CSV file
df.to_csv('diabetes_report.csv', index=False)

print("Diabetes report saved to diabetes_report.csv")