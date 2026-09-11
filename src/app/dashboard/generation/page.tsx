import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographySmall } from '@/components/typography/typography-small';
import { Card } from '@/components/ui/card';
import { Gauge, Radio, Sun } from 'lucide-react';

export default function DashboardGenerationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <TypographyH2>Geração de Energia</TypographyH2>
        <TypographySmall muted>
          Acompanhamento da geração fotovoltaica em tempo real.
        </TypographySmall>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Card className="w-1/3">
            <div className="flex items-center gap-3">
              <Sun size={30} strokeWidth={1} className="text-primary" />
              <TypographyP>Geração Total Hoje</TypographyP>
            </div>
            <TypographyH2>
              52.3 <span className="text-lg text-muted-foreground">kw</span>
            </TypographyH2>
          </Card>
          <Card className="w-1/3">
            <div className="flex items-center gap-3">
              <Radio size={30} strokeWidth={1} className="text-primary" />
              <TypographyP>Irradiação Atual</TypographyP>
            </div>
            <TypographyH2>
              52.3 <span className="text-lg text-muted-foreground">kw</span>
            </TypographyH2>
          </Card>
          <Card className="w-1/3">
            <div className="flex items-center gap-3">
              <Gauge size={30} strokeWidth={1} className="text-primary" />
              <TypographyP>Eficiência Média</TypographyP>
            </div>
            <TypographyH2>
              52.3 <span className="text-lg text-muted-foreground">kw</span>
            </TypographyH2>
          </Card>
        </div>
      </div>
    </div>
  );
}
