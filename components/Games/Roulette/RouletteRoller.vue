<template>
	<div class="tile-container overflow-hidden relative">
		<div v-show="roulette.currentGame.timeUntilStart"
			class="absolute z-20 opacity-70 bg-slate-900 w-full h-full text-center font-bold text-white text-2xl py-6">
			{{ formattedCountdown }}
		</div>
		<div class="tile-shadow absolute w-full h-full z-10"></div>
		<div class="absolute w-1 h-full bg-black z-10 left-1/2 -translate-x-1/2"></div>
		<div ref="tileContainer" class="flex">
			<div v-for="number in (15 * 31)" :key="number"
				:class="`roulette-tile ${pickColor(numberOrder[(number - 1) % 15])}`">
				{{ numberOrder[(number - 1) % 15] }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoulette } from '~/stores/roulette';

const roulette = useRoulette();
const countdown = ref(0);

const tileContainer = ref(null);
const numberOrder = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4]

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// 1200px Per 15 tiles
async function rollRoulette(roll: number) {
	const tileContainerEl = tileContainer.value as HTMLElement;

	const baseOffset = 1230 * 5; // -6150px;
	const zeroOffset = baseOffset - (6 * 82); // -6000px - 320px = -6320px

	const rollIndex = numberOrder.indexOf(roll) + 1;

	// Random number between 10 and 75
	const randomTileOffset = Math.floor(Math.random() * 65) + 10;

	const rollOffset = (zeroOffset + (rollIndex * 82)) - randomTileOffset;

	tileContainerEl.style.transform = `translate3d(-${rollOffset}px, 0px, 0px)`;

	tileContainerEl.style.transitionTimingFunction = 'cubic-bezier(0.09, 0.73, 0.22, 1)';
	tileContainerEl.style.transitionDuration = '5000ms';
	tileContainerEl.style.transitionDelay = '0ms';

	await sleep(5000);

	// Set the transition back to 0ms and then set the transform
	const newOffset = rollOffset % 1230;

	tileContainerEl.style.transitionDuration = '0ms';
	tileContainerEl.style.transform = `translate3d(-${newOffset}px, 0px, 0px)`;
}

const isEven = (num: number) => num % 2 === 0;
const pickColor = (num: number) => {
	if (num === 0) {
		return 'bg-green-500';
	} else if (isEven(num)) {
		return 'bg-red-500';
	} else {
		return 'bg-slate-700';
	}
}

const formattedCountdown = computed(() => {
	// seconds.miliseconds
	const seconds = Math.floor(countdown.value / 1000);

	// Round to the nearest 100th
	const miliseconds = Math.round((countdown.value % 1000) / 10);

	// Pad the miliseconds with a 0 if it's less than 10
	const milisecondsString = miliseconds < 10 ? `0${miliseconds}` : miliseconds;

	return `${seconds}.${milisecondsString}`;
})

// 6150 Difference
// translate3d(-492.5px, 0px, 0px)
const interval = ref(null);
watch(() => roulette.currentGame, (newRoulette) => {
	if (newRoulette.roll) {
		rollRoulette(newRoulette.roll);
	}

	clearInterval(interval.value);


	if (roulette.currentGame.timeUntilStart) {
		const now = Date.now();
		countdown.value = roulette.currentGame.timeUntilStart - now;
		interval.value = setInterval(() => {
			countdown.value -= 10;
		}, 10);
	}
});

onBeforeUnmount(() => {
	clearInterval(interval.value);
});

</script>

<style scoped>
.roulette-tile {
	width: 80px;
	height: 80px;
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	align-items: center;
	flex: 0 0 auto;
	color: rgb(255, 255, 255);
	font-size: 20px;
	margin: 0px 1px;
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
	position: relative;
	border: none;
	border-radius: 2px;
}

.tile-shadow {
	background: rgb(0, 0, 0);
	background: linear-gradient(90deg, rgba(42, 48, 60, 1) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 75%, rgba(42, 48, 60, 1) 100%);
}

.tile-container {
	width: 984px;
}
</style>