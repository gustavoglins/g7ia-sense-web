'use client';

import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographyH3 } from '@/components/typography/typography-h3';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographySmall } from '@/components/typography/typography-small';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useDevices } from '@/hooks/useDevices';
import { Bell, Hexagon, RefreshCcw } from 'lucide-react';

export default function DashboardDevicesPage() {
  const { data, isLoading, error } = useDevices();

  function f() {
    console.log(data);
  }

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full flex items-center justify-between">
        <div>
          <TypographyH2>Dispositivos</TypographyH2>
          <TypographySmall muted>
            Monitore e gerencie todos os dispositivos conectados ao sistema.
          </TypographySmall>
        </div>
        <div className="flex items-center gap-1">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={'all'} value="all">
                Todos os tipos
              </SelectItem>
              <SelectItem key={'ac'} value="ac">
                AC
              </SelectItem>
              <SelectItem key={'dc'} value="dc">
                DC
              </SelectItem>
              <SelectItem key={'env'} value="env">
                ENV
              </SelectItem>
              <SelectItem key={'adv'} value="adv">
                ADV
              </SelectItem>
              <SelectItem key={'act'} value="act">
                ACT
              </SelectItem>
            </SelectContent>
          </Select>
          <Button size={'icon'} variant={'secondary'}>
            <Bell strokeWidth={1.65} />
          </Button>
          <Button size={'icon'} variant={'secondary'}>
            <RefreshCcw strokeWidth={1.65} />
          </Button>
          <Button onClick={f}>GET</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-6 rounded-4xl w-0.75" />
          <TypographyH3>
            AC - <span className="text-primary">6 dispositivos</span>
          </TypographyH3>
        </div>
        <div className="w-full flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-1/3 h-60 p-4 rounded-xl border bg-card flex flex-col justify-around"
            >
              <div className="flex items-start justify-between">
                <Hexagon size={50} strokeWidth={1} />
                <div className="m-2 bg-destructive-foreground rounded-full size-2" />
              </div>
              <div>
                <TypographyP medium>Device Name</TypographyP>
                <TypographySmall muted xs>
                  Sector of device
                </TypographySmall>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                  <div className="w-1/2">
                    <TypographySmall xs>
                      <span className="text-muted-foreground">V:</span> 228.6 V
                    </TypographySmall>
                  </div>
                  <div className="w-1/2">
                    <TypographySmall xs>
                      <span className="text-muted-foreground">C:</span> 28.61 A
                    </TypographySmall>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="w-1/2">
                    <TypographySmall xs>
                      <span className="text-muted-foreground">FP:</span> 0.91
                    </TypographySmall>
                  </div>
                  <div className="w-1/2">
                    <TypographySmall xs>
                      <span className="text-muted-foreground">RSSI:</span> -62
                      dBm
                    </TypographySmall>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
