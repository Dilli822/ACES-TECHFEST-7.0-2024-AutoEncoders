from rest_framework import serializers

class CancerPredictionSerializer(serializers.Serializer):
    # Define the input data format as a list of numbers
    input_data = serializers.ListField(
        child=serializers.ListField(child=serializers.FloatField())  # List of numerical features
    )
