import Layout from '@/Layouts';
import { Head } from '@inertiajs/react';
import React from 'react';
import ContactForm from '@/components/contact-page-components/ContactForm';

const Home: React.FC = () => {

    return (
        <Layout>
            <Head title="Contact" />
            <ContactForm />
        </Layout>
    );
};

export default Home;
