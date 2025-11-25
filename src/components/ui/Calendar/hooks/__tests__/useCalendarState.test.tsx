import { DateHelper } from '@/utils/dateHelpers';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCalendarState } from '../useCalendarState';

// Mock the useFullscreenPopup hook
vi.mock('@/components/shared/ExpandableTextField/FullscreenPopupContext', () => ({
  useFullscreenPopup: () => ({
    popup: null,
    setPopup: vi.fn(),
  }),
}));

describe('useCalendarState', () => {
  describe('Initialization', () => {
    it('should initialize with default dates when no props provided', () => {
      const { result } = renderHook(() => useCalendarState());

      const { state } = result.current.contextValue;

      expect(state.startDate).toBeDefined();
      expect(state.endDate).toBeDefined();
      expect(state.leftDate).toBeDefined();
      expect(state.rightDate).toBeDefined();
      expect(state.rightDate.getMonth()).toBe((state.leftDate.getMonth() + 1) % 12);
    });

    it('should initialize with custom initial dates', () => {
      const customStart = new Date(2025, 5, 10);
      const customEnd = new Date(2025, 5, 20);

      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: customStart,
          initialEndDate: customEnd,
        })
      );

      expect(result.current.contextValue.state.startDate).toEqual(customStart);
      expect(result.current.contextValue.state.endDate).toEqual(customEnd);
    });

    it('should initialize with null dates when provided', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: null,
          initialEndDate: null,
        })
      );

      expect(result.current.contextValue.state.startDate).toBeNull();
      expect(result.current.contextValue.state.endDate).toBeNull();
    });
  });

  describe('Month Navigation', () => {
    describe('handlePrevLeft', () => {
      it('should navigate to previous month', () => {
        const initialStart = new Date(2025, 2, 15);

        const { result } = renderHook(() =>
          useCalendarState({
            initialStartDate: initialStart,
            initialEndDate: new Date(2025, 2, 16),
          })
        );

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(2);
        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(3);

        act(() => {
          result.current.contextValue.actions.handlePrevLeft();
        });

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(1);
        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(2);
        expect(result.current.contextValue.state.leftDate.getFullYear()).toBe(2025);
        expect(result.current.contextValue.state.rightDate.getFullYear()).toBe(2025);
      });

      it('should handle year transition when navigating to previous month', () => {
        const initialStart = new Date(2025, 0, 15);

        const { result } = renderHook(() =>
          useCalendarState({
            initialStartDate: initialStart,
            initialEndDate: new Date(2025, 0, 16),
          })
        );

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(0);
        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(1);

        act(() => {
          result.current.contextValue.actions.handlePrevLeft();
        });

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(11);
        expect(result.current.contextValue.state.leftDate.getFullYear()).toBe(2024);

        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(0);
        expect(result.current.contextValue.state.rightDate.getFullYear()).toBe(2025);
      });
    });

    describe('handleNextRight', () => {
      it('should navigate to next month', () => {
        const initialStart = new Date(2025, 2, 15);

        const { result } = renderHook(() =>
          useCalendarState({
            initialStartDate: initialStart,
            initialEndDate: new Date(2025, 2, 16),
          })
        );

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(2);
        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(3);

        act(() => {
          result.current.contextValue.actions.handleNextRight();
        });

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(3);
        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(4);
        expect(result.current.contextValue.state.leftDate.getFullYear()).toBe(2025);
        expect(result.current.contextValue.state.rightDate.getFullYear()).toBe(2025);
      });

      it('should handle year transition when navigating to next month', () => {
        const initialStart = new Date(2025, 11, 15);

        const { result } = renderHook(() =>
          useCalendarState({
            initialStartDate: initialStart,
            initialEndDate: new Date(2025, 11, 16),
          })
        );

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(11);
        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(0);
        expect(result.current.contextValue.state.rightDate.getFullYear()).toBe(2026);

        act(() => {
          result.current.contextValue.actions.handleNextRight();
        });

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(0);
        expect(result.current.contextValue.state.leftDate.getFullYear()).toBe(2026);

        expect(result.current.contextValue.state.rightDate.getMonth()).toBe(1);
        expect(result.current.contextValue.state.rightDate.getFullYear()).toBe(2026);
      });
    });

    describe('Multiple navigations', () => {
      it('should handle multiple navigation calls correctly', () => {
        const initialStart = new Date(2025, 5, 15);

        const { result } = renderHook(() =>
          useCalendarState({
            initialStartDate: initialStart,
            initialEndDate: new Date(2025, 5, 16),
          })
        );

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(5);

        act(() => {
          result.current.contextValue.actions.handleNextRight();
        });
        act(() => {
          result.current.contextValue.actions.handleNextRight();
        });
        act(() => {
          result.current.contextValue.actions.handleNextRight();
        });

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(8);

        act(() => {
          result.current.contextValue.actions.handlePrevLeft();
        });
        act(() => {
          result.current.contextValue.actions.handlePrevLeft();
        });

        expect(result.current.contextValue.state.leftDate.getMonth()).toBe(6);
      });
    });
  });

  describe('Date Selection - Case 2: First click (no dates selected)', () => {
    it('should set startDate and endDate (+1 day) on first click', () => {
      const onDateRangeSelect = vi.fn();
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: null,
          initialEndDate: null,
          onDateRangeSelect,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(20, new Date(2025, 0, 1));
      });

      const selectedDate = new Date(2025, 0, 20);
      const expectedEndDate = DateHelper.addOneDay(selectedDate);

      expect(result.current.contextValue.state.startDate).toEqual(selectedDate);
      expect(result.current.contextValue.state.endDate).toEqual(expectedEndDate);

      expect(onDateRangeSelect).toHaveBeenCalledWith(selectedDate, expectedEndDate);
    });
  });

  describe('Date Selection - Case 3: startDate set, endDate not set', () => {
    it('should set endDate when clicking date after startDate', () => {
      const onDateRangeSelect = vi.fn();
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: null,
          onDateRangeSelect,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(15, new Date(2025, 0, 1));
      });

      expect(result.current.contextValue.state.startDate).toEqual(new Date(2025, 0, 10));
      expect(result.current.contextValue.state.endDate).toEqual(new Date(2025, 0, 15));
      expect(onDateRangeSelect).toHaveBeenCalledWith(new Date(2025, 0, 10), new Date(2025, 0, 15));
    });

    it('should reset startDate when clicking date before startDate', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: null,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(5, new Date(2025, 0, 1));
      });

      expect(result.current.contextValue.state.startDate).toEqual(new Date(2025, 0, 5));
      expect(result.current.contextValue.state.endDate).toBeNull();
    });
  });

  describe('Date Selection - Case 4: Both dates set', () => {
    it('should start new range when clicking on non-consecutive dates', () => {
      const onDateRangeSelect = vi.fn();
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: new Date(2025, 0, 15),
          onDateRangeSelect,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(20, new Date(2025, 0, 1));
      });

      const expectedStartDate = new Date(2025, 0, 20);
      const expectedEndDate = DateHelper.addOneDay(expectedStartDate);

      expect(result.current.contextValue.state.startDate).toEqual(expectedStartDate);
      expect(result.current.contextValue.state.endDate).toEqual(expectedEndDate);
    });

    it('should extend range when dates are consecutive and clicking after endDate', () => {
      const onDateRangeSelect = vi.fn();
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: new Date(2025, 0, 11),
          onDateRangeSelect,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(15, new Date(2025, 0, 1));
      });

      expect(result.current.contextValue.state.startDate).toEqual(new Date(2025, 0, 10));
      expect(result.current.contextValue.state.endDate).toEqual(new Date(2025, 0, 15));
    });

    it('should change startDate when dates are consecutive and clicking before startDate', () => {
      const onDateRangeSelect = vi.fn();
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: new Date(2025, 0, 11),
          onDateRangeSelect,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(5, new Date(2025, 0, 1));
      });

      const expectedStartDate = new Date(2025, 0, 5);
      const expectedEndDate = DateHelper.addOneDay(expectedStartDate);

      expect(result.current.contextValue.state.startDate).toEqual(expectedStartDate);
      expect(result.current.contextValue.state.endDate).toEqual(expectedEndDate);
    });
  });

  describe('Date Selection - Case 1: Deselect range', () => {
    it('should deselect when clicking on startDate with consecutive dates', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: new Date(2025, 0, 11),
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(10, new Date(2025, 0, 1));
      });

      expect(result.current.contextValue.state.startDate).toBeNull();
      expect(result.current.contextValue.state.endDate).toBeNull();
    });

    it('should NOT deselect when clicking startDate with non-consecutive dates', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: new Date(2025, 0, 15),
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDayClick(10, new Date(2025, 0, 1));
      });

      const expectedStartDate = new Date(2025, 0, 10);
      const expectedEndDate = DateHelper.addOneDay(expectedStartDate);

      expect(result.current.contextValue.state.startDate).toEqual(expectedStartDate);
      expect(result.current.contextValue.state.endDate).toEqual(expectedEndDate);
    });
  });

  describe('Validation and Done', () => {
    it('should be valid when both dates are set', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: new Date(2025, 0, 15),
        })
      );

      expect(result.current.contextValue.actions.isValid).toBe(true);
    });

    it('should be invalid when dates are null', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: null,
          initialEndDate: null,
        })
      );

      expect(result.current.contextValue.actions.isValid).toBe(false);
    });

    it('should call callbacks when handleDone is called with valid dates', () => {
      const onDateRangeSelect = vi.fn();
      const onClose = vi.fn();

      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 10),
          initialEndDate: new Date(2025, 0, 15),
          onDateRangeSelect,
          onClose,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDone();
      });

      expect(onDateRangeSelect).toHaveBeenCalledWith(new Date(2025, 0, 10), new Date(2025, 0, 15));
      expect(onClose).toHaveBeenCalled();
    });

    it('should NOT call callbacks when handleDone is called with invalid dates', () => {
      const onDateRangeSelect = vi.fn();
      const onClose = vi.fn();

      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: null,
          initialEndDate: null,
          onDateRangeSelect,
          onClose,
        })
      );

      act(() => {
        result.current.contextValue.actions.handleDone();
      });

      expect(onDateRangeSelect).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Month Names', () => {
    it('should return correct month names', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 15),
        })
      );

      expect(result.current.contextValue.state.leftMonthName).toBe('January 2025');
      expect(result.current.contextValue.state.rightMonthName).toBe('February 2025');
    });

    it('should update month names after navigation', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          initialStartDate: new Date(2025, 0, 15),
        })
      );

      act(() => {
        result.current.contextValue.actions.handleNextRight();
      });

      expect(result.current.contextValue.state.leftMonthName).toBe('February 2025');
      expect(result.current.contextValue.state.rightMonthName).toBe('March 2025');
    });
  });
});
