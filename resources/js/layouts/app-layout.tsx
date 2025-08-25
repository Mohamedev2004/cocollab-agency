import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    user: {
        role: 'admin' | 'influencer' | 'brand';
        name?: string;
        // add other user fields if needed
    };
}

export default ({ children, breadcrumbs, user }: AppLayoutProps) => (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}} exit={{opacity:0}}>
        <AppLayoutTemplate breadcrumbs={breadcrumbs} user={user}>
            {children}
        </AppLayoutTemplate>
    </motion.div>
);
