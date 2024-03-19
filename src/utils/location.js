export const fetchLatLong = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${import.meta.env.VITE_MAPS_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if ((data.status === 'OK') & (data.results.length > 0)) {
      const location = data.results[0].geometry.location;
      return location;
    }
    throw new Error('No results found for the address');
  } catch (error) {
    console.log('Error fetching latitudes and longtitudes: ', error);
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;
  const latDifference = toRadians(lat2 - lat1);
  const lonDifference = toRadians(lon2 - lon1);

  const a =
    Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(lonDifference / 2) *
      Math.sin(lonDifference / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // in kilometers
  return distance;
};

const toRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};