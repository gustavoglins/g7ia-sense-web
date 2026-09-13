import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographySmall } from '@/components/typography/typography-small';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Cpu,
  HousePlug,
  Plug,
  SmartphoneCharging,
  Sun,
  Zap,
} from 'lucide-react';
import DashboardCard from './_components/dashboard-card';
import { Progress } from '@/components/ui/progress';
import { StatusDot } from '@/components/ui/status-dot';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographyH3 } from '@/components/typography/typography-h3';

const generationData = [
  { time: '00:00', value: 0 },
  { time: '03:00', value: 0 },
  { time: '06:00', value: 8 },
  { time: '09:00', value: 48 },
  { time: '12:00', value: 90 },
  { time: '15:00', value: 72 },
  { time: '18:00', value: 28 },
  { time: '21:00', value: 4 },
  { time: '24:00', value: 0 },
];

const consumptionData = [
  { time: '00:00', value: 38 },
  { time: '03:00', value: 32 },
  { time: '06:00', value: 42 },
  { time: '09:00', value: 58 },
  { time: '12:00', value: 68 },
  { time: '15:00', value: 61 },
  { time: '18:00', value: 74 },
  { time: '21:00', value: 52 },
  { time: '24:00', value: 40 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <TypographyH2>Visão Geral do Sistema</TypographyH2>
        <TypographySmall muted>
          Monitoramento em tempo real do sistema off-grid.
        </TypographySmall>
      </div>
      <div className="flex flex-col gap-4">
        {/* First Row */}
        <div className="flex items-stretch gap-4">
          <DashboardCard
            width="w-1/5"
            icon={Zap}
            title="Potência Atual"
            info={{
              title: 'Potência Atual',
              description: 'Informação...',
            }}
            value="72.4"
            unitMeasurement="kw"
            description="Hoje"
          />
          <DashboardCard
            width="w-1/5"
            icon={Sun}
            title="Energia Gerada"
            info={{
              title: 'Energia Gerada',
              description: 'Informação...',
            }}
            value="72.4"
            unitMeasurement="kw"
            description="Hoje"
          />
          <DashboardCard
            width="w-1/5"
            icon={Plug}
            title="Consumo de Energia"
            info={{
              title: 'Consumo de Energia',
              description: 'Informação...',
            }}
            value="72.4"
            unitMeasurement="kw"
            description="Hoje"
          />
          <DashboardCard
            width="w-1/5"
            icon={Clock}
            title="Autonomia"
            info={{
              title: 'Autonomia',
              description: 'Informação...',
            }}
            value="72.4"
            unitMeasurement="kw"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1.5">
                <StatusDot label="Sistema operante" />
                <TypographySmall muted xs>
                  Estimado
                </TypographySmall>
              </div>
              <Progress
                value={75}
                className="[&_[data-slot=progress-track]]:h-1.5!"
              />
            </div>
          </DashboardCard>
          <DashboardCard
            width="w-1/5"
            icon={Cpu}
            title="Estado do Sistema"
            info={{
              title: 'Autonomia',
              description: 'Informação...',
            }}
            value="Operante"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1.5">
                <StatusDot label="Sistema operante" />
                <TypographySmall muted xs>
                  Tudo funcionando normalmente
                </TypographySmall>
              </div>
              <Progress
                value={100}
                className="[&_[data-slot=progress-track]]:h-1.5!"
              />
            </div>
          </DashboardCard>
        </div>

        {/* Second Row */}
        <div className="flex items-stretch gap-4">
          <DashboardCard
            width="w-2/5"
            icon={Sun}
            iconSize="default"
            title="Geração de Energia (kW)"
            titleSize="lg"
            chartId="energy-generation"
            chartData={generationData}
            info={{
              title: 'Potência Atual',
              description: 'Informação...',
            }}
          />
          <DashboardCard
            width="w-2/5"
            icon={Plug}
            chartId="energy-consumption"
            chartData={consumptionData}
            iconSize="default"
            title="Consumo de Energia (kW)"
            titleSize="lg"
            info={{
              title: 'Potência Atual',
              description: 'Informação...',
            }}
          />
          <DashboardCard
            width="w-1/5"
            icon={ArrowRight}
            iconSize="lg"
            title="Fluxo de Energia"
            info={{
              title: 'Potência Atual',
              description: 'Informação...',
            }}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Sun strokeWidth={1} size={36} className="text-primary" />
                <div>
                  <TypographySmall muted>Solar</TypographySmall>
                  <TypographyH3 className="text-primary">64.5 kW</TypographyH3>
                </div>
              </div>
              <ChevronDown
                strokeWidth={1}
                size={30}
                className="text-muted-foreground ml-0.75"
              />
              <div className="flex items-center gap-3">
                <SmartphoneCharging
                  strokeWidth={1}
                  size={36}
                  className="text-primary"
                />
                <div>
                  <TypographySmall muted>Baterias</TypographySmall>
                  <div className="flex items-center gap-2">
                    <TypographyH3 className="text-primary">
                      28.7 kW
                    </TypographyH3>
                    <TypographySmall xs muted className="mt-2">
                      92%
                    </TypographySmall>
                  </div>
                </div>
              </div>
              <ChevronDown
                strokeWidth={1}
                size={30}
                className="text-muted-foreground ml-0.75"
              />
              <div className="flex items-center gap-3">
                <HousePlug strokeWidth={1} size={36} className="text-primary" />
                <div>
                  <TypographySmall muted>Carga</TypographySmall>
                  <TypographyH3 className="text-primary">64.5 kW</TypographyH3>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
