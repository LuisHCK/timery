<template>
	<div class="page">
		<h1>Pomodoro</h1>
		<div class="content">
			<div class="pomodoros-count">
				<img 
					v-for="index in pomodorosCount"
					:key="'pmd'+index"
					class="pomodoro-icon" 
					:src="require('@/assets/pomodoro.svg')">
			</div>
			<h2 class="timer" v-text="currentTimer" />
			<img 
				class="start-button"
				:src="require('@/assets/start-icon.svg')"
				@click="timerInterval? stopTimer():startTimer()">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pomodoros',

		data() {
			return {
				pomodorosCount: 12,
				pomodorosInterval: 2,
				pomodoroDuration: 2,
				shortBreak: 5,
				longBreak: 15,
				showNotification: true,
				notificationAllowed: false,
				currentTimer: '00:00',
				timerInterval: undefined,
				timerMode: 'pomodoro' //short-break; long-break;
			}
		},

		methods: {
			startTimer() {
				let duration = this.getDuration()
		    let timer = duration, minutes, seconds;
		    this.timerInterval = setInterval(function () {
		        minutes = parseInt(timer / 60, 10)
		        seconds = parseInt(timer % 60, 10);

		        minutes = minutes < 10 ? "0" + minutes : minutes;
		        seconds = seconds < 10 ? "0" + seconds : seconds;

		        this.currentTimer = `${minutes}:${seconds}`

		        if (--timer < 0) {
		          this.pomodorosCount++
		        	this.displayNotification()
		        	timer = this.	getDuration()
		        }
		    }.bind(this), 1000);
			},

			getDuration() {
				let duration
				switch(this.timerMode) {
					case 'pomodoro':
						duration = this.pomodoroDuration
						this.timerMode = 'short-break'
						break
					case 'short-break':
						duration = this.shortBreak
						this.timerMode = 'long-break'
						break
					case 'long-break':
						duration = this.longBreak
						this.timerMode = 'pomodoro'
						break
					default:
						duration = 25
						this.timerMode = 'short-break'
						break
				}
				return duration
			},

			stopTimer() {
				clearInterval(this.timerInterval)
				this.currentTimer = '00:00'
			},

			displayNotification() {
				let audio = new Audio(require('@/assets/ding.mp3'))
				audio.play()
				let notification = new Notification(this.getNotificationText(), {
					icon: require('@/assets/logo.png')
				})
			},

			getNotificationText() {
				let text
				switch(this.timerMode) {
					case 'pomodoro':
						text = "Let's back to work 👨‍💻"
						break
					case 'short-break':
						text =  `Enjoy your ${this.shortBreak} free minutes 😉`
						break
					case 'long-break':
						text = `Have a good time. See you later 🥳`
						break
				}
				return text
			}
		},

		mounted() {
			Notification.requestPermission().then(function(result) {
			  if (result === 'denied') {
			    console.log('Permission wasn\'t granted. Allow a retry.');
			    return;
			  }
			  if (result === 'default') {
			    console.log('The permission request was dismissed.');
			    return;
			  }
			  if (result === 'granted') {
			  	console.log('permission granted :D')
			  	this.notificationAllowed = true
			  	return
			  }
			}.bind(this));
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		.pomodoros-count {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			max-width: 100%;
			.pomodoro-icon {
				width: 48px;
				height: 48px;
				margin: 4px;
			}
		}
		.timer {
			font-weight: bold;
			color: #d9534f;
			font-size: 48pt;
		}
		.start-button {
			transition: 0.2s;
			&:hover {
				transform: scale(1.1)
			}
			&:active {
				transform: scale(0.9)
			}
		}
	}
</style>