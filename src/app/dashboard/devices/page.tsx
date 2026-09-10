'use client';

import { useState } from 'react';
import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographyH3 } from '@/components/typography/typography-h3';
import { TypographySmall } from '@/components/typography/typography-small';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDevices } from '@/hooks/useDevices';
import type { Device } from '@/types/devices.types';
import { Bell, RefreshCcw } from 'lucide-react';
import { DeviceCard } from './_components/device-card';
import { DevicesSkeleton } from './_components/devices-skeleton';

export default function DashboardDevicesPage() {
  const { data = [], isLoading, error, isFetching, refetch } = useDevices();
  const [selectedType, setSelectedType] = useState('all');
  const groups = new Map<string, Device[]>();

  for (const device of data) {
    const group = groups.get(device.deviceType);
    if (group) group.push(device);
    else groups.set(device.deviceType, [device]);
  }

  const deviceTypes = [...groups.keys()].sort();
  const visibleTypes = deviceTypes.filter(
    (type) => selectedType === 'all' || type === selectedType,
  );

  // console.log(data);

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full flex flex-wrap gap-4 items-center justify-between">
        <div>
          <TypographyH2>Dispositivos</TypographyH2>
          <TypographySmall muted>
            Monitore e gerencie todos os dispositivos conectados ao sistema.
          </TypographySmall>
        </div>
        <div className="flex items-center gap-1">
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value ?? 'all')}
          >
            <SelectTrigger aria-label="Filtrar por tipo de dispositivo">
              <SelectValue>
                {selectedType === 'all'
                  ? 'Todos os tipos'
                  : selectedType.toUpperCase()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {deviceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="icon" variant="secondary" aria-label="Notificações">
            <Bell strokeWidth={1.65} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Atualizar dispositivos"
            disabled={isFetching}
            onClick={() => void refetch()}
          >
            <RefreshCcw strokeWidth={1.65} />
          </Button>
        </div>
      </div>

      {isLoading && <DevicesSkeleton />}
      {error && (
        <p role="alert" className="text-destructive">
          Não foi possível atualizar os dispositivos. Tente novamente pelo botão
          de atualizar.
        </p>
      )}
      {!isLoading && !error && visibleTypes.length === 0 && (
        <p className="text-muted-foreground">
          {data.length === 0
            ? 'Nenhum dispositivo cadastrado.'
            : 'Nenhum dispositivo deste tipo.'}
        </p>
      )}

      {visibleTypes.map((type) => {
        const devices = groups.get(type)!;

        return (
          <section
            key={type}
            className="flex flex-col gap-4"
            aria-label={`Dispositivos ${type.toUpperCase()}`}
          >
            <div className="flex items-center gap-2">
              <div className="bg-primary h-6 rounded-4xl w-0.75" />
              <TypographyH3>
                {type.toUpperCase()} -{' '}
                <span className="text-primary">
                  {devices.length}{' '}
                  {devices.length === 1 ? 'dispositivo' : 'dispositivos'}
                </span>
              </TypographyH3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {devices.map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
