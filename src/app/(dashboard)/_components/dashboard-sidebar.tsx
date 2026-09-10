'use client';

import { TypographyLarge } from '@/components/typography/typography-large';
import { TypographyP } from '@/components/typography/typography-p';
import { TypographySmall } from '@/components/typography/typography-small';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/shared/routes';
import {
  ChevronRight,
  Hexagon,
  LayoutGrid,
  LogOut,
  PanelLeftClose,
  UserCircle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Visão Geral',
      icon: LayoutGrid,
      href: ROUTES.DASHBOARD.ROOT,
    },
    {
      label: 'Dispositivos',
      icon: Hexagon,
      href: ROUTES.DASHBOARD.DEVICES,
    },
    {
      label: 'Geração',
      icon: Zap,
      href: ROUTES.DASHBOARD.GENERATION,
    },
  ];

  return (
    <aside className="max-w-72 w-full min-h-dvh border-r border-r-accent-muted pt-6 pb-0 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-6">
          <img
            src="https://ia-sense-dashboard.netlify.app/assets/logo-iasense.png"
            alt="G7i Energy logo"
            className="w-1/2"
          />
          <PanelLeftClose className="text-muted-foreground" />
        </div>
        <nav className="px-3">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== ROUTES.DASHBOARD.ROOT &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-4 rounded-xl border-2 border-transparent px-4 py-3 text-sm font-medium text-foreground transition-colors',
                      isActive &&
                        'border-primary-border bg-primary-surface text-primary shadow-[0_4px_18px_0px_var(--primary-border)]',
                    )}
                  >
                    <item.icon
                      size={18}
                      className={cn(
                        isActive ? 'text-primary' : 'text-muted-foreground',
                      )}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <Separator />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-muted transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <Avatar size="lg">
                  <AvatarFallback>
                    <UserCircle strokeWidth={1.5} />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-start">
                  <TypographyP medium>Adminstrador</TypographyP>
                  <TypographySmall muted>admin@g7ia.com</TypographySmall>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => authClient.signOut()}>
                <div className="flex items-center gap-4">
                  <LogOut className="text-destructive-foreground  " />
                  <div className="flex flex-col gap-2">
                    <TypographySmall medium>Sair da conta</TypographySmall>
                    <TypographySmall xs muted>
                      Encerrar esta sessão
                    </TypographySmall>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
