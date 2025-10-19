import { useHotelCardContext } from './utils';

export default function HotelCardInfo() {
  const { hotel } = useHotelCardContext();
  return (
    <div className="flex flex-col">
      {' '}
      <h3 className="text-primary cursor-pointer text-lg font-semibold hover:underline">
        {hotel.name}
      </h3>
      <p className="text-primary/60 mt-1 text-sm">{hotel.location}</p>{' '}
    </div>
  );
}
