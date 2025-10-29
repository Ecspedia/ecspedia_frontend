import { DEFAULT_CITY_SUGGESTION, POPULAR_DESTINATIONS } from '@/constants';
import { CitySuggestion } from '@/types';
import { Building2, MapIcon, MapPin, MapPinCheck } from 'lucide-react';
import { useState } from 'react';

interface ExpandedLocationFieldProps {
  onLocationSelect: (location: string) => void;
  placeholder: string;
  onClose: () => void;
}

export default function ExpandedLocationTextField(
  expandedLocationFieldProps: ExpandedLocationFieldProps
) {
  const { onLocationSelect, placeholder, onClose: _onClose } = expandedLocationFieldProps;

  const [text, setText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<CitySuggestion[]>([]);

  const suggestion = DEFAULT_CITY_SUGGESTION;

  const maxSuggestionList = 5;

  const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    const filtered = value
      ? suggestion
          .filter(
            (item) =>
              item.city.toLowerCase().includes(value.toLowerCase()) ||
              item.country.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, maxSuggestionList)
      : suggestion.slice(0, maxSuggestionList);
    setFilteredSuggestions(filtered);
  };

  const onClickSuggestion = (value: string) => {
    onLocationSelect(value);
  };

  return (
    <div className="bg-overlay absolute top-0 flex w-full origin-top-left animate-[expandDown_130ms_ease-out] flex-col gap-2 rounded-lg p-4 shadow-lg">
      <input
        type="text"
        value={text}
        onChange={onChangeTextInput}
        placeholder={placeholder}
        className="border-muted-border text-primary w-full rounded-md py-2 text-2xl font-bold focus:border-transparent focus:outline-none"
        autoFocus
      />
      {filteredSuggestions.length > 0 && text.length > 0 && (
        <>
          <Separator />
          <SuggestionList suggestions={filteredSuggestions} onLocationSelect={onClickSuggestion} />
        </>
      )}

      {text.length === 0 && (
        <>
          <Separator />
          <PopularDestinationsTitle />
          <PopularDestinations
            destinations={POPULAR_DESTINATIONS}
            onLocationSelect={onLocationSelect}
          />
        </>
      )}
    </div>
  );
}

const Separator = () => {
  return <div className="bg-border-strong -mx-4 h-px" />;
};

const TileCity = ({ city, country }: CitySuggestion) => {
  return (
    <div className="bg-overlay hover:bg-primary/10 flex cursor-pointer rounded-md px-2 py-2">
      <MapPin className="self-center" />
      <div className="flex flex-col pl-4">
        <div className="text-primary">{city}</div>
        <div className="text-secondary">{country}</div>
      </div>
    </div>
  );
};

const PopularDestinationsTitle = () => {
  return (
    <h3 className="text-color-primary-dark mb-2 text-lg font-semibold">Popular destinations</h3>
  );
};

const SuggestionList = ({
  suggestions,
  onLocationSelect,
}: {
  suggestions: CitySuggestion[];
  onLocationSelect: (city: string) => void;
}) => {
  return (
    <ul className="max-h-80 overflow-y-auto">
      {suggestions.map((item, index) => (
        <li key={index} onClick={() => onLocationSelect(item.city)}>
          <TileCity {...item} />
        </li>
      ))}
    </ul>
  );
};

const PopularDestinations = ({
  destinations,
  onLocationSelect,
}: {
  destinations: CitySuggestion[];
  onLocationSelect: (city: string) => void;
}) => {
  const onClick = (city: string) => {
    onLocationSelect(city);
  };
  return (
    <ul>
      {destinations.map((destination, index) => (
        <li key={index} onClick={() => onClick(destination.city)}>
          <TileCity {...destination} />
        </li>
      ))}
    </ul>
  );
};
