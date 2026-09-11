import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographySmall } from '@/components/typography/typography-small';
import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

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
        <div className="flex items-center gap-4">
          <Card className="w-1/4">
            <div className="flex items-center gap-3">
              <Zap size={30} strokeWidth={1} className="text-primary" />
              <TypographyP>Potência Atual</TypographyP>
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
