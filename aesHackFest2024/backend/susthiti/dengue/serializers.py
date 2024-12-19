from rest_framework import serializers

class DenguePredictionSerializer(serializers.Serializer):
    input_data = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        )
    )



from rest_framework import serializers

class PredictionInputSerializer(serializers.Serializer):
    ndvi_ne = serializers.FloatField()
    year = serializers.IntegerField()
    ndvi_nw = serializers.FloatField()
    ndvi_se = serializers.FloatField()
    ndvi_sw = serializers.FloatField()
    temperature = serializers.FloatField()
    humidity = serializers.FloatField()
    wind_speed = serializers.FloatField()
    pressure = serializers.FloatField()
    ndvi_diff = serializers.FloatField()
    ndvi_sum = serializers.FloatField()
    rain = serializers.FloatField()
    solar_radiation = serializers.FloatField()
    precipitation = serializers.FloatField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    altitude = serializers.FloatField()
    daylight = serializers.FloatField()
    mean_temperature = serializers.FloatField()
    temperature_variation = serializers.FloatField()
    humidity_variation = serializers.FloatField()
