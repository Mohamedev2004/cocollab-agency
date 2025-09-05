import BrandAbout from '@/components/brands-page-components/BrandAbout';
import BrandCard from '@/components/brands-page-components/BrandCard';
import { BrandCta } from '@/components/brands-page-components/BrandCta';
import BrandHero from '@/components/brands-page-components/BrandHero';
import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';

const Brands: React.FC = () => {

    return (
        <Layout>
            <Head title="Brands" />
            <BrandHero />
            <BrandAbout />
            <BrandCard />
            <BrandCta />
        </Layout>
    );
};

export default Brands;
