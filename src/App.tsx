import Header from './components/header/Header';
import { MonthDisplay } from './components/month-display/MonthDisplay';
import { Select } from './components/select/Select';
import { getHoursInMonth } from './utils/dateUtils';
import { Month } from './types/Month';
import Input from './components/input/Input';
import { Tabell, tableNames } from './skattetabell/2023';
import { YearDisplay } from './components/year-display/YearDisplay';
import { monthStateBuilder } from './utils/monthUtils';
import { useURLState } from './hooks/useURLState';
import { useCallback } from 'react';

import './App.css';

type State = {
    timepris: number;
    tabell: Tabell;
    andel: number;
    timer: {
        [T in Month]: number;
    };
};

const initialState = (): State => ({
    timepris: 1450,
    tabell: Tabell.T7100,
    andel: 0.6,
    timer: {
        [Month.Jan]: getHoursInMonth(Month.Jan),
        [Month.Feb]: getHoursInMonth(Month.Feb),
        [Month.Mar]: getHoursInMonth(Month.Mar),
        [Month.Apr]: getHoursInMonth(Month.Apr),
        [Month.May]: getHoursInMonth(Month.May),
        [Month.Jun]: getHoursInMonth(Month.Jun),
        [Month.Jul]: getHoursInMonth(Month.Jul),
        [Month.Aug]: getHoursInMonth(Month.Aug),
        [Month.Sep]: getHoursInMonth(Month.Sep),
        [Month.Oct]: getHoursInMonth(Month.Oct),
        [Month.Nov]: getHoursInMonth(Month.Nov),
        [Month.Dec]: getHoursInMonth(Month.Dec),
    },
});

const App = () => {
    const [state, updateState] = useURLState<State>('state', initialState);
    const { timer, timepris, tabell, andel } = state;

    const getMonthState = monthStateBuilder(timepris, andel, tabell);

    const setTabell = useCallback(
        (tabell: Tabell) => {
            updateState((draft) => {
                draft.tabell = tabell;
            });
        },
        [updateState]
    );

    const setAndel = useCallback(
        (andel: number) => {
            updateState((draft) => {
                draft.andel = andel;
            });
        },
        [updateState]
    );

    const setTimepris = useCallback(
        (timepris: number) => {
            updateState((draft) => {
                draft.timepris = timepris;
            });
        },
        [updateState]
    );

    const handleHoursStateChange = useCallback(
        (month: Month, timer: number) => {
            updateState((draft) => {
                draft.timer[month] = timer;
            });
        },
        [updateState]
    );

    return (
        <>
            <div className="App">
                <Header title="Lønnskalkulator" />
                <div>
                    <Select
                        label="Skattetabell"
                        value={tabell}
                        options={tableNames.map((table) => ({ name: table, value: table }))}
                        onChange={(event) => setTabell(event.currentTarget.value as Tabell)}
                    />
                    <Select
                        label="Andel konsulent"
                        value={andel}
                        options={[
                            { value: 0.55, name: '55%' },
                            { value: 0.6, name: '60%' },
                        ]}
                        onChange={(event) => setAndel(parseFloat(event.currentTarget.value))}
                    />
                    <Input
                        inputId="timepris"
                        label="Timepris"
                        placeholder="Eks. 1450"
                        value={timepris}
                        onChange={(event) => setTimepris(parseInt(event.target.value, 10))}
                    />
                </div>
                <YearDisplay hoursState={timer} getMonthState={getMonthState} />
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    timer={timer[Month.Jan]}
                    month={Month.Jan}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Feb]}
                    month={Month.Feb}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Mar]}
                    month={Month.Mar}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Apr]}
                    month={Month.Apr}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.May]}
                    month={Month.May}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Jun]}
                    month={Month.Jun}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    timer={timer[Month.Jul]}
                    month={Month.Jul}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Aug]}
                    month={Month.Aug}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Sep]}
                    month={Month.Sep}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Oct]}
                    month={Month.Oct}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Nov]}
                    month={Month.Nov}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={timer[Month.Dec]}
                    month={Month.Dec}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
            </div>
        </>
    );
};

export default App;
