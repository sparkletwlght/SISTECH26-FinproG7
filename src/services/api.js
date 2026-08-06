const API_BASE_URL = "https://apimlopsfinpro7.neoartd.my.id";

async function safeFetchJson(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    
    if (!res.ok) {
      console.warn(`API Warning (${res.status}) [${url}]:`, text);
      return null;
    }

    if (!text || text.trim() === "") {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn(`Respons bukan JSON valid dari ${url}:`, text);
      return null;
    }
  } catch (error) {
    console.error(`Network error pada ${url}:`, error);
    return null;
  }
}

export async function checkHealth() {
  return await safeFetchJson(`${API_BASE_URL}/health`);
}

export async function getRiskScore(lat, lon, datetime) {
  if (!lat || !lon || !datetime) return null;
  return await safeFetchJson(`${API_BASE_URL}/risk-score?lat=${lat}&lon=${lon}&datetime=${datetime}`);
}

export async function getHeatmap(datetime) {
  if (!datetime) return [];
  const data = await safeFetchJson(`${API_BASE_URL}/heatmap?datetime=${datetime}`);
  return data?.points || [];
}

// Mendukung objek payload yang dikirim dari page.js
export async function getSafeCommute({ lat_start, lon_start, lat_end, lon_end, datetime, window_hours = 3 }) {
  if (!lat_start || !lon_start || !lat_end || !lon_end || !datetime) return null;
  const url = `${API_BASE_URL}/safe-commute?lat_start=${lat_start}&lon_start=${lon_start}&lat_end=${lat_end}&lon_end=${lon_end}&datetime=${datetime}&window_hours=${window_hours}`;
  return await safeFetchJson(url);
}

export async function getLocations() {
  const data = await safeFetchJson(`${API_BASE_URL}/locations`);
  return data?.locations || [];
}

export async function getModelMetrics() {
  return await safeFetchJson(`${API_BASE_URL}/model-metrics`);
}