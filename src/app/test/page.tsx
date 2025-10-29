'use client';

import { useRef, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Simulating a simple Redux-like store
const createStore = () => {
  let state = { value: '' };
  const listeners: Array<() => void> = [];

  return {
    getState: () => state,
    setState: (newValue: string) => {
      state = { value: newValue };
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    },
  };
};

const store = createStore();

// Problematic Component (like current SearchHotelForm)
function ProblemForm() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Simulating Redux state
  const [reduxValue, setReduxValue] = useState('');

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setReduxValue(store.getState().value);
    });
    return unsubscribe;
  }, []);

  // React Hook Form
  const { control } = useForm({
    defaultValues: { input: '' },
    values: { input: reduxValue }, // ⚠️ Syncing with Redux
  });

  // Problem: Double state update (like handleStartDate in SearchHotelForm)
  const handleChange = (value: string, field: { onChange: (val: string) => void }) => {
    field.onChange(value); // ⚠️ Update #1: RHF re-renders
    store.setState(value); // ⚠️ Update #2: Redux re-renders
  };

  return <></>;
}

// Good Component (RHF only)
function GoodForm() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const { control } = useForm({
    defaultValues: { input: '' },
  });

  const handleChange = (value: string, field: { onChange: (val: string) => void }) => {
    field.onChange(value); // ✅ Only update RHF
    // Sync to Redux ONLY on submit, not on every keystroke
  };

  return (
    <div className="border-border space-y-4 rounded-lg border-2 bg-success-bg p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-success-dark">✅ Solution: RHF Only (Recommended)</h3>
        <span className="rounded bg-success-dark px-3 py-1 font-mono text-sm text-white">
          Renders: {renderCount.current}
        </span>
      </div>

      <Controller
        name="input"
        control={control}
        render={({ field }) => (
          <input
            type="text"
            placeholder="Type here..."
            className="border-border w-full rounded border px-3 py-2"
            value={field.value}
            onChange={(e) => handleChange(e.target.value, field)}
          />
        )}
      />

      <div className="rounded bg-success-light p-3 text-xs text-success-dark">
        <p className="font-semibold">What happens on each keystroke:</p>
        <p>1. field.onChange() → RHF state updates → Re-render #1</p>
        <p className="mt-2 font-bold">Result: 1 render per keystroke! ⚡</p>
      </div>
    </div>
  );
}

export default function TestPage() {
  return <div className="h-100 w-100 bg-warning-light"> </div>;
}
