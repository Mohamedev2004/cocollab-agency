import About from '@/components/welcome-page-components/About';
import Hero from '@/components/welcome-page-components/Hero';
import HowItWorks from '@/components/welcome-page-components/HowItWorks';
import Partners from '@/components/welcome-page-components/Partners';
import Pricing from '@/components/welcome-page-components/Pricing';
import QuestionAnswer from '@/components/welcome-page-components/QuestionAnswer';
import Testimonials from '@/components/welcome-page-components/Testimonials';
import WhyChooseUs from '@/components/welcome-page-components/WhyChooseUs';
import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';

const Home: React.FC = () => {

    return (
        <Layout>
            <Head title="Welcome" />
            <Hero />
            <Partners />
            <About />
            <HowItWorks />
            <WhyChooseUs />
            <Testimonials />
            <Pricing />
            <QuestionAnswer />
        </Layout>
    );
};

export default Home;
