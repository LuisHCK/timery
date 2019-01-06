<template>
	<div class="tabs-container">
		<div class="tab-buttons">
			<button class="button-title" @click="currentTab=1">Tasks</button>
			<button class="button-title" @click="currentTab=2">Pomodoro</button>
		</div>
		<div class="tab" v-show="currentTab == 1">
			<div class="content">
				<slot name="tasks" />
			</div>
		</div>

		<div class="tab" v-show="currentTab == 2">
			<div class="content">
				<slot name="pomodoros" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tabs',

		data() {
			return {
				currentTab: 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs-container {
		.tab-buttons {
			padding: 8px;
			display: flex;
			justify-content: center;
			text-align: center;
			.button-title {
				width: 90px;
			}
		}
	}
</style>