export type GeoPoint = {
  lat: number;
  lon: number;
  display_name: string;
};

export const geocodeCity = async (query: string): Promise<GeoPoint> => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  if (!res.ok) {
    throw new Error('Nominatim request failed');
  }

  const data = await res.json();

  if (!data?.length) {
    throw new Error('City not found');
  }

  return {
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
    display_name: data[0].display_name,
  };
};
