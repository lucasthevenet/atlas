"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange, SelectRangeEventHandler } from "react-day-picker";

import { cn } from "../../utils";
import { Calendar, type CalendarProps } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

function getDateRangeString(date?: DateRange): string | null {
  if (date?.from && date.to) {
    return `${format(date.from, "LLL dd, y")} - ${format(
      date.to,
      "LLL dd, y",
    )}`;
  }
  if (date?.from) {
    return format(date.from, "LLL dd, y");
  }

  return null;
}

type DateRangePickerProps = Omit<
  CalendarProps,
  | "mode"
  | "selected"
  | "onSelect"
  | "initialFocus"
  | "numberOfMonths"
  | "defaultMonth"
> & {
  value?: DateRange;
  onChange?: SelectRangeEventHandler;
};

const DateRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(function DateRangePicker({ value, onChange, className, ...props }, ref) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger
          id="date"
          className={cn(
            "inline-flex h-10 w-[300px] items-center justify-start rounded-md border border-gray-200 px-4 py-2 text-left text-sm font-normal ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-800",
            !value && "text-gray-500 dark:text-gray-500",
          )}
          ref={ref}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {getDateRangeString(value) ?? <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

export { DateRangePicker };
