import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Toaster } from '@/components/ui/sonner';
import UserRegistrationListener from '@/components/UserRegistrationListener';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AppSidebarLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    user: {
        role: 'admin' | 'influencer' | 'brand';
        name?: string;
        // you can add more user fields if needed
    };
}

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    user,
}: PropsWithChildren<AppSidebarLayoutProps>) {
    return (
        <AppShell variant="sidebar">
            {/* Pass user prop to AppSidebar */}
            <AppSidebar user={user} />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <UserRegistrationListener user={user} />
                <Toaster />
                {children}
            </AppContent>
        </AppShell>
    );
}
