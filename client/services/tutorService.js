import axios from 'axios';
const baseUrl = 'http://localhost:4999';

export const addListing = async ({ token, locationLat, locationLong, subjects}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(`${baseUrl}/listing`, { subjects, location_long: locationLong, location_lat: locationLat }, config);
};

export const findTutors = async ({ subject}) => {
  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  return await axios.post(`${baseUrl}/find`, { subject }, config);
};