"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type SelectSingleEventHandler } from "react-day-picker";

import { cn } from "../../utils";
import { Calendar, type CalendarProps } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

type DatePickerProps = Omit<
  CalendarProps,
  "mode" | "selected" | "onSelect" | "initialFocus"
> & {
  value?: Date;
  onChange?: SelectSingleEventHandler;
};

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker({ value, onChange, className, ...props }, ref) {
    return (
      <Popover>
        <PopoverTrigger
          ref={ref}
          className={cn(
            "inline-flex h-10 w-[280px] items-center justify-start text-gray-900 dark:text-gray-200 rounded-md border border-gray-200 px-4 py-2 text-left text-sm font-normal ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-800",
            !value && "text-gray-500 dark:text-gray-500",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

export { DatePicker };
