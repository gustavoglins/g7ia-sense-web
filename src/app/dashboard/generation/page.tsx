import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographySmall } from '@/components/typography/typography-small';

export default function DashboardGenerationPage() {
  return (
    <div>
      <div>
        <TypographyH2>Geração de Energia</TypographyH2>
        <TypographySmall muted>
          Acompanhamento da geração fotovoltaica em tempo real.
        </TypographySmall>
      </div>
    </div>
  );
}
