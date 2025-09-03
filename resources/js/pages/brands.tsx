import BrandAbout from '@/components/brands-page-components/BrandAbout';
import BrandHero from '@/components/brands-page-components/BrandHero';
import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';

const Home: React.FC = () => {

    return (
        <Layout>
            <Head title="Brands" />
            <BrandHero />
            <BrandAbout />
        </Layout>
    );
};

export default Home;
