// EmailSkeleton.tsx
export default function Loader() {
  return (
    <div className="space-y-3">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex items-start gap-3 p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02]"
        >
          <div className="w-9 h-9 rounded-full bg-white/10" />

          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <div className="h-3 w-32 bg-white/10 rounded" />
              <div className="h-3 w-12 bg-white/10 rounded" />
            </div>

            <div className="h-3 w-64 bg-white/10 rounded mb-2" />
            <div className="h-2.5 w-full bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}