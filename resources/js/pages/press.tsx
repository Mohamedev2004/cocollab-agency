import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';
import PressHero from '@/components/press-page-components/PressHero';
import PressWhy from '@/components/press-page-components/PressWhy';
import PressHow from '@/components/press-page-components/PressHow';

const Home: React.FC = () => {

    return (
        <Layout>
            <Head title="Press" />
            <PressHero />
            <PressWhy />
            <PressHow />
        </Layout>
    );
};

export default Home;
