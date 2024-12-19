from rest_framework import serializers

class CancerPredictionSerializer(serializers.Serializer):
    input_data = serializers.ListField(
        child=serializers.ListField(child=serializers.FloatField())  # List of lists of floats
    )
