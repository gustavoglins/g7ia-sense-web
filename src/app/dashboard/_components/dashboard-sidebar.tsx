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
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/api/auth-client';
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
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending: isLoading } = authClient.useSession();

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

  async function onSignOut() {
    await authClient.signOut();
    router.replace(ROUTES.AUTH.LOGIN);
    router.refresh();
  }

  return (
    <aside className="h-dvh w-full max-w-72 shrink-0 overflow-y-auto border-r border-r-accent-muted pt-6 pb-0 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-6">
          <div className="relative isolate w-1/2 before:pointer-events-none before:absolute before:top-1/2 before:left-0 before:-z-10 before:h-16 before:w-20 before:-translate-y-1/2 before:rounded-full before:bg-primary/20 before:blur-xl">
            <img
              src="https://ia-sense-dashboard.netlify.app/assets/logo-iasense.png"
              alt="G7i Energy logo"
              className="w-full drop-shadow-[0_0_8px_var(--primary-border)]"
            />
          </div>
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
                      'flex items-center gap-4 rounded-xl border-2 border-transparent px-4 py-3 text-sm font-medium text-foreground transition-all',
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
          <DropdownMenuTrigger
            className="w-full min-w-0"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            <div className="flex min-w-0 items-center justify-between rounded-2xl p-2 transition-colors hover:bg-muted cursor-pointer">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {isLoading ? (
                  <>
                    <Skeleton className="size-10 shrink-0 rounded-full motion-reduce:animate-none" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <Skeleton className="h-3.5 w-28 motion-reduce:animate-none" />
                      <Skeleton className="h-3 w-20 motion-reduce:animate-none" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar size="lg">
                      <AvatarFallback>
                        <UserCircle strokeWidth={1.5} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-start">
                      <TypographySmall medium className="w-full truncate">
                        {session?.user.name}
                      </TypographySmall>
                      <TypographySmall muted className="w-full truncate">
                        {session?.user.username}
                      </TypographySmall>
                    </div>
                  </>
                )}
              </div>
              <ChevronRight
                size={16}
                className="shrink-0 text-muted-foreground"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onSignOut}>
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
