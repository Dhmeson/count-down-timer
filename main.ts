import { ClockTime, Timers } from './ClockTime'

const clock = new ClockTime()

const timestamp = clock.register({ type: 'SECONDS', value: 12 })

function callbackGetValues(v: Timers) {
	console.log(v)
}
function callbackStopTimer() {
	console.log('Stop timer')
}
clock.timer(timestamp, (values) => callbackGetValues(values), callbackStopTimer)
