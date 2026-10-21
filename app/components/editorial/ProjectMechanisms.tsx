'use client';

import { useId, useState } from 'react';

const temperatureStates = [
  { label: 'Below band', condition: 'current < target − 3', heating: 'On', cooling: 'Off', copy: 'The furnace is active; cooling is off.' },
  { label: 'Inside band', condition: 'target − 3 ≤ current ≤ target + 3', heating: 'Off', cooling: 'Off', copy: 'Both temperature actuators are off inside the target band.' },
  { label: 'Above band', condition: 'current > target + 3', heating: 'Off', cooling: 'On', copy: 'The air conditioner is active; heating is off.' },
];
export function TemperatureControl() {
  const [active, setActive] = useState(1);
  const id = useId();
  const state = temperatureStates[active]!;
  return <figure className="project-technical temperature-control">
    <p className="technical-heading">Temperature control rule</p>
    <div className="temperature-options" role="group" aria-label="Temperature relative to target">
      {temperatureStates.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls={`${id}-state`} onClick={() => setActive(index)}>{item.label}</button>)}
    </div>
    <div id={`${id}-state`} aria-live="polite" aria-atomic="true">
      <p className="temperature-condition">{active === 1 ? <><span>target − 3</span>{' ≤ current ≤ '}<span>target + 3</span></> : state.condition}</p>
      <dl className="actuator-states"><div><dt>Furnace</dt><dd>{state.heating}</dd></div><div><dt>Air conditioner</dt><dd>{state.cooling}</dd></div></dl>
      <p className="temperature-description">{state.copy}</p>
    </div>
    <figcaption>Rule illustration from the temperature controller. Humidity and soil moisture use their own sampling intervals and a single actuator each.</figcaption>
  </figure>;
}
