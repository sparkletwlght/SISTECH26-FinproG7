export default function MobileContainer({ children }) {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md min-h-[85vh] bg-[#faf8fc] flex flex-col justify-between p-6 border border-purple-100/50 relative overflow-hidden">
        {children}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>
    </main>
  );
}
