"use client";

import { useState, useEffect, useCallback } from 'react';
import Hero from '@/components/Hero';
import BrandStory from '@/components/BrandStory';
import Features from '@/components/Features';
import Reviews from '@/components/Reviews';
import ProductSpecs from '@/components/ProductSpecs';
import FaqList from '@/components/FaqList';
import SubscriptionForm from '@/components/SubscriptionForm';
import Footer from '@/components/Footer';

export default function Home() {
  const [totalReservations, setTotalReservations] = useState(0);

  const fetchReservations = useCallback(async () => {
    try {
      const response = await fetch('/api/reservations');
      const data = await response.json();
      setTotalReservations(data.totalReservations);
    } catch (error) {
      console.error('予約者数の取得に失敗しました：', error);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 30000);
    return () => clearInterval(interval);
  }, [fetchReservations]);

  const scrollToEmailSection = () => {
    const section = document.getElementById('email-signup-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-start relative w-full min-h-screen">
      <Hero 
        totalReservations={totalReservations} 
        onScrollToEmail={scrollToEmailSection} 
      />

      {/* Main Content */}
      <div className="w-full pt-16 bg-background">
        <BrandStory />
        <Features />
        <Reviews />
        <ProductSpecs />
        <FaqList />
        <SubscriptionForm onSuccess={fetchReservations} />
        <Footer />
      </div>
    </div>
  );
}