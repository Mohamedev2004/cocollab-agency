import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';
import BrandCard from '@/components/brand-profile-page-components/BrandCard';
import BrandBio from '@/components/brand-profile-page-components/BrandBio';
import BrandStats from '@/components/brand-profile-page-components/BrandStats';
import BrandPost from '@/components/brand-profile-page-components/BrandPost';

const BrandProfile: React.FC = () => {
    return (
        <Layout>
            <Head title="Brand Profile" />
            <div className="mx-auto xl:px-8 lg:flex lg:space-x-4">
                {/* Brand Card (Sidebar) */}
                <aside className="w-full lg:w-80 flex-shrink-0 mb-8 lg:mb-0">
                    {/* BrandCard component goes here */}
                    <BrandCard />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 space-y-4">
                    {/* BrandBio component goes here */}
                    <BrandBio />
                    {/* BrandStats component goes here */}
                    <BrandStats/>
                    {/* BrandPost component goes here */}
                    <BrandPost />
                </main>
            </div>
        </Layout>
    );
};

export default BrandProfile;