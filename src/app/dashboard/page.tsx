import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographySmall } from '@/components/typography/typography-small';

export default function DashboardPage() {
  return (
    <div>
      <TypographyH2>Visão Geral do Sistema</TypographyH2>
      <TypographySmall muted>
        Monitoramento em tempo real do sistema off-grid.
      </TypographySmall>
      <div></div>
    </div>
  );
}
