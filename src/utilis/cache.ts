const CACHE_PREFIX = 'places_';
const CACHE_TTL = 1000 * 60 * 60; // 1 час

export const getCache = (key: string) => {
  const raw = localStorage.getItem(CACHE_PREFIX + key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    // проверка срока жизни
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
};

export const setCache = (key: string, data: any) => {
  localStorage.setItem(
    CACHE_PREFIX + key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );
};
