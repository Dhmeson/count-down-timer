interface GetLocalDate {
	day: number
	month: number
	year: number
	hour: number
	minutes: number
	seconds: number
}
export interface Timers {
	days: number
	hours: number
	minutes: number
	seconds: number
}
type TimerType = 'MIN' | 'SECONDS' | 'HOUR' | 'DAY'

interface SetLocalDate {
	value: number
	type: TimerType
}
type FormatOrigin = 'BR' | 'USA'
//criar um registro onde pegara data local e o periodo que deve ser gerado uma nova data o retorno devera ser em timestamp
export class ClockTime {
	register(period: SetLocalDate) {
		const timestampEnd = this.setValues(period)
		return timestampEnd
	}

	timer(
		timestampTarget: number,
		callback: (values: Timers) => void,
		stopTimerCallback: () => void
	) {
		const intervalId = setInterval(() => {
			const currentTime = new Date().getTime()
			const { days, hours, minutes, seconds } = this.differenceTime(
				timestampTarget,
				currentTime
			)
			callback({ days, hours, minutes, seconds })

			// Verifica se o tempo alvo foi alcançado
			if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
				stopTimerCallback()
				clearInterval(intervalId)
			}
		}, 900)
	}

	private setValues(
		register: SetLocalDate = {
			type: 'MIN',
			value: 0
		}
	) {
		let date = new Date()
		if (register.type == 'DAY') {
			date.setDate(date.getDate() + register.value)
		}
		if (register.type == 'HOUR') {
			date.setHours(date.getHours() + register.value)
		}
		if (register.type == 'MIN') {
			date.setMinutes(date.getMinutes() + register.value)
		}

		if (register.type == 'SECONDS') {
			date.setSeconds(date.getSeconds() + register.value)
		}
		return date.getTime()
	}
	private getLocalDate(timestamp?: number): GetLocalDate {
		const localDate = timestamp ? new Date(timestamp) : new Date()

		const day = localDate.getDate()
		const month = localDate.getMonth() + 1
		const year = localDate.getFullYear()

		const hour = localDate.getHours()
		const minutes = localDate.getMinutes()
		const seconds = localDate.getSeconds()
		return {
			day,
			hour,
			minutes,
			month,
			year,
			seconds
		}
	}
	private formatNumber(value: number) {
		return value.toString().padStart(2, '0')
	}
	showDate(
		timestamp: number,
		label: string = 'Date',
		format: FormatOrigin = 'BR'
	): string {
		const { day, hour, minutes, month, year } = this.getLocalDate(timestamp)
		switch (format) {
			case 'BR':
				return `${label}: ${this.formatNumber(day)}/${this.formatNumber(month)}/${year} ${hour}:${this.formatNumber(minutes)}`

			case 'USA':
				return `${label}: ${this.formatNumber(month)}/${this.formatNumber(day)}/${year} ${hour}:${this.formatNumber(minutes)}`
		}
	}
	private differenceTime(timestampStart: number, timestampEnd: number) {
		const diferencaEmMilissegundos = Math.abs(timestampEnd - timestampStart)

		// Converte a diferença em minutos
		let differenceInMinutes = Math.floor(
			diferencaEmMilissegundos / (1000 * 60)
		)
		const remainingSeconds = Math.floor(
			(diferencaEmMilissegundos % (1000 * 60)) / 1000
		)
		let hours = Math.floor(differenceInMinutes / 60)
		differenceInMinutes -= 60 * hours
		let days = Math.floor(hours / 24)
		hours -= 24 * days

		return {
			days,
			hours,
			minutes: differenceInMinutes,
			seconds: remainingSeconds
		}
	}
}
