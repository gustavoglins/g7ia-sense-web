import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function DevicesSkeleton() {
  return (
    <div
      role="status"
      aria-label="Carregando dispositivos"
      className="flex flex-col gap-12"
    >
      <span className="sr-only">Carregando dispositivos...</span>
      {Array.from({ length: 1 }, (_, section) => (
        <div key={section} aria-hidden="true" className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-0.75 rounded-4xl motion-reduce:animate-none" />
            <Skeleton className="h-7 w-56 max-w-full motion-reduce:animate-none" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 1 }, (_, card) => (
              <div
                key={card}
                className="min-w-0 min-h-60 p-4 rounded-xl border bg-card flex flex-col gap-4 justify-between"
              >
                <div className="flex items-start justify-between">
                  <Skeleton className="size-12.5 rounded-xl motion-reduce:animate-none" />
                  <Skeleton className="h-3 w-14 motion-reduce:animate-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-2/3 motion-reduce:animate-none" />
                  <Skeleton className="h-3 w-1/2 motion-reduce:animate-none" />
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1].map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <Skeleton className="h-3 w-10 motion-reduce:animate-none" />
                      <Skeleton className="h-3 w-20 max-w-full motion-reduce:animate-none" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
