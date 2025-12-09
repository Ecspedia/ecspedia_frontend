'use client';
import { Input } from '@/components/ui';
import { useFilter } from '@/hooks';
import { Hotel } from 'lucide-react';
import { useId, useState } from 'react';

interface SearchSelectorProps<T extends Record<string, unknown>> {
  placeholder: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  suggestList: T[];
  searchField: keyof T;
  titleLabel?: string;
  maxResults?: number;
}

export default function SearchSelector<T extends Record<string, unknown>>(searchSelectorProps: SearchSelectorProps<T>) {
  const { placeholder, onSelect, onClose, suggestList, searchField, titleLabel = 'Popular items', maxResults = 4 } = searchSelectorProps;
  const [text, setText] = useState('');
  const inputId = useId();
  const filteredSuggestions: T[] = useFilter(suggestList, searchField, text);

  const hasQuery: boolean = text.trim().length > 0;
  const hasResults: boolean = filteredSuggestions.length > 0;
  const displayField: keyof T = searchField;

  const handleSelect = (item: T) => {
    onSelect(String(item[searchField]));
    onClose();
  };

  return (
    <div className="bg-overlay absolute top-0 flex w-full origin-top-left animate-[expandDown_130ms_ease-out] flex-col gap-2 rounded-none p-4 shadow-lg lg:rounded-lg">
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <Input
        id={inputId}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="border-muted-border text-primary w-full rounded-md py-2 text-2xl font-bold focus:border-transparent focus:outline-none"
        autoFocus
        autoComplete="off"
        aria-label={placeholder}
      />

      <div className="bg-border-strong -mx-4 h-px" />

      {hasQuery && hasResults && (
        <ItemList
          items={filteredSuggestions}
          onSelect={handleSelect}
          displayField={displayField}
        />
      )}

      {hasQuery && !hasResults && (
        <p className="text-secondary py-4 text-center">No results found</p>
      )}

      {!hasQuery && (
        <>
          <h3 className="text-primary text-lg font-semibold">{titleLabel}</h3>
          <ItemList
            items={suggestList.slice(0, maxResults)}
            onSelect={handleSelect}
            displayField={displayField}
          />
        </>
      )}
    </div>
  );
}

function ItemList<T extends Record<string, unknown>>({
  items,
  onSelect,
  displayField,
}: {
  items: T[];
  onSelect: (item: T) => void;
  displayField: keyof T;
}) {
  return (
    <ul className="max-h-80 overflow-y-auto">
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => onSelect(item)}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
          tabIndex={0}
          className="bg-overlay hover:bg-primary/10 flex cursor-pointer rounded-md px-2 py-2"
        >
          <Hotel className="self-center" width={20} height={20} />
          <span className="text-primary pl-2 flex-1">{String(item[displayField])}</span>
        </li>
      ))}
    </ul>
  );
}

