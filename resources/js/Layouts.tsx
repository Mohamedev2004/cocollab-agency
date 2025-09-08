"use client";

import React, { ReactNode, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0 }}
      >
        {/* ✅ Force light mode here */}
        <div className="flex flex-col min-h-screen bg-[#dcdcdc] text-gray-900">
          <Header />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </div>
      </motion.div>
    </ThemeProvider>
  );
};

export default Layout;
