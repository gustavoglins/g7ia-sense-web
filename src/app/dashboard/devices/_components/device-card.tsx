import { TypographyP } from '@/components/typography/typography-p';
import { TypographySmall } from '@/components/typography/typography-small';
import { Separator } from '@/components/ui/separator';
import type { Device } from '@/types/devices.types';
import { Hexagon } from 'lucide-react';

export function DeviceCard({ device }: { device: Device }) {
  const isActive = device.status === 'active';

  return (
    <article className="min-w-0 min-h-60 p-4 rounded-xl border bg-card flex flex-col gap-4 justify-between">
      <div className="flex items-start justify-between">
        <Hexagon size={50} strokeWidth={1} aria-hidden="true" />
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={`rounded-full size-2 ${isActive ? 'bg-primary' : 'bg-muted-foreground'}`} />
          {isActive ? 'Ativo' : 'Inativo'}
        </span>
      </div>
      <div className="break-words">
        <TypographyP medium>{device.name}</TypographyP>
        <TypographySmall muted xs>
          {device.serialNumber || 'Número de série não informado'}
        </TypographySmall>
      </div>
      <Separator />
      <dl className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <dt className="text-muted-foreground">Versão</dt>
          <dd>{device.version || 'Não informada'}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">MAC</dt>
          <dd className="break-words">{device.macAddress || 'Não informado'}</dd>
        </div>
      </dl>
    </article>
  );
}
