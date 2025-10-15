import { DEFAULT_CITY_SUGGESTION, POPULAR_DESTINATIONS } from '@/constants';
import { CitySuggestion } from '@/types';
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

  const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    const filtered = value
      ? suggestion
          .filter((item) => item.city.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 6)
      : suggestion.slice(0, 6);
    setFilteredSuggestions(filtered);
  };

  const onClickSuggestion = (value: string) => {
    onLocationSelect(value);
  };

  return (
    <div className="absolute top-0 flex w-full flex-col gap-2 rounded-lg bg-white p-4 shadow-lg">
      <input
        type="text"
        value={text}
        onChange={onChangeTextInput}
        placeholder={placeholder}
        className="w-full rounded-md border-gray-300 py-4 text-lg placeholder:font-bold focus:border-transparent focus:outline-none"
        autoFocus
      />
      {filteredSuggestions.length > 0 && (
        <ul className="max-h-60 overflow-y-auto">
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              className="hover:bg-primary/10 cursor-pointer rounded-md px-2 py-2"
              onClick={() => onClickSuggestion(item.city)}
            >
              {item.city}
            </li>
          ))}
        </ul>
      )}
      <div className="-mx-4 h-px bg-gray-300" />

      <h3 className="text-color-primary-dark mb-2 text-lg font-semibold">Popular destinations</h3>
      <ul>
        {POPULAR_DESTINATIONS.map((destination) => (
          <li
            key={destination.city}
            onClick={() => onClickSuggestion(destination.city)}
            className="hover:bg-primary/10 cursor-pointer rounded-md px-2 py-1"
          >
            {destination.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
