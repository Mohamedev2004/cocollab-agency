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
  LayoutGrid,
  Folder,
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

  const { pendingAppointments } = usePage().props as unknown as {
    pendingAppointments: number;
  }

  let mainNavItems: NavItem[] = [];

  if (user.role === 'admin') {
    mainNavItems = [
      { title: 'Dashboard', href: route('dashboard'), icon: LayoutGrid },
      { title: 'Users', href: route('users.index'), icon: Folder },
      { title: 'Testimonials', href: route('testimonials.index'), icon: Folder },
      { title: 'Contacts', href: route('contacts.index'), icon: Folder },
      { title: 'Newsletters', href: route('newsletters.index'), icon: Folder },
      { title: 'Countdown', href: route('countdown.index'), icon: Folder },
      { 
        title: 'Appointments', 
        href: route('appointments.index'), 
        icon: Folder,
        badge: pendingAppointments
      },
      {
        title: 'Notifications',
        href: route('notifications.index'),
        icon: Folder,
        badge: unreadNotificationsCount,
      },
    ];
  } else if (user.role === 'influencer') {
    mainNavItems = [
      { title: 'Dashboard', href: route('influencer.dashboard'), icon: LayoutGrid },
      { title: 'Mails', href: route('influencer.mails'), icon: Folder },
      { title: 'Messages', href: route('influencer.home'), icon: Folder },
    ];
  } else if (user.role === 'brand') {
    mainNavItems = [
      { title: 'Dashboard', href: route('brand.dashboard'), icon: LayoutGrid },
      { title: 'My Campaigns', href: route('brand.home'), icon: Folder },
      { title: 'Contacts', href: route('brand.home'), icon: Folder },
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
