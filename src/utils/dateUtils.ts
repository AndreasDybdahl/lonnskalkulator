import { Month } from '../types/Month';
import DateHolidays from 'date-holidays';
import { DateTime } from 'luxon';

const holidays = new DateHolidays('no');
const currentYear = 2023;
const helligdager = holidays
    .getHolidays(currentYear)
    .filter((holiday) => holiday.type !== 'observance')
    .map((helligdag) => DateTime.fromJSDate(helligdag.start));

export const getHoursInMonth = (month: Month) => {
    const startOfMonth = DateTime.local(currentYear, month, 1);
    let workingDays = 0;

    for (let day = startOfMonth; day.month === month; day = day.plus({ days: 1 })) {
        if (day.weekday >= 6 || isHoliday(day)) continue;

        workingDays++;
    }

    return workingDays * 7.5;
};

const isHoliday = (date: DateTime) => {
    const { month, day } = date;

    for (const helligdag of helligdager) {
        const { month: helligdagMonth, day: hellidagDay } = helligdag;

        if (month < helligdagMonth) {
            return false;
        }

        if (month === helligdagMonth && day === hellidagDay) {
            return true;
        }
    }

    return false;
};
