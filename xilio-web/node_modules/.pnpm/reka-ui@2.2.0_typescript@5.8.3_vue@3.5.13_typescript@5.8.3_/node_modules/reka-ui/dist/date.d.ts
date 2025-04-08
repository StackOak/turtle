import { CalendarDateTime } from '@internationalized/date';
import { DateValue } from '@internationalized/date';
import { ZonedDateTime } from '@internationalized/date';

export declare function areAllDaysBetweenValid(start: DateValue, end: DateValue, isUnavailable: Matcher | undefined, isDisabled: Matcher | undefined): boolean;

export declare function createDateRange({ start, end }: DateRange): DateValue[];

export declare function createDecade(props: SetDecadeProps): DateValue[];

export declare function createMonth(props: CreateMonthProps): Grid<DateValue>;

export declare type CreateMonthProps = {
    /**
     * The date object representing the month's date (usually the first day of the month).
     */
    dateObj: DateValue;
    /**
     * The day of the week to start the calendar on (0 for Sunday, 1 for Monday, etc.).
     */
    weekStartsOn: number;
    /**
     * Whether to always render 6 weeks in the calendar, even if the month doesn't
     * span 6 weeks.
     */
    fixedWeeks: boolean;
    /**
     * The locale to use when creating the calendar month.
     */
    locale: string;
};

export declare function createMonths(props: SetMonthProps): Grid<DateValue>[];

export declare type CreateSelectProps = {
    /**
     * The date object representing the date (usually the first day of the month/year).
     */
    dateObj: DateValue;
};

export declare function createYear(props: SetYearProps): DateValue[];

export declare function createYearRange({ start, end }: DateRange): DateValue[];

declare type DateRange = {
    start: DateValue | undefined;
    end: DateValue | undefined;
};

export { DateValue }

export declare function endOfDecade(dateObj: DateValue): DateValue;

/**
 * Retrieves an array of date values representing the days between
 * the provided start and end dates.
 */
export declare function getDaysBetween(start: DateValue, end: DateValue): DateValue[];

/**
 * Given a date, return the number of days in the month.
 */
export declare function getDaysInMonth(date: Date | DateValue): number;

export declare function getLastFirstDayOfWeek<T extends DateValue = DateValue>(date: T, firstDayOfWeek: number, locale: string): T;

export declare function getNextLastDayOfWeek<T extends DateValue = DateValue>(date: T, firstDayOfWeek: number, locale: string): T;

export declare type Grid<T> = {
    /**
     * A `DateValue` used to represent the month. Since days
     * from the previous and next months may be included in the
     * calendar grid, we need a source of truth for the value
     * the grid is representing.
     */
    value: DateValue;
    /**
     * An array of arrays representing the weeks in the calendar.
     * Each sub-array represents a week, and contains the dates for each
     * day in that week. This structure is useful for rendering the calendar
     * grid using a table, where each row represents a week and each cell
     * represents a day.
     */
    rows: T[][];
    /**
     * An array of all the dates in the current month, including dates from
     * the previous and next months that are used to fill out the calendar grid.
     * This array is useful for rendering the calendar grid in a customizable way,
     * as it provides all the dates that should be displayed in the grid in a flat
     * array.
     */
    cells: T[];
};

export declare function hasTime(dateValue: DateValue): boolean;

/**
 * Determine if a date is after the reference date.
 * @param dateToCompare - is this date after the `referenceDate`
 * @param referenceDate - is the `dateToCompare` after this date
 *
 * @see {@link isAfterOrSame} for inclusive
 */
export declare function isAfter(dateToCompare: DateValue, referenceDate: DateValue): boolean;

/**
 * Determine if a date is after or the same as the reference date.
 *
 * @param dateToCompare - is this date after or the same as the `referenceDate`
 * @param referenceDate - is the `dateToCompare` after or the same as this date
 *
 * @see {@link isAfter} for non-inclusive
 */
export declare function isAfterOrSame(dateToCompare: DateValue, referenceDate: DateValue): boolean;

/**
 * Determine if a date is before the reference date.
 * @param dateToCompare - is this date before the `referenceDate`
 * @param referenceDate - is the `dateToCompare` before this date
 *
 * @see {@link isBeforeOrSame} for inclusive
 */
export declare function isBefore(dateToCompare: DateValue, referenceDate: DateValue): boolean;

/**
 * Determine if a date is before or the same as the reference date.
 *
 * @param dateToCompare - the date to compare
 * @param referenceDate - the reference date to make the comparison against
 *
 * @see {@link isBefore} for non-inclusive
 */
export declare function isBeforeOrSame(dateToCompare: DateValue, referenceDate: DateValue): boolean;

/**
 * Determine if a date is between a start and end reference date.
 *
 * @param date - is this date between the `start` and `end` dates
 * @param start - the start reference date to make the comparison against
 * @param end - the end reference date to make the comparison against
 *
 * @see {@link isBetweenInclusive} for inclusive
 */
export declare function isBetween(date: DateValue, start: DateValue, end: DateValue): boolean;

/**
 * Determine if a date is inclusively between a start and end reference date.
 *
 * @param date - is this date inclusively between the `start` and `end` dates
 * @param start - the start reference date to make the comparison against
 * @param end - the end reference date to make the comparison against
 *
 * @see {@link isBetween} for non-inclusive
 */
export declare function isBetweenInclusive(date: DateValue, start: DateValue, end: DateValue): boolean;

export declare function isCalendarDateTime(dateValue: DateValue): dateValue is CalendarDateTime;

export declare function isZonedDateTime(dateValue: DateValue): dateValue is ZonedDateTime;

export declare type Matcher = (date: DateValue) => boolean;

/**
 * Given a date string and a reference `DateValue` object, parse the
 * string to the same type as the reference object.
 *
 * Useful for parsing strings from data attributes, which are always
 * strings, to the same type being used by the date component.
 */
export declare function parseStringToDateValue(dateStr: string, referenceVal: DateValue): DateValue;

declare type SetDecadeProps = CreateSelectProps & {
    startIndex?: number;
    endIndex: number;
};

declare type SetMonthProps = CreateMonthProps & {
    numberOfMonths: number | undefined;
    currentMonths?: Grid<DateValue>[];
};

declare type SetYearProps = CreateSelectProps & {
    numberOfMonths?: number;
    pagedNavigation?: boolean;
};

export declare function startOfDecade(dateObj: DateValue): DateValue;

/**
 * Given a `DateValue` object, convert it to a native `Date` object.
 * If a timezone is provided, the date will be converted to that timezone.
 * If no timezone is provided, the date will be converted to the local timezone.
 */
export declare function toDate(dateValue: DateValue, tz?: string): Date;

export declare type WeekDayFormat = 'narrow' | 'short' | 'long';

export { }
