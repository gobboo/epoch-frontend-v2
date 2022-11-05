<template>
	<div>
		<input v-model="isShown" type="checkbox" id="dice-view" class="modal-toggle" />
		<label for="dice-view" class="modal cursor-pointer">
			<label class="modal-box bg-transparent rounded-none shadow-none relative max-w-6xl" for="">
				<div class="grid grid-cols-12 shadow-md">
					<div class="col-span-8 p-6 bg-base-100 rounded-l-md">
						<h3 class="text-lg font-bold text-white mb-8">Dice Duel</h3>
						<div class="game-info flex justify-between">
							<div class="flex items-center">
								Buy In
								<div class="badge ml-1 rounded-sm py-3 text-white">
									<Icon name="fa6-solid:coins" class="mr-1 text-yellow-400" />
									{{ game.buyIn.toString().split('.')[0] }}
									<span class="text-xs text-gray-400 -ml-1">
										.{{ game.buyIn.toString().split('.')[1] }}
									</span>
								</div>
							</div>

							<div class="flex items-center">
								Winnings
								<div class="badge ml-1 rounded-sm py-3 text-white">
									<Icon name="fa6-solid:coins" class="mr-1 text-yellow-400" />

									{{ (game.buyIn * game.maxPlayers).toString().split('.')[0] }}
									<span class="text-xs text-gray-400 -ml-1">
										.{{ (game.buyIn * game.maxPlayers).toString().split('.')[1] }}
									</span>
								</div>
							</div>

							<div class="flex items-center">
								Players
								<div class="badge ml-1 rounded-sm py-3 text-white">
									<Icon name="fa6-solid:users" class="mr-1" />
									{{ game.players.length }}/{{ game.maxPlayers }}
								</div>
							</div>
						</div>

						<div class="flex justify-between items-center my-24 relative gap-2 h-36">
							<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-xl text-white z-10">
								{{ statusMap[game.status] }}
							</div>
							<div class="roll-number text-4xl font-bold text-white text-opacity-20">
								<div class="reel">
									<span v-for="index in 80" :key="index">
										{{ (index - 1) % 10 }}
									</span>
								</div>
								<div></div>
							</div>
							<div class="roll-number text-4xl font-bold text-white text-opacity-20">
								<div class="reel">
									<span v-for="index in 80" :key="index">
										{{ (index - 1) % 10 }}
									</span>
								</div>
								<div></div>
							</div>
							<div class="roll-number text-4xl font-bold text-white text-opacity-20">
								<div class="reel">
									<span v-for="index in 80" :key="index">
										{{ (index - 1) % 10 }}
									</span>
								</div>
								<div></div>
							</div>
							<div class="roll-number text-4xl font-bold text-white text-opacity-20">
								<div class="reel">
									<span v-for="index in 80" :key="index">
										{{ (index - 1) % 10 }}
									</span>
								</div>
								<div></div>
							</div>
						</div>

						<div class="divider"></div>

						<p class="text-white text-sm font-medium">
							Server Seed Hash
						</p>
						<p class="text-xs">
							{{ game.serverSeedHash }}
						</p>
					</div>
					<div class="col-span-4 bg-neutral p-6 rounded-r-md">
						<div class="flex justify-between">
							<p>
								Player
							</p>
							<p>
								Roll
							</p>
						</div>

						<div class="divider my-2"></div>

						<div class="flex flex-col gap-4">
							<div v-for="(player, index) in game.players" :key="index"
								:class="`w-full px-4 py-2 ${currentSpin === index ? 'bg-primary' : 'bg-base-100'} rounded-sm shadow-lg`">
								<div class="flex justify-between items-center">
									<div class="text-white">
										{{ player.user.username }}
										<p class="text-xs text-gray-400">
											Client Seed: {{ player.user.clientSeed.substring(0, 24) }}...
										</p>
									</div>
									<div class="px-4 py-2 bg-neutral">
										{{ player.roll === 0 ? '-' : player.roll }}
									</div>
								</div>
							</div>

							<button v-if="game.status === 'open'" @click="dice.joinGame(game._id)" class="btn btn-primary btn-block">
								Join Game
							</button>
						</div>
					</div>
				</div>
			</label>
		</label>
	</div>
</template>

<script lang="ts" setup>
import { DiceInfo } from '~/types/interfaces';
import { useDice } from '~~/stores/dice';

const dice = useDice();

const props = defineProps<{
	game: DiceInfo;
}>();

const isShown = ref(false);
const currentSpin = ref(null);

const statusMap = {
	open: 'Waiting for players...',
	started: 'Waiting for EOS Block...'
};

function showModal() {
	isShown.value = true;
}

function executeSpins() {
	const players = props.game.players;
	const tempRolls = players.map((player) => player.roll);

	// Hide Players rolls
	players.forEach((player) => {
		player.roll = 0;
	});

	(async () => {
		for (let i = 0; i < players.length; i++) {
			resetReels();

			await new Promise((resolve) => setTimeout(resolve, 300));

			currentSpin.value = i;
			const player = players[i];

			// Spin the reel
			const roll = tempRolls[i];
			spinReel(roll.toString().padStart(4, '0'));

			// Wait 1 second
			await new Promise((resolve) => setTimeout(resolve, 4600));

			player.roll = roll;
		}
	})();
}

function resetReels() {
	const reels = document.querySelectorAll('.reel');

	reels.forEach((reel: HTMLElement) => {
		reel.style.transitionDuration = '0s';
		reel.style.transform = 'translateY(1097px)';
	});
}

function spinReel(roll: string) {
	const reels = document.querySelectorAll('.reel');

	reels.forEach((reel: HTMLElement, index) => {
		const rollIndex = parseInt(roll.charAt(index));

		const reelTop = 1097;

		const rollOffset = (rollIndex * 54) + 48;

		const rollPosition = reelTop - rollOffset;

		reel.style.transform = `translateY(${rollPosition}px)`;

		// Index 3 1s duration
		// Index 2 1.5s duration
		// Index 1 2s duration
		// Index 0 4.5s duration

		const duration = (index === 3 ? .51 : index === 2 ? 2 : index === 1 ? 3 : 4.5) + 's';

		reel.style.transitionDuration = duration;
	});
}

defineExpose({
	showModal,
});

watch(() => props.game.status, (status) => {
	if (status === 'finished') {
		executeSpins();
	}
});
</script>

<style scoped>
.roll-number {
	width: 100%;
	height: 100%;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	--tw-bg-opacity: 1 !important;
	background-color: hsl(var(--n) / var(--tw-bg-opacity)) !important;
}

.roll-number div:last-of-type {
	width: 100%;
	height: 100%;
	background-image: linear-gradient(rgb(25, 29, 36), rgba(25, 29, 36, 0.85), rgba(25, 29, 36, 0), rgba(25, 29, 36, 0.85), rgb(25, 29, 36));
	z-index: 2;
}

.stop {
	margin-top: 2072px;
	transition-timing-function: cubic-bezier(0.15, 0.8, 0.12, 0.95);
	animation: 0s ease 0s 1 normal none running none;
}

.reel {
	width: 100%;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	flex-direction: column;
	background: transparent;
	border: none;
	position: absolute;
	left: 0px;
	overflow: visible;
}

.reel span {
	color: rgb(255, 255, 255);
	font-size: 34px;
	line-height: 54px;
	text-align: center;
	text-shadow: rgb(255 255 255 / 15%) 0px 0px 20px;
}
</style>