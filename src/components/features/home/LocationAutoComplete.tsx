"use client";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import TextField from "@/components/ui/TextField";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface LocationAutocompleteProps {
  placeholder?: string;
  onLocationSelect?: (location: string) => void;
}
export default function LocationAutoComplete({
  placeholder = "Enter location",
  onLocationSelect,
}: LocationAutocompleteProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState("");

  const handleTextFieldClick = () => {
    setIsExpanded(true);
  };

  const handleLocationSelect = (location: string) => {
    setValue(location);
    onLocationSelect?.(location);
    setIsExpanded(false);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onLocationSelect?.(newValue);
  };

  return (
    <div className="relative w-1/3">
      {isExpanded && (
        <ExpandedLocationField
          onLocationSelect={handleLocationSelect}
          onClose={() => setIsExpanded(false)}
        />
      )}
      <div className={isExpanded ? "invisible" : ""}>
        <TextField
          placeholder="Where to?"
          onClick={handleTextFieldClick}
          icon={MapPinIcon}
          value={value}
          onChange={handleChange}
          readOnly={false}
        />
      </div>
    </div>
  );
}

interface ExpandedLocationFieldProps {
  onLocationSelect: (location: string) => void;
  onClose: () => void;
}

function ExpandedLocationField({
  onLocationSelect,
  onClose,
}: ExpandedLocationFieldProps) {
  const suggestion = [
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "Paris, France",
    "Sydney, Australia",
    "Rome, Italy",
    "Barcelona, Spain",
    "Berlin, Germany",
    "Buenos Aires, Argentina",
    "Rio de Janeiro, Brazil",
    "Mexico City, Mexico",
    "Lima, Peru",
    "Santiago, Chile",
    "Bogotá, Colombia",
    "Cartagena, Colombia",
    "Cusco, Peru",
  ];
  const [text, setText] = useState("");

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    const filtered = value
      ? suggestion
          .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 6)
      : suggestion.slice(0, 6);
    setFilteredSuggestions(filtered);
  };

  const onClickSuggestion = (value: string) => {
    onLocationSelect(value);
  };

  return (
    <div className="absolute top-0 flex w-full flex-col gap-2 rounded-lg bg-white p-4 shadow-lg ">
      <input
        type="text"
        value={text}
        onChange={onChangeTextInput}
        placeholder="Where to?"
        className="w-full rounded-md border-gray-300 py-4 text-lg placeholder:font-bold focus:border-transparent focus:outline-none"
        autoFocus
      />
      {filteredSuggestions.length > 0 && (
        <ul className="max-h-60 overflow-y-auto">
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer rounded-md px-2 py-2 hover:bg-primary/10"
              onClick={() => onClickSuggestion(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="h-px bg-gray-300 -mx-4" />

      <h3 className="text-color-primary-dark mb-2 text-lg font-semibold">
        Popular destinations
      </h3>
      <ul>
        {["New York, USA", "London, UK", "Tokyo, Japan"].map((destination) => (
          <li
            key={destination}
            onClick={() => onClickSuggestion(destination)}
            className="cursor-pointer rounded-md px-2 py-1 hover:bg-primary/10"
          >
            {destination}
          </li>
        ))}
      </ul>
    </div>
  );
}
