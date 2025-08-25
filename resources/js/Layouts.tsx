import React, { ReactNode, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
   useEffect(() => {
    AOS.init({ duration: 1000 });

   }, []);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}} exit={{opacity:0}}>
      <div className="flex flex-col min-h-screen bg-[#dcdcdc]">
        <Header />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Layout;
