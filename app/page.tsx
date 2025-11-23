"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [timeLeft, setTimeLeft] = useState('');

  const targetDate = useMemo(() => new Date('2025-12-10T00:00:00'), []);

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('予約終了！');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`D-${days} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const scrollToEmailSection = () => {
    const section = document.getElementById('email-signup-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-start relative w-full min-h-screen">
      <Hero 
        totalReservations={totalReservations} 
        timeLeft={timeLeft} 
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