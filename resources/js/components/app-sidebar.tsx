import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  Sticker,
  LayoutGrid,
  MailCheck,
  MessageSquareText,
  User,
  Clock,
  BellPlus,
} from 'lucide-react';
import AppLogo from './app-logo';

interface AppSidebarProps {
  user: {
    role: 'admin' | 'influencer' | 'brand';
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  // get unread notifications count from Inertia shared props
  const { unreadNotificationsCount } = usePage().props as unknown as {
    unreadNotificationsCount: number;
  };

  let mainNavItems: NavItem[] = [];

  if (user.role === 'admin') {
    mainNavItems = [
      { title: 'Dashboard', href: route('dashboard'), icon: LayoutGrid },
      { title: 'Users', href: route('users.index'), icon: User },
      { title: 'Testimonials', href: route('testimonials.index'), icon: Sticker },
      { title: 'Contacts', href: route('contacts.index'), icon: MessageSquareText },
      { title: 'Newsletters', href: route('newsletters.index'), icon: MailCheck },
      { title: 'Countdown', href: route('countdown.index'), icon: Clock },
      {
        title: 'Notifications',
        href: route('notifications.index'),
        icon: BellPlus,
        badge: unreadNotificationsCount,
      },
    ];
  } else if (user.role === 'influencer') {
    mainNavItems = [
      { title: 'Dashboard', href: route('influencer.dashboard'), icon: LayoutGrid },
      { title: 'Campaigns', href: route('influencer.home'), icon: Sticker },
      { title: 'Messages', href: route('influencer.home'), icon: MessageSquareText },
    ];
  } else if (user.role === 'brand') {
    mainNavItems = [
      { title: 'Dashboard', href: route('brand.dashboard'), icon: LayoutGrid },
      { title: 'My Campaigns', href: route('brand.home'), icon: Sticker },
      { title: 'Contacts', href: route('brand.home'), icon: MessageSquareText },
    ];
  }

  const getHomeRoute = () => {
    if (user.role === 'admin') return route('admin.home');
    if (user.role === 'influencer') return route('influencer.home');
    if (user.role === 'brand') return route('brand.home');
    return route('home');
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={getHomeRoute()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
