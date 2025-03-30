
import React from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { VehiclesSection } from "@/components/home/vehicles-section";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PromotionsBanner } from "@/components/home/promotions-banner";
import { LocationMap } from "@/components/home/location-map";
import { QuickBookingWidget } from "@/components/home/quick-booking-widget";
import { FaqSection } from "@/components/home/faq-section";
import { BlogNewsSection } from "@/components/home/blog-news-section";
import { SocialMediaIntegration } from "@/components/home/social-media-integration";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-nova-black text-nova-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCarousel />
        <PromotionsBanner />
        <VehiclesSection />
        <QuickBookingWidget />
        <TestimonialsSection />
        <LocationMap />
        <FaqSection />
        <BlogNewsSection />
        <SocialMediaIntegration />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
