let cityController: AbortController | null = null;
let nameController: AbortController | null = null;

// 🌍 CITY SEARCH
export const fetchAttractionsByCity = async (lat: number, lon: number) => {
  if (cityController) cityController.abort();
  cityController = new AbortController();

  const query = `
  [out:json][timeout:25];

  (
    node["tourism"~"museum|attraction|viewpoint"](around:3000,${lat},${lon});
    node["historic"](around:3000,${lat},${lon});
  );

  out body 10;
  `;

  try {
    const res = await fetch('https://overpass.kumi.systems/api/interpreter', {
      method: 'POST',
      body: query,
      signal: cityController.signal,
    });

    const data = await res.json();
    return data.elements || [];
  } catch (err: any) {
    if (err.name === 'AbortError') return [];
    throw err;
  }
};

// 🔎 NAME SEARCH
export const fetchAttractionsByName = async (name: string) => {
  if (nameController) nameController.abort();
  nameController = new AbortController();

  const query = `
  [out:json][timeout:25];

  (
    node["tourism"]["name"~"${name}", i];
    way["tourism"]["name"~"${name}", i];
    relation["tourism"]["name"~"${name}", i];

    node["historic"]["name"~"${name}", i];
    way["historic"]["name"~"${name}", i];
    relation["historic"]["name"~"${name}", i];
  );

  out center 10;
  `;

  try {
    const res = await fetch('https://overpass.kumi.systems/api/interpreter', {
      method: 'POST',
      body: query,
      signal: nameController.signal,
    });

    const data = await res.json();

    return (data.elements || []).map((el: any) => ({
      ...el,
      lat: el.lat ?? el.center?.lat,
      lon: el.lon ?? el.center?.lon,
    }));
  } catch (err: any) {
    if (err.name === 'AbortError') return [];
    throw err;
  }
};
