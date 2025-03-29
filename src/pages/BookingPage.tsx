
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BookingForm } from '@/components/booking/booking-form';

const BookingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-4">
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
