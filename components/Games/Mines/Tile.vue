<template>
	<div class="tiles-container">
		<button v-for="(tile, index) in tiles" :key="index" class="tile drop-shadow-2xl text-4xl" @click="revealTile(index)">
			{{ tile.revealed && !tile.isBomb ? '💰' : tile.isBomb ? '💣' : '' }}
		</button>
	</div>

</template>

<script lang="ts" setup>
import { MineInfo } from '~~/types/interfaces';
const { $socket } = useNuxtApp()

const props = defineProps({
	tileCount: {
		type: Number,
		required: true
	},
	currentGame: {
		type: Object,
		default: null
	}
})

const emit = defineEmits(['game-ended', 'game-update'])

const tiles = ref([...Array(props.tileCount).keys()].map(() => { return { revealed: false, isBomb: false } }));

async function revealTile(index) {
	// If its already revealed, don't do anything
	if (tiles.value[index].revealed || !props.currentGame) return;
	
	$socket.emit('mine:reveal', index, (data: MineInfo) => {
		if (data.status === 'in_progress') {
			tiles.value[index].revealed = true

			emit('game-update', data)
		} else if (data.status === 'lost') {
			data.info.minePositions.forEach((mine) => {
				tiles.value[mine].revealed = true
				tiles.value[mine].isBomb = true

				// clearTiles()
			})

			emit('game-ended', data)
		}
	})
}

function clearTiles() {
	tiles.value = [...Array(props.tileCount).keys()].map(() => { return { revealed: false, isBomb: false } });
}

function populateTiles (tilesTurned) {
	// Use props.currentGame.tilesTurned to determine which tiles to reveal
	tilesTurned.forEach((tile) => {
		tiles.value[tile].revealed = true
	})
}

defineExpose({
	clearTiles,
	populateTiles
})
</script>

<style lang="scss">
@tailwind components;

@layer components {
  .tile {
    @apply btn btn-primary btn-primary;
		width: 72px;
		height: 72px;
  }
}

.tiles-container  {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;
	max-width: 240px;
}

</style>