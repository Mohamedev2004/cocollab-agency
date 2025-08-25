import InfluencerCard from '@/components/influencers-page-components/InfluencerCard';
import InfluencerHero from '@/components/influencers-page-components/InfluencerHero';
import InfluencerStep from '@/components/influencers-page-components/InfluencerStep';
import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';

const Home: React.FC = () => {

    return (
        <Layout>
            <Head title="Influencers" />
            <InfluencerHero />
            <InfluencerCard />
            <InfluencerStep />
        </Layout>
    );
};

export default Home;
