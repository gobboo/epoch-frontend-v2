<template>
	<div class="w-full max-w-2xl overflow-hidden relative">
		<div class="absolute w-1 h-full bg-black z-10 left-1/2 -translate-x-1/2"></div>
		<div ref="tileContainer" class="flex gap-1">
			<div v-for="number in (15 * 31)" :key="number" :class="`tile ${pickColor(numberOrder[(number - 1) % 15])}`">
				{{ numberOrder[(number - 1) % 15] }}
			</div>
		</div>

		<button @click="rollRoulette(6)">
			Roll
		</button>
	</div>
</template>

<script setup lang="ts">

const tileContainer = ref(null);

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

const numberOrder = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4]

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function rollRoulette(roll: number) {
	const tileContainerEl = tileContainer.value as HTMLElement;

	const rollIndex = numberOrder.indexOf(roll);

	const rollPosition = rollIndex;
	tileContainerEl.style.transform = `translateX(-${rollPositionPx}px)`;

	tileContainerEl.style.transitionTimingFunction = 'cubic-bezier(0.09, 0.73, 0.22, 1)';
	tileContainerEl.style.transitionDuration = '5000ms';
	tileContainerEl.style.transitionDelay = '0ms';

	await sleep(5000);
	console.log(rollPositionPx)
	tileContainerEl.style.transform = `translateX(-${rollPositionPx - 6150}px)`;
}

// 6150 Difference

// translate3d(-492.5px, 0px, 0px)

</script>

<style scoped>
.tile {
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
	border-radius: 2px;
	margin: 0px 1px;
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
	position: relative;
	border: none;
}
</style>