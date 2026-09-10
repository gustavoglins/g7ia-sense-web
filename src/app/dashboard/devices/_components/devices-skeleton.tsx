import { Skeleton } from '@/components/ui/skeleton';

export function DevicesSkeleton() {
  return (
    <div
      role="status"
      aria-label="Carregando dispositivos"
      className="flex flex-col gap-4"
    >
      <span className="sr-only">Carregando dispositivos...</span>
      <Skeleton
        aria-hidden="true"
        className="h-7 w-56 max-w-full motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {Array.from({ length: 3 }, (_, card) => (
          <div
            key={card}
            className="min-w-0 p-4 rounded-xl border bg-card flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <Skeleton className="size-12.5 rounded-xl motion-reduce:animate-none" />
              <Skeleton className="h-3 w-14 motion-reduce:animate-none" />
            </div>
            <Skeleton className="h-5 w-2/3 motion-reduce:animate-none" />
            <Skeleton className="h-3 w-1/2 motion-reduce:animate-none" />
            <div className="grid grid-cols-2 gap-3">
              {[0, 1].map((field) => (
                <Skeleton
                  key={field}
                  className="h-10 w-full motion-reduce:animate-none"
                />
              ))}
            </div>
            <Skeleton className="h-4 w-1/2 motion-reduce:animate-none" />
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((field) => (
                <Skeleton
                  key={field}
                  className="h-14 w-full motion-reduce:animate-none"
                />
              ))}
            </div>
            <Skeleton className="h-8 w-full motion-reduce:animate-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
