/**
 * Payment Summary Component
 *
 * Single Responsibility: Display payment total and transaction details
 */

'use client';

interface PaymentSummaryProps {
  totalAmount: number;
  transactionId?: string;
}

export default function PaymentSummary({ totalAmount, transactionId }: PaymentSummaryProps) {
  return (
    <div className="bg-muted rounded-lg p-6">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Total Paid</p>
        <p className="text-2xl font-bold text-success">${totalAmount}</p>
      </div>
      {transactionId && (
        <p className="text-sm text-muted-foreground mt-2">
          Transaction ID: {transactionId}
        </p>
      )}
    </div>
  );
}
