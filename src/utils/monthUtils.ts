import { skattetrekk, Tabell } from '../skattetabell/2023';
import { Month } from '../types/Month';
import { MonthState } from '../types/MonthState';

export const getNameOfMonth = (month: Month) => {
    switch (month) {
        case Month.Jan:
            return 'Januar';
        case Month.Feb:
            return 'Februar';
        case Month.Mar:
            return 'Mars';
        case Month.Apr:
            return 'April';
        case Month.May:
            return 'Mai';
        case Month.Jun:
            return 'Juni';
        case Month.Jul:
            return 'Juli';
        case Month.Aug:
            return 'August';
        case Month.Sep:
            return 'September';
        case Month.Oct:
            return 'Oktober';
        case Month.Nov:
            return 'November';
        case Month.Dec:
            return 'Desember';
    }
};

export const monthStateBuilder =
    (timepris: number, andel: number, tabell: Tabell) =>
    (hoursInMonth: number, month: Month): MonthState => {
        const grunnbeløp = timepris * hoursInMonth * andel;
        const feriepengeTrekk = grunnbeløp * 0.12 * -1;
        const brutto = grunnbeløp + feriepengeTrekk;
        const trekk = skattetrekk(brutto, tabell) * (month === Month.Nov ? -0.5 : -1);
        const netto = brutto + trekk;

        return {
            timer: hoursInMonth,
            grunnbeløp,
            feriepengeTrekk,
            brutto,
            netto,
            trekk,
        };
    };
