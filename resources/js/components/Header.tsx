/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

interface PageProps {
  auth?: {
    user?: User | null;
  };
  [key: string]: any; // required for Inertia
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { auth } = usePage<PageProps>().props;
  const user = auth?.user;

  const isAuthenticated = !!user;

  const routesByRole = {
    admin: {
      home: route('admin.home'),
      influencers: route('admin.home'),
      brands: route('admin.home'),
      pricing: route('admin.home'),
      about: route('admin.home'),
      contact: route('admin.home'),
      dashboard: route('dashboard'),
    },
    influencer: {
      home: route('influencer.home'),
      influencers: route('influencer.home'),
      brands: route('influencer.home'),
      pricing: route('influencer.home'),
      about: route('influencer.home'),
      contact: route('influencer.home'),
      dashboard: route('influencer.dashboard'),
    },
    brand: {
      home: route('brand.home'),
      influencers: route('brand.home'),
      brands: route('brand.home'),
      pricing: route('brand.home'),
      about: route('brand.home'),
      contact: route('brand.home'),
      dashboard: route('brand.home'),
    },
    guest: {
      home: route('home'),
      influencers: route('home'),
      brands: route('home'),
      pricing: route('home'),
      about: route('home'),
      contact: route('contact'),
      dashboard: route('home'),
    },
  };

  const currentRoutes = user
    ? routesByRole[user.role as 'admin' | 'influencer' | 'brand']
    : routesByRole.guest;

  const dashboardLabel = () => {
    if (!user) return '';
    if (user.role === 'admin') return 'Dashboard';
    if (user.role === 'influencer') return 'Influencer Dashboard';
    if (user.role === 'brand') return 'Brand Dashboard';
    return 'Dashboard';
  };

  return (
    <header className="bg-white mt-3 mx-3 py-4 shadow-sm rounded-2xl sticky top-2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="w-28 sm:w-32">
          <Link href={currentRoutes.home}>
            <img src="/assets/logo.svg" alt="Logo" className="w-full h-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-2 text-black font-medium">
          <Link href={currentRoutes.home} className="px-4 py-1.5 text-sm rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Home</Link>
          <Link href={currentRoutes.influencers} className="px-4 py-1.5 text-sm rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Influencers</Link>
          <Link href={currentRoutes.brands} className="px-4 py-1.5 text-sm rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Brands</Link>
          <Link href={currentRoutes.pricing} className="px-4 py-1.5 text-sm rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Pricing</Link>
          <Link href={currentRoutes.about} className="px-4 py-1.5 text-sm rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">About us</Link>
          <Link href={currentRoutes.contact} className="px-4 py-1.5 text-sm rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Link
                href={currentRoutes.dashboard}
                className="bg-[var(--color-cocollab)] text-white text-md px-4 py-1.5 rounded-lg font-medium transition-all duration-300 hover:opacity-90"
                style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}
              >
                {dashboardLabel()}
              </Link>
              <button
                onClick={() => router.post(route('logout'))}
                className="border border-[var(--color-cocollab)] text-[var(--color-cocollab)] text-md px-4 py-1.5 rounded-lg font-medium transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white cursor-pointer"
                style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="border border-[var(--color-cocollab)] text-[var(--color-cocollab)] text-md px-4 py-1.5 rounded-lg font-medium transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white"
                style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="bg-[var(--color-cocollab)] text-white text-md px-4 py-1.5 rounded-lg font-medium transition-all duration-300 hover:opacity-90"
                style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}
              >
                Sign in
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden text-3xl text-[var(--color-cocollab)] cursor-pointer font-bolder focus:outline-none">
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col items-start space-y-3 font-medium px-4 sm:px-6 text-black">
          <Link href={currentRoutes.home} className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Home</Link>
          <Link href={currentRoutes.influencers} className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Influencers</Link>
          <Link href={currentRoutes.brands} className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Brands</Link>
          <Link href={currentRoutes.pricing} className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Pricing</Link>
          <Link href={currentRoutes.about} className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">About us</Link>
          <Link href={currentRoutes.contact} className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Contact</Link>

          {isAuthenticated ? (
            <>
              <Link href={currentRoutes.dashboard} className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">
                {dashboardLabel()}
              </Link>
              <button
                onClick={() => router.post(route('logout'))}
                className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Sign in</Link>
              <Link href="/register" className="px-4 py-1.5 w-full text-center rounded-md transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white">Sign up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
