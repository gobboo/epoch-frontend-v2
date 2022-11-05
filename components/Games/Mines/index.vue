<template>
	<div class="w-full flex gap-24 justify-center mt-40">
		<DepositInput class="w-72" :current-game="currentGame" @create-game="createGame" @cashout-game="clearCurrentGame(); tiles.clearTiles()" />
		<Tile ref="tiles" :tile-count="25" :current-game="currentGame" @game-ended="clearCurrentGame" @game-update="setCurrentGame" />
	</div>
</template>

<script lang="ts" setup>
import Tile from '~~/components/Games/Mines/Tile.vue';
import DepositInput from './DepositInput.vue';

import { MineInfo } from '~~/types/interfaces';

const { $socket } = useNuxtApp();
const currentGame = ref<MineInfo>(null);
const tiles = ref(null);

function createGame (game: MineInfo) {
	tiles.value.clearTiles();
	tiles.value.populateTiles(game.info.tilesTurned);
	setCurrentGame(game);
}

function setCurrentGame(game: MineInfo) {
	currentGame.value = game;
}

function clearCurrentGame() {
	currentGame.value = null;
}

onMounted(() => {
	// Check if the user has a game in progress
	$socket.emit('mine:fetch', null, (response: { success: boolean, game: MineInfo | null }) => {
		if (response.game !== null) {
			currentGame.value = response.game;
			tiles.value.populateTiles(response.game.info.tilesTurned);
		}
	})
})

</script>