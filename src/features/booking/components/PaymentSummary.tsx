import { Hotel } from '@/types/api';

interface PaymentSummaryProps {
    hotel: Hotel;
    nights?: number;
}

export default function PaymentSummary({ hotel, nights = 1 }: PaymentSummaryProps) {
    const subtotal = hotel.pricePerNight * nights;
    const serviceFee = 0;
    const taxes = 0;
    const total = subtotal + serviceFee + taxes;

    return (
        <div className="bg-surface rounded-lg border border-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Payment Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between text-secondary">
                    <span>${hotel.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary">
                    <span>Service fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-border-default my-2"></div>
                <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

