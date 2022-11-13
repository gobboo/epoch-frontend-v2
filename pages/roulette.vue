<template>
	<div class="w-full xl:px-96 mt-36">
		<RoulleteRoller class="mx-auto my-4 mb-24" />
		<RouletteDeposit />
	</div>
</template>

<script lang="ts" setup>
import RouletteDeposit from '~/components/Games/Roulette/RouletteDeposit.vue';
import RoulleteRoller from '~/components/Games/Roulette/RouletteRoller.vue';
import { useRoulette } from '~/stores/roulette';

const roulette = useRoulette();
roulette.createListeners();
</script>