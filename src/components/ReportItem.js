'use client';

const statusStyle = {
  Safe: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Caution: "bg-amber-50 text-amber-600 border-amber-200",
  Dangerous: "bg-red-50 text-red-600 border-red-200",
};

export default function ReportItem({ report }) {
  let images = [];
  try {
    if (typeof report.images === 'string') {
      images = JSON.parse(report.images.replace(/'/g, '"'));
    } else if (Array.isArray(report.images)) {
      images = report.images;
    }
  } catch (e) {
    images = [];
  }

  const statusKey = report.status || "Safe";

  return (
    <div className="py-6 border-t border-gray-200">
      <div className="flex gap-3">
        {/* avatar anonymous */}
        <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 text-pink-400 shrink-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start gap-3">
            <div>
              <h3 className="text-base font-bold text-pink-500">{report.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{report.time}</p>
            </div>
            <span className={`shrink-0 px-3 py-1 border text-xs font-semibold rounded-full ${statusStyle[statusKey] || statusStyle["Safe"]}`}>
              {statusKey}
            </span>
          </div>

          <p className="text-sm mt-2 text-gray-600">
            {report.description}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-500 shrink-0 flex items-center justify-center border border-pink-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800">{report.location}</h4>
              <p className="text-[11px] text-gray-400">{report.address}</p>
            </div>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3 max-w-md">
              {images.slice(0, 2).map((imgUrl, idx) => (
                <div key={idx} className="h-16 rounded-lg border border-gray-200 bg-gray-50/50 overflow-hidden">
                  <img src={imgUrl} alt={`proof ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}

              {images.length > 2 ? (
                <div className="h-16 rounded-lg border border-gray-200 bg-gray-50/50 flex items-center justify-center text-xs font-semibold text-gray-500 relative overflow-hidden">
                  <img src={images[2]} alt="more" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  <span className="relative z-10 bg-white/80 px-2 py-1 rounded">+{images.length - 2} more</span>
                </div>
              ) : images.length === 2 ? null : (
                <div className="h-16 rounded-lg border border-gray-200 bg-gray-50/50"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}