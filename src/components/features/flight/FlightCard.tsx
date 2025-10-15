import Button from "@/components/ui/Button";
import Image from "next/image";
import { UI_DIMENSIONS } from "@/constants";

interface FlightCardProps {
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  arrivalTime: string;
  company: string;
  price: number;
  totalTime: string;
}

export default function FlightCard(flightCardProps: FlightCardProps) {
  const {
    departureLocation,
    arrivalLocation,
    departureTime,
    arrivalTime,
    company,
    price,
    totalTime,
  } = flightCardProps;

  return (
    <div className="flex justify-between rounded-lg border border-border p-4">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <div className="text-primary text-3xl font-bold">{departureTime}</div>
          <div className="text-primary/50">{departureLocation}</div>
        </div>

        <div className="flex flex-col items-center justify-center px-8 pb-4">
          <div className="mb-1 text-xs text-gray-400">{totalTime}</div>
          <div className="flex items-center gap-2">
            <div className="h-px w-16 bg-gray-300"></div>
            <div className="text-xs font-semibold text-amber-500">1 Stop</div>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-primary text-3xl font-bold">{arrivalTime}</div>
          <div className="text-primary/50">{arrivalLocation}</div>
        </div>
      </div>
      <div className="flex">
        <div className="relative mr-16 h-24 overflow-hidden rounded-lg">
          <div className="flex h-full items-center px-6 py-3">
            <div
              className="relative z-20 rounded-lg border-white"
              style={{ borderWidth: UI_DIMENSIONS.FLIGHT_CARD_COMPANY_LOGO_BORDER }}
            >
              <Image
                width={UI_DIMENSIONS.AIRLINE_ICON_SIZE}
                height={UI_DIMENSIONS.AIRLINE_ICON_SIZE}
                src="/images/home/latam_airlines_icon.png"
                alt="LATAM Airlines"
              />
            </div>
            <div className="text-primary ml-2 font-semibold">{company}</div>
          </div>
          <div className="bg-primary absolute inset-0 opacity-5"></div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-primary/50 text-xs">FROM</div>
          <div className="text-primary text-3xl font-bold">${price}</div>
          <Button
            className="px-6 py-3 font-medium text-white"
            text="Select Flight"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
}
