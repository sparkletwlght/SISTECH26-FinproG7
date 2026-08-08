"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  Star,
  Sun,
  Moon,
  Cog,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Loader2,
  X,
} from "lucide-react";
import {
  getSafeCommute,
  getLocations,
  riskScoreToStatus,
  riskScoreToStars,
} from "@/lib/chicagoRiskApi";

const PINK = "#E31C79";
const PURPLE_TEXT = "#7C5CBF";
const SAFE_GREEN = "#22A55A";
const CAUTION_YELLOW = "#D9A400";
const DANGER_RED = "#E23A3A";
const tripLog = [
  {
    id: 1,
    title: "Morning Commute",
    datetime: new Date().toISOString(),
    start: { label: "Union Station", lat: 41.8789, lon: -87.6359 },
    end: { label: "Willis Tower", lat: 41.8789, lon: -87.6459 },
  },
  {
    id: 2,
    title: "Evening Walk Home",
    datetime: new Date(Date.now() - 86400000).toISOString(),
    start: { label: "Millennium Park", lat: 41.8826, lon: -87.6226 },
    end: { label: "Navy Pier", lat: 41.8917, lon: -87.6086 },
  },
];

const reportEntry = {
  title: "Report Title",
  subtitle: "Time reported • Distance",
  description:
    "Report description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada lacus nec rutrum dapibus. Phasellus eget elit eu purus viverra pharetra.",
  location: { label: "Location Name", address: "Location address" },
  status: "Dangerous",
  photosShown: 2,
  photosMore: 3,
};

const statusStyles = {
  Safe: { color: SAFE_GREEN, icon: CheckCircle2 },
  Caution: { color: CAUTION_YELLOW, icon: AlertTriangle },
  Dangerous: { color: DANGER_RED, icon: ShieldAlert },
};

function StatusBadge({ status }) {
  const { color, icon: Icon } = statusStyles[status];
  return (
    <span
      className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
      style={{ color, borderColor: color }}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {status}
    </span>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          fill={i < rating ? PINK : "none"}
          stroke={i < rating ? PINK : "#D1D5DB"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function LocationCard({ label, address }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200">
        <Cog className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {address && <p className="text-xs text-gray-400">{address}</p>}
      </div>
    </div>
  );
}

function ThumbnailIcon() {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
      <Cog className="h-6 w-6 text-gray-400" strokeWidth={1.5} />
    </div>
  );
}

function PageHeader({
  showFilters,
  onToggleFilters,
  sortAsc,
  onToggleSort,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="px-8 pt-8">
      <h1 className="text-2xl font-bold text-gray-900">My History</h1>
      <p className="mt-1 text-sm text-gray-500">
        Review your past traveled routes, recorded travel logs, and submitted
        safety reports in one place.
      </p>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={onToggleFilters}
          aria-label="Toggle search & filters"
          aria-pressed={showFilters}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: PINK }}
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleSort}
          aria-label={sortAsc ? "Sorted oldest first" : "Sorted newest first"}
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-pink-50"
          style={{
            borderColor: PINK,
            color: PINK,
            backgroundColor: sortAsc ? "#FCE4EF" : "transparent",
          }}
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>

        <button
          onClick={onResetFilters}
          disabled={!hasActiveFilters}
          aria-label="Reset filters"
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ borderColor: PINK, color: PINK }}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        {hasActiveFilters && (
          <span className="text-xs font-medium text-gray-400">
            Filters active
          </span>
        )}
      </div>
    </div>
  );
}
function FilterBar({
  visible,
  locations,
  locationsLoading,
  filters,
  onChange,
}) {
  if (!visible) return null;

  return (
    <div className="mt-6 grid grid-cols-3 gap-8 border-b border-gray-100 px-8 pb-6">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-gray-500">
          Title
        </label>
        <div className="relative">
          <input
            value={filters.title}
            onChange={(e) => onChange({ ...filters, title: e.target.value })}
            placeholder="Search by title"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-8 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          {filters.title && (
            <button
              onClick={() => onChange({ ...filters, title: "" })}
              aria-label="Clear title filter"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-gray-500">
          Location
        </label>
        <div className="relative">
          <select
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 pr-8 text-left text-sm text-gray-700 outline-none"
          >
            <option value="">
              {locationsLoading ? "Loading..." : "All locations"}
            </option>
            {locations.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-gray-500">
          Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onChange({ ...filters, date: e.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-8 text-left text-sm text-gray-700 outline-none [color-scheme:light]"
          />
          <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
function RouteEntry({ entry }) {
  return (
    <div className="flex gap-4 border-b border-gray-100 px-8 py-6">
      <ThumbnailIcon />

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: PINK }}>
              {entry.title}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(entry.datetime).toLocaleString()}
            </p>
            <div className="mt-1">
              <StarRating rating={entry.rating} />
            </div>
          </div>
          {entry.loading ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Checking risk...
            </span>
          ) : entry.error ? (
            <span className="text-xs font-medium text-gray-400">
              Risk data unavailable
            </span>
          ) : (
            <StatusBadge status={entry.status} />
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p
              className="mb-1.5 flex items-center gap-1.5 text-xs font-medium"
              style={{ color: PURPLE_TEXT }}
            >
              <Sun className="h-3.5 w-3.5" />
              Start
            </p>
            <LocationCard label={entry.start.label} />
          </div>
          <div>
            <p
              className="mb-1.5 flex items-center gap-1.5 text-xs font-medium"
              style={{ color: PURPLE_TEXT }}
            >
              <Moon className="h-3.5 w-3.5" />
              Arrival
            </p>
            <LocationCard label={entry.end.label} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportEntry({ entry }) {
  return (
    <div className="flex gap-4 px-8 py-6">
      <ThumbnailIcon />

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-base font-bold" style={{ color: PINK }}>
              {entry.title}
            </p>
            <p className="text-sm text-gray-500">{entry.subtitle}</p>
          </div>
          <StatusBadge status={entry.status} />
        </div>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
          {entry.description}
        </p>

        <div className="mt-4 max-w-xs">
          <LocationCard {...entry.location} />
        </div>

        <div className="mt-4 grid max-w-lg grid-cols-3 gap-3">
          {Array.from({ length: entry.photosShown }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border border-gray-200"
            />
          ))}
          <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200">
            <span className="text-sm text-gray-400">
              +{entry.photosMore} more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const EMPTY_FILTERS = { title: "", location: "", date: "" };

export default function MyHistoryPage() {
  const [entries, setEntries] = useState(
    tripLog.map((trip) => ({ ...trip, loading: true, error: false })),
  );
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortAsc, setSortAsc] = useState(false);
  const hasActiveFilters =
    filters.title !== "" || filters.location !== "" || filters.date !== "";

  useEffect(() => {
    let cancelled = false;

    getLocations()
      .then((data) => {
        if (!cancelled) setLocations(data.locations ?? []);
      })
      .catch((err) => {
        console.error("Failed to load locations:", err);
      })
      .finally(() => {
        if (!cancelled) setLocationsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    tripLog.forEach(async (trip) => {
      try {
        const result = await getSafeCommute({
          latStart: trip.start.lat,
          lonStart: trip.start.lon,
          latEnd: trip.end.lat,
          lonEnd: trip.end.lon,
          datetime: trip.datetime,
        });

        if (cancelled) return;

        const score = result.recommended?.avg_risk_score;

        setEntries((prev) =>
          prev.map((e) =>
            e.id === trip.id
              ? {
                  ...e,
                  loading: false,
                  error: false,
                  status: riskScoreToStatus(score),
                  rating: riskScoreToStars(score),
                }
              : e,
          ),
        );
      } catch (err) {
        console.error(`Failed to score trip ${trip.id}:`, err);
        if (cancelled) return;
        setEntries((prev) =>
          prev.map((e) =>
            e.id === trip.id ? { ...e, loading: false, error: true } : e,
          ),
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleEntries = useMemo(() => {
    return entries
      .filter((e) => {
        if (
          filters.title &&
          !e.title.toLowerCase().includes(filters.title.toLowerCase())
        ) {
          return false;
        }
        if (filters.location) {
          const loc = filters.location.toLowerCase();
          const matchesStart = e.start.label.toLowerCase().includes(loc);
          const matchesEnd = e.end.label.toLowerCase().includes(loc);
          if (!matchesStart && !matchesEnd) return false;
        }
        if (filters.date) {
          const entryDate = new Date(e.datetime).toISOString().slice(0, 10);
          if (entryDate !== filters.date) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(a.datetime) - new Date(b.datetime);
        return sortAsc ? diff : -diff;
      });
  }, [entries, filters, sortAsc]);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((v) => !v)}
        sortAsc={sortAsc}
        onToggleSort={() => setSortAsc((v) => !v)}
        onResetFilters={() => setFilters(EMPTY_FILTERS)}
        hasActiveFilters={hasActiveFilters}
      />
      <FilterBar
        visible={showFilters}
        locations={locations}
        locationsLoading={locationsLoading}
        filters={filters}
        onChange={setFilters}
      />

      <div>
        {visibleEntries.length === 0 ? (
          <p className="px-8 py-10 text-center text-sm text-gray-400">
            No entries match your filters.
          </p>
        ) : (
          visibleEntries.map((entry) => (
            <RouteEntry key={entry.id} entry={entry} />
          ))
        )}
        {!hasActiveFilters && <ReportEntry entry={reportEntry} />}
      </div>
    </div>
  );
}
