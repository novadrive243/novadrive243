
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { paymentMethod, amount, description, phoneNumber, bookingDetails } = await req.json();
    
    // Process payment based on method
    let paymentResult;
    
    switch (paymentMethod) {
      case 'mpesa':
        paymentResult = await processMPesaPayment(phoneNumber, amount, description);
        break;
      case 'airtel':
        paymentResult = await processAirtelPayment(phoneNumber, amount, description);
        break;
      case 'orange':
        paymentResult = await processOrangePayment(phoneNumber, amount, description);
        break;
      case 'visa':
      case 'mastercard':
        paymentResult = await processCardPayment(paymentMethod, amount, description);
        break;
      default:
        throw new Error('Payment method not supported');
    }
    
    // Store booking details in database if payment was successful
    if (paymentResult.success) {
      const { data: bookingData, error: bookingError } = await supabaseClient
        .from('bookings')
        .insert({
          ...bookingDetails,
          payment_method: paymentMethod,
          payment_status: 'paid',
          payment_reference: paymentResult.reference || '',
        });
        
      if (bookingError) {
        console.error('Error storing booking:', bookingError);
        throw new Error('Failed to store booking details');
      }
    }

    return new Response(
      JSON.stringify(paymentResult),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Payment processing error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

// Mock implementations for different payment providers
// In a production environment, these would connect to the actual payment APIs

async function processMPesaPayment(phoneNumber, amount, description) {
  console.log(`Processing M-Pesa payment: ${amount} for ${description} to ${phoneNumber}`);
  // This would be replaced with actual M-Pesa API integration
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  
  return {
    success: true,
    message: "M-Pesa payment initiated. Please check your phone for confirmation.",
    reference: `MPESA-${Date.now()}`
  };
}

async function processAirtelPayment(phoneNumber, amount, description) {
  console.log(`Processing Airtel Money payment: ${amount} for ${description} to ${phoneNumber}`);
  // This would be replaced with actual Airtel Money API integration
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  
  return {
    success: true,
    message: "Airtel Money payment initiated. Please check your phone for confirmation.",
    reference: `AIRTEL-${Date.now()}`
  };
}

async function processOrangePayment(phoneNumber, amount, description) {
  console.log(`Processing Orange Money payment: ${amount} for ${description} to ${phoneNumber}`);
  // This would be replaced with actual Orange Money API integration
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  
  return {
    success: true,
    message: "Orange Money payment initiated. Please check your phone for confirmation.",
    reference: `ORANGE-${Date.now()}`
  };
}

async function processCardPayment(cardType, amount, description) {
  console.log(`Processing ${cardType} payment: ${amount} for ${description}`);
  // This would be replaced with actual payment gateway integration
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  
  return {
    success: true,
    message: "Card payment processed successfully.",
    reference: `CARD-${Date.now()}`
  };
}
