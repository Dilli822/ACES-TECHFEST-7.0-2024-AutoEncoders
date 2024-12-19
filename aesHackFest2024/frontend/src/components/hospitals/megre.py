import os
import json

# Define the directory where the .json files are located
directory = './districts/json-files'  # Update with your directory path

# List to hold all the combined data
combined_data = []

# Iterate through all .json files in the directory
for filename in os.listdir(directory):
    if filename.endswith('.json'):
        file_path = os.path.join(directory, filename)
        with open(file_path, 'r') as f:
            data = json.load(f)
            combined_data.append(data)

# Save the combined data into a single .json file
with open('combined.json', 'w') as output_file:
    json.dump(combined_data, output_file, indent=4)

print("Combined .json files have been saved as 'combined.json'")
