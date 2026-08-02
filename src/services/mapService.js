export const fetchRouteData = async (start, dest, mode) => {
  if (!start || !dest) return [];
  try {
    let profile = "driving";
    const m = (mode || "").toLowerCase();
    if (m.includes("walk") || m.includes("foot") || m.includes("jalan")) {
      profile = "foot";
    } else if (m.includes("bike") || m.includes("motor") || m.includes("sepeda")) {
      profile = "bike";
    }

    const url = `https://router.project-osrm.org/route/v1/${profile}/${start.lng},${start.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      return data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
    }
    return [];
  } catch (error) {
    console.error("Gagal mengambil rute:", error);
    return [];
  }
};

export const getRiskHeatmapData = () => {
  // contoh titik rawan (nanti pindah ke data)
  return [
    { id: 1, lat: -6.1754, lng: 106.8272, intensity: "high", radius: 400 },
    { id: 2, lat: -6.1822, lng: 106.8340, intensity: "medium", radius: 300 },
    { id: 3, lat: -6.1711, lng: 106.8220, intensity: "high", radius: 500 },
    { id: 4, lat: -6.1850, lng: 106.8225, intensity: "low", radius: 250 },
    { id: 5, lat: -6.1680, lng: 106.8310, intensity: "high", radius: 450 },
  ];
};

export const fetchPOIsData = async (lat, lng, fallbackPOIs) => {
  try {
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["amenity"~"cafe|restaurant|hospital|fast_food|pharmacy|fuel|university|school"](around:4000,${lat},${lng});
        node["shop"~"convenience|supermarket|mall"](around:4000,${lat},${lng});
        node["leisure"="park"](around:4000,${lat},${lng});
        node["aeroway"="aerodrome"](around:20000,${lat},${lng});
      );
      out body;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const res = await fetch(url);
    const textResponse = await res.text();

    if (textResponse.startsWith("<?xml") || textResponse.includes("<html")) {
      return fallbackPOIs;
    }

    const data = JSON.parse(textResponse);

    if (data && data.elements && data.elements.length > 0) {
      return data.elements.slice(0, 45).map((el) => {
        let type = "globe";
        const amenity = el.tags.amenity;
        const shop = el.tags.shop;
        const leisure = el.tags.leisure;
        const aeroway = el.tags.aeroway;

        if (amenity === "cafe") type = "cafe";
        else if (amenity === "restaurant" || amenity === "fast_food") type = "restaurant";
        else if (amenity === "hospital" || amenity === "pharmacy") type = "health";
        else if (shop === "convenience" || shop === "supermarket") type = "shop";
        else if (shop === "mall") type = "mall";
        else if (amenity === "university" || amenity === "school") type = "university";
        else if (aeroway === "aerodrome") type = "airport";
        else if (leisure === "park") type = "park";
        else if (amenity === "fuel") type = "gas";

        return {
          id: el.id,
          lat: el.lat,
          lng: el.lon,
          type: type,
          name: el.tags.name || "Tempat Penting",
        };
      });
    }
    return fallbackPOIs;
  } catch (error) {
    return fallbackPOIs;
  }
};