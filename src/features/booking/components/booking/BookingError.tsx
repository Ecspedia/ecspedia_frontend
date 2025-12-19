interface BookingErrorProps {
    error: string | null;
}

export default function BookingError({ error }: BookingErrorProps) {
    if (!error) return null;

    return (
        <div className="mb-4 rounded-lg bg-error/20 border border-error p-4">
            <p className="text-error text-sm font-medium">{error}</p>
        </div>
    );
}
