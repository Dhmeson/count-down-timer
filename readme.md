## Description

This is a countdown timer developed in TypeScript/JavaScript. It counts down the time remaining until a specified moment, provided as a timestamp, and continuously updates to display the remaining time in days, hours, minutes, and seconds. When the target time is reached, the timer stops, and a message indicating that the target time has been reached is displayed.

## Features

-   Real-time countdown timer
-   Continuous updates showing the remaining time in days, hours, minutes, and seconds
-   Automatic stop functionality when the target time is reached
-   Easily customizable and integratable into other projects

## Install

```console
$ npm i countdown-event
```

```js
import { CountDownTimer } from 'countdown-event'
const clock = new CountDownTimer()
//Add the time that will decrease; in this case, it will be 10 seconds.
const timestamp = clock.register({ type: 'SECONDS', value: 10 })
//Now execute the timer function with the recorded time.
clock.timer(timestamp, (values) => callback, callbackStopTimer)
```

# Exemple callback

```js
import { CountDownTimer } from 'countdown-event'
const clock = new CountDownTimer()
const timestamp = clock.register({ type: 'SECONDS', value: 10 })

function callbackGetValues(v: Timers) {
	console.log(v)
    //console=>{ days: 0, hours: 0, minutes: 0, seconds: 9}
    //console=>{ days: 0, hours: 0, minutes: 0, seconds: 8 }
    //It will continue to return the values until the counter reaches zero

}
//When it reaches the end, it will execute this function.
function callbackStopTimer() { console.log('your timer finished') }

clock.timer(timestamp, (values) => callbackGetValues(values), callbackStopTimer)
```

## Exemple using react

```js
import { CountDownTimer, Timers } from 'countdown-event'
import { useEffect, useState } from 'react'

export default function Home() {
	const clock = new CountDownTimer()
	const [timer, setTimer] = useState(
		clock.register({ type: 'SECONDS', value: 10 })
	)
	const [state, setState] = useState<Timers>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	})
	function callbackGetValues(v: Timers) {
		console.log(v)
		setState(v)
	}
	function callbackStopTimer() {
		console.log('your timer finished')
	}

	useEffect(() => {
		clock.timer(
			timer,
			(values) => callbackGetValues(values),
			callbackStopTimer
		)
	}, [])
	return (
		<main >
			<div>
				<span>{state.hours}:</span>
				<span>{state.minutes}:</span>
				<span>{state.seconds}</span>
			</div>
		</main>
	)
}
```
