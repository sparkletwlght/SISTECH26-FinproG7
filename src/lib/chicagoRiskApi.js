const BASE_URL = "https://apimlopsfinpro7.neoartd.my.id";

async function apiGet(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  let res;
  try {
    res = await fetch(url.toString());
  } catch (err) {
    throw new Error(`Network error calling ${path}: ${err.message}`);
  }

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.detail
        ? JSON.stringify(body.detail)
        : JSON.stringify(body);
    } catch {
      detail = await res.text().catch(() => "");
    }
    throw new Error(
      `Chicago Risk API ${path} failed (${res.status}): ${detail}`,
    );
  }

  return res.json();
}

export function getRiskScore({ lat, lon, datetime }) {
  return apiGet("/risk-score", { lat, lon, datetime });
}

export function getHeatmap({ datetime }) {
  return apiGet("/heatmap", { datetime });
}

export function getSafeCommute({
  latStart,
  lonStart,
  latEnd,
  lonEnd,
  datetime,
  windowHours,
}) {
  return apiGet("/safe-commute", {
    lat_start: latStart,
    lon_start: lonStart,
    lat_end: latEnd,
    lon_end: lonEnd,
    datetime,
    window_hours: windowHours,
  });
}

export function getLocations() {
  return apiGet("/locations");
}

export function riskScoreToStatus(score) {
  if (score === null || score === undefined || Number.isNaN(score)) {
    return "Safe";
  }
  if (score < 0.34) return "Safe";
  if (score < 0.67) return "Caution";
  return "Dangerous";
}

export function riskScoreToStars(score) {
  if (score === null || score === undefined || Number.isNaN(score)) return 5;
  const stars = Math.round(5 - score * 5);
  return Math.min(5, Math.max(0, stars));
}
