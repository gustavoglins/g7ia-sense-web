'use client';

import { useInstallation } from '@/components/providers/installation-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function InstallationSelect() {
  const { installationId, selectInstallation, installations } = useInstallation();
  const options = installations.data ?? [];
  return (
    <div className="flex min-w-0 flex-col gap-2 px-6">
      <label htmlFor="global-installation" className="text-xs text-muted-foreground">Instalação</label>
      <Select value={installationId || null} onValueChange={(id) => { if (id) selectInstallation(id); }} disabled={!options.length}>
        <SelectTrigger id="global-installation" className="w-full min-w-0">
          <SelectValue className="min-w-0 truncate">
            {options.find(({ id }) => id === installationId)?.name ?? (installations.isPending ? 'Carregando...' : 'Nenhuma instalação')}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map(({ id, name }) => <SelectItem key={id} value={id}>{name}</SelectItem>)}
        </SelectContent>
      </Select>
      {installations.error && <div role="alert" className="text-xs text-destructive">
        Não foi possível carregar as instalações.
        <Button variant="ghost" size="sm" disabled={installations.isFetching} onClick={() => void installations.refetch()}>Tentar novamente</Button>
      </div>}
    </div>
  );
}
