import { TypographyH2 } from '@/components/typography/typography-h2';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographySmall } from '@/components/typography/typography-small';
import { Card } from '@/components/ui/card';
import {
  AreaChartContent,
  type AreaChartDataPoint,
} from '@/components/ui/chart';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, type LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
  width?: string;
  height?: string;
  icon: LucideIcon;
  iconSize?: 'lg' | 'default';
  title: string;
  titleSize?: 'lg' | 'default';
  info?: {
    title: string;
    description: string;
  };
  value?: string;
  description?: string;
  unitMeasurement?: string;
  chartData?: AreaChartDataPoint[];
  chartId?: string;
  children?: ReactNode;
};

export default function DashboardCard({
  width,
  height,
  icon,
  iconSize = 'lg',
  title,
  titleSize = 'default',
  info,
  value,
  description,
  unitMeasurement,
  chartData,
  chartId = 'energy-chart',
  children,
}: Props) {
  const Icon = icon;

  return (
    <Card className={`${width} ${height} gap-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon
            size={iconSize === 'lg' ? 32 : 18}
            strokeWidth={1}
            className="text-primary"
          />
          {titleSize === 'default' ? (
            <TypographySmall>{title}</TypographySmall>
          ) : (
            <TypographyP>{title}</TypographyP>
          )}
        </div>
        {info && (
          <Tooltip>
            <TooltipTrigger>
              <Info size={16} className="text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col items-start gap-2">
                <TypographySmall medium>{info.title}</TypographySmall>
                <TypographySmall muted>{info.description}</TypographySmall>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {value && (
        <TypographyH2>
          {value}{' '}
          {unitMeasurement && (
            <span className="text-lg text-muted-foreground">
              {unitMeasurement}
            </span>
          )}
        </TypographyH2>
      )}
      {description && <TypographySmall muted>{description}</TypographySmall>}
      {chartData && <AreaChartContent id={chartId} data={chartData} />}
      {children && <div>{children}</div>}
    </Card>
  );
}
