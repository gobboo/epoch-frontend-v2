<template>
	<div class="card bg-neutral">
		<div class="card-body py-3 px-4">
			<div class="flex items-center font-medium">
				<div class="flex items-center w-fit">
					<Icon name="game-icons:two-coins" class="text-yellow-400 mr-1" />
					<p class="text-lg text-white mr-1">
						{{ (fillDecimal(game.buyIn * game.players.length)).toLocaleString().split('.')[0] }}
						<span class="text-xs text-gray-400 -ml-1">
							.{{ (fillDecimal(game.buyIn * game.players.length)).toLocaleString().split('.')[1] }}
						</span>
					</p>
					/
					<Icon name="game-icons:two-coins" class="text-yellow-400 mx-1" />
					<p class="text-lg text-white">
						{{ (fillDecimal(game.buyIn * game.maxPlayers)).toString().split('.')[0] }}
						<span class="text-xs text-gray-400 -ml-1">
							.{{ (fillDecimal(game.buyIn * game.maxPlayers)).toString().split('.')[1] }}
						</span>
					</p>
				</div>

				<div class="badge badge-primary font-medium py-3 float-right ml-12">
					<Icon name="ph:users-three-fill" class="mr-1 text-lg" />
					{{ game.players.length }}/{{ game.maxPlayers }}
				</div>
			</div>

			<p class="status text-white font-bold text-sm text-center mt-3">
				{{ statusMap[game.status] }}
			</p>

			<div class="flex items-center">
				<button
					class="btn btn-primary btn-sm normal-case mx-auto mt-4"
					@click="emit('viewGame', game)">
					<Icon name="fa6-solid:eye" class="mr-1" />
					View Game
				</button>
			</div>

		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAuth } from '~/stores/auth';
import { useDice } from '~/stores/dice';
import { DiceInfo } from '~/types/interfaces';

const auth = useAuth();
const props = defineProps<{
	game: DiceInfo
}>();

const emit = defineEmits(['viewGame']);

const fillDecimal = (num: number) => {
	const numStr = num.toString();
	if (numStr.split('.')[1]) {
		return numStr;
	}
	return `${numStr}.00`;
};

const inGame = computed(() => {
	return props.game.players.some(player => player.user._id === auth.user._id);
});

const statusMap = {
	open: 'Waiting for players...',
	started: 'Waiting for EOS Block...',
	playing: 'In Progress...'
};
</script>