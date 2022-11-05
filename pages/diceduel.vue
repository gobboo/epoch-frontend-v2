<template>
	<div class="px-0 sm:px-12 lg:px-48 xl:px-96 relative mt-12">
		<div v-if="auth.loggedIn" class="flex justify-between items-center">
			<h3 class="text-2xl text-white font-bold">
				<Icon name="fa6-solid:gamepad" class="mr-1" />
				My Games
			</h3>

			<button class="btn btn-primary btn-sm normal-case mt-2" @click="createDice.showModal()">
				Create
			</button>
		</div>

		<div class="my-games flex gap-8">
			<GameInfo v-for="(game, index) in myGames" :key="index" :game="game" @view-game="showGame" />
		</div>

		<h3 class="text-2xl text-white font-bold mt-8">
			<Icon name="fa6-solid:gamepad" class="mr-1" />
			Games
		</h3>

		<div class="my-games flex gap-8">
			<GameInfo v-for="(game, index) in activeGames" :key="index" :game="game" @view-game="showGame" />
		</div>

		<CreateGame ref="createDice" />
		<GameView v-if="curGame" ref="gameView" :game="curGame" />
	</div>
</template>

<script lang="ts" setup>
import GameInfo from '~/components/Games/Dice/GameInfo.vue';
import CreateGame from '~~/components/Games/Dice/CreateGame.vue';

import { Icon } from '@iconify/vue';
import { Ref } from 'vue';
import { useAuth } from '~/stores/auth';
import { useDice } from '~/stores/dice';
import { DiceInfo } from '~/types/interfaces';
import GameView from '~~/components/Games/Dice/GameView.vue';

const auth = useAuth();
const dice = useDice();

const createDice = ref(null);
const gameView = ref(null);

const curGame = ref(null);

// Create Listeners
dice.createListeners();

function showGame(game) {
	curGame.value = game;
	gameView.value.showModal();
}

const myGames: Ref<DiceInfo[]> = computed(() => {
	return dice.games.filter((game) => game.creator._id == auth.user._id && (game.status === 'open' || game.status === 'started'));
});

const activeGames: Ref<DiceInfo[]> = computed(() => {
	return dice.games.filter((game) => game.creator._id != auth.user._id && (game.status === 'open' || game.status === 'started'));
});

onMounted(async () => {
	await dice.fetchGames();
});

</script>
