import { TypographyP } from '@/components/typography/typography-p';
import { TypographySmall } from '@/components/typography/typography-small';
import { Separator } from '@/components/ui/separator';
import { StatusDot } from '@/components/ui/status-dot';
import {
  formatTelemetryTime,
  getDeviceMeasurements,
} from '@/lib/device-telemetry';
import type { Device } from '@/types/devices.types';
import { Hexagon } from 'lucide-react';

export function DeviceCard({ device }: { device: Device }) {
  const isActive = device.status === 'active';
  const reading = device.latestTelemetry;
  const measurements = getDeviceMeasurements(device);
  const supportsTelemetry =
    device.deviceType !== 'act' && device.deviceType !== 'adv';

  return (
    <article className="min-w-0 p-4 rounded-xl border bg-card flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <Hexagon
          size={50}
          strokeWidth={1}
          aria-hidden="true"
          className="text-primary"
        />
        <StatusDot label="Status do dispositivo" />
      </div>
      <div className="break-words">
        <TypographyP medium>{device.name}</TypographyP>
        <TypographySmall muted xs>
          {device.serialNumber || 'Número de série não informado'}
        </TypographySmall>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-xs">
        <div className="min-w-0">
          <dt className="text-muted-foreground">Instalação</dt>
          <dd className="break-words">{device.installation.name}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">Setor</dt>
          <dd className="break-words">{device.sector.name}</dd>
        </div>
      </dl>
      <Separator />
      <div className="flex flex-1 flex-col gap-3">
        {reading ? (
          <dl className="grid grid-cols-2 gap-3">
            {measurements.map(({ label, value }) => (
              <div key={label} className="min-w-0 flex items-center gap-1.5">
                <dt className="text-sm text-muted-foreground">{label}:</dt>
                <dd className="break-words text-sm font-medium tabular-nums">
                  {value === null || value === '' ? (
                    <span aria-label="Não informado">—</span>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">
            {supportsTelemetry
              ? 'Nenhuma telemetria recebida ainda.'
              : 'Telemetria ainda não disponível para este tipo.'}
          </p>
        )}
      </div>
      {reading && (
        <footer className="text-xs text-muted-foreground">
          Registro gerado em{' '}
          <time dateTime={reading.time}>
            {formatTelemetryTime(reading.time)}
          </time>
        </footer>
      )}
    </article>
  );
}
