import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, amount, currency } = body;

    if (!bookingId || !amount) {
      return new Response(JSON.stringify({ error: 'Missing bookingId or amount' }), { status: 400 });
    }

    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return new Response(JSON.stringify({ error: 'Stripe secret not configured' }), { status: 500 });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' });

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: (currency || 'usd').toLowerCase(),
            product_data: {
              name: `Booking ${bookingId}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/my-bookings?paid=${bookingId}`,
      cancel_url: `${origin}/my-bookings?canceled=true`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}
