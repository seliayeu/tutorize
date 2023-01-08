import getDistance from 'geolib/es/getDistance';
import * as Location from 'expo-location';

export const getDistanceKm = (lat1, long1, lat2, long2) => {
  return getDistance({ latitude: lat1, longitude: long1 }, { latitude: lat2, longitude: long2 }) / 1000;
};

export const getCurrentLocation = async () => 
  await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
    maximumAge: 10000,
    timeout: 5000,
  });
