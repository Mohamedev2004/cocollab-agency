import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';
import InfluencerCard from './../components/influencer-profile-page-components/InfluencerCard';
import InfluencerBio from '@/components/influencer-profile-page-components/InfluencerBio';
import InfluencerPost from '@/components/influencer-profile-page-components/InfluencerPost';
import InfluencerStats from '@/components/influencer-profile-page-components/InfluencerStats';

const InfluencerProfile: React.FC = () => {
    return (
        <Layout>
            <Head title="Influencer Profile" />
            <div className="mx-auto xl:px-8 lg:flex lg:space-x-4">
                {/* Influencer Card (Sidebar) */}
                <aside className="w-full lg:w-80 flex-shrink-0 mb-8 lg:mb-0">
                    {/* InfluencerCard component goes here */}
                    <InfluencerCard />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 space-y-4">
                    {/* InfluencerBio component goes here */}
                    <InfluencerBio />
                    {/* InfluencerStats component goes here */}
                    <InfluencerStats />
                    {/* InfluencerPost component goes here */}
                    <InfluencerPost />
                </main>
            </div>
        </Layout>
    );
};

export default InfluencerProfile;