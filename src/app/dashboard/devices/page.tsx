'use client';

import { useState } from 'react';
import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographyH3 } from '@/components/typography/typography-h3';
import { TypographySmall } from '@/components/typography/typography-small';
import { Button } from '@/components/ui/button';
import { useDevices } from '@/hooks/useDevices';
import { useInstallation } from '@/components/providers/installation-provider';
import { useSectors } from '@/hooks/useSectors';
import { deviceTypeSchema, type Device } from '@/types/devices.types';
import { ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { DeviceCard } from './_components/device-card';
import { DeviceFilter } from './_components/device-filter';
import { DevicesSkeleton } from './_components/devices-skeleton';

export default function DashboardDevicesPage() {
  const { installationId, installations } = useInstallation();
  if (!installationId) {
    return (
      <p role="status" className="text-sm text-muted-foreground">
        {installations.isPending
          ? 'Carregando instalações...'
          : 'Selecione uma instalação na sidebar para consultar os dispositivos.'}
      </p>
    );
  }
  return <InstallationDevices key={installationId} />;
}

function InstallationDevices() {
  const { installationId } = useInstallation();
  const [filters, setFilters] = useState({
    sectorId: '',
    page: 1,
    limit: 50,
  });
  const [selectedType, setSelectedType] = useState('all');
  const { data, isLoading, error, isFetching, refetch, dataUpdatedAt } =
    useDevices({
      sectorId: filters.sectorId || undefined,
      page: filters.page,
      limit: filters.limit,
    });
  const sectors = useSectors();
  const groups = new Map<string, Device[]>();

  for (const device of data?.data ?? []) {
    if (selectedType !== 'all' && device.deviceType !== selectedType) continue;
    const group = groups.get(device.deviceType);
    if (group) group.push(device);
    else groups.set(device.deviceType, [device]);
  }

  const visibleTypes = [...groups.keys()].sort();
  const visibleCount = [...groups.values()].reduce(
    (total, devices) => total + devices.length,
    0,
  );
  const pagination = data?.pagination;
  const hasFilters = Boolean(
    filters.sectorId || selectedType !== 'all',
  );

  function clearFilters() {
    setFilters((current) => ({
      ...current,
      sectorId: '',
      page: 1,
    }));
    setSelectedType('all');
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-wrap gap-4 items-center justify-between">
        <div>
          <TypographyH2>Dispositivos</TypographyH2>
          <TypographySmall muted>
            Acompanhe os dispositivos e suas últimas leituras.
          </TypographySmall>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <DeviceFilter
            id="device-sector"
            label="Setor"
            value={filters.sectorId || 'all'}
            disabled={!installationId || sectors.isLoading}
            options={[
              {
                value: 'all',
                label: !installationId
                  ? 'Selecione uma instalação'
                  : sectors.isLoading
                    ? 'Carregando setores...'
                    : 'Todos os setores',
              },
              ...(sectors.data ?? []).map((sector) => ({
                value: sector.id,
                label: sector.name,
              })),
            ]}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                sectorId: value === 'all' ? '' : value,
                page: 1,
              }))
            }
          />
          <DeviceFilter
            id="device-type"
            label="Tipo nesta página"
            value={selectedType}
            options={[
              { value: 'all', label: 'Todos os tipos' },
              ...deviceTypeSchema.options.map((type) => ({
                value: type,
                label: type.toUpperCase(),
              })),
            ]}
            onChange={setSelectedType}
          />
          <DeviceFilter
            id="device-limit"
            label="Dispositivos por página"
            value={String(filters.limit)}
            options={[20, 50, 100].map((limit) => ({
              value: String(limit),
              label: String(limit),
            }))}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                limit: Number(value),
                page: 1,
              }))
            }
          />
        </div>
        {installationId && sectors.error && (
          <div
            role="alert"
            className="flex flex-wrap items-center gap-2 text-sm text-destructive"
          >
            Não foi possível carregar os setores.
            <Button
              size="sm"
              variant="outline"
              disabled={sectors.isFetching}
              onClick={() => void sectors.refetch()}
            >
              Tentar novamente
            </Button>
          </div>
        )}
        {installationId &&
          sectors.isSuccess &&
          sectors.data.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Esta instalação não possui setores cadastrados.
            </p>
          )}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            Atualização automática a cada 15 s.
            {dataUpdatedAt > 0 && (
              <>
                {' '}
                Última consulta:{' '}
                <time dateTime={new Date(dataUpdatedAt).toISOString()}>
                  {new Date(dataUpdatedAt).toLocaleTimeString('pt-BR')}
                </time>
                .
              </>
            )}
          </p>
          {hasFilters && (
            <Button size="sm" variant="ghost" onClick={clearFilters}>
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      {isLoading && <DevicesSkeleton />}
      {error && (
        <p role="alert" className="text-destructive">
          {data
            ? 'Não foi possível atualizar. As leituras exibidas são da última consulta bem-sucedida.'
            : 'Não foi possível carregar os dispositivos.'}{' '}
          Tente novamente pelo botão de atualizar.
        </p>
      )}
      {data && visibleTypes.length === 0 && (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          {data.data.length > 0
            ? 'Nenhum dispositivo deste tipo nesta página.'
            : filters.page > 1
              ? 'Nenhum dispositivo nesta página. Volte à primeira página.'
              : hasFilters
                ? 'Nenhum dispositivo encontrado com os filtros selecionados.'
                : 'Nenhum dispositivo cadastrado.'}
        </div>
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
              <div
                className="bg-primary h-6 rounded-4xl w-0.75"
                aria-hidden="true"
              />
              <TypographyH3>
                {type.toUpperCase()} -{' '}
                <span className="text-primary">
                  {devices.length}{' '}
                  {devices.length === 1 ? 'dispositivo' : 'dispositivos'}
                </span>
              </TypographyH3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {devices.map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          </section>
        );
      })}

      {(pagination || filters.page > 1) && (
        <nav
          aria-label="Paginação dos dispositivos"
          className="flex flex-wrap items-center justify-between gap-4 border-t pt-4"
        >
          <p className="text-sm text-muted-foreground" role="status">
            {pagination &&
              `${visibleCount} exibidos nesta página · ${pagination.total} no total`}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {filters.page > 1 && (
              <Button
                size="sm"
                variant="ghost"
                disabled={isFetching}
                onClick={() =>
                  setFilters((current) => ({ ...current, page: 1 }))
                }
              >
                Primeira página
              </Button>
            )}
            <Button
              size="sm"
              variant="secondary"
              aria-label="Página anterior"
              disabled={filters.page <= 1 || isFetching}
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  page: Math.max(1, current.page - 1),
                }))
              }
            >
              <ChevronLeft aria-hidden="true" /> Anterior
            </Button>
            <span className="text-sm tabular-nums">
              Página {filters.page}
              {pagination && ` de ${Math.max(1, pagination.totalPages)}`}
            </span>
            <Button
              size="sm"
              variant="secondary"
              aria-label="Próxima página"
              disabled={
                !pagination ||
                filters.page >= pagination.totalPages ||
                isFetching
              }
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  page: current.page + 1,
                }))
              }
            >
              Próxima <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
