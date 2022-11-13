<template>

	<div>
		<div class="flex mb-8">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text text-white">Bet Amount</span>
				</label>
				<input v-model="deposit" type="number" placeholder="1.00" class="input bg-primary input-sm w-full max-w-xs" />
			</div>
		</div>

		<div class="flex justify-between">
			<div class="flex flex-col gap-12">
				<button class="btn bg-red-500 text-white normal-case w-72" @click="roulette.joinGame(deposit, 'red')">
					Red x2
				</button>

				<div class="flex flex-col gap-2" v-for="(player, index) in bets['red']" :key="index">
					<div class="flex items-center justify-between">
						<div class="flex">
							<img src="https://via.placeholder.com/128" class="w-12 h-12 rounded-full" />
							<p class="text-white text-xl font-medium ml-4">
								{{ player.user.username }}
							</p>
						</div>

						<p class="text-white text-base font-medium">
							<Icon name="ri:currency-fill" class="text-lg text-yellow-400" />
							{{ player.bet }}
						</p>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-12">
				<button class="btn bg-green-500 text-white normal-case w-72" @click="roulette.joinGame(deposit, 'green')">
					Green x14
				</button>

				<div class="flex flex-col gap-2" v-for="(player, index) in bets['green']" :key="index">
					<div class="flex items-center justify-between">
						<div class="flex">
							<img src="https://via.placeholder.com/128" class="w-12 h-12 rounded-full" />
							<p class="text-white text-xl font-medium ml-4">
								{{ player.user.username }}
							</p>
						</div>

						<p class="text-white text-base font-medium">
							<Icon name="ri:currency-fill" class="text-lg text-yellow-400" />
							{{ player.bet }}
						</p>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-12">
				<button class="btn bg-slate-800 text-white normal-case w-72" @click="roulette.joinGame(deposit, 'black')">
					Black x2
				</button>

				<div class="flex flex-col gap-2" v-for="(player, index) in bets['black']" :key="index">
					<div class="flex items-center justify-between">
						<div class="flex">
							<img src="https://via.placeholder.com/128" class="w-12 h-12 rounded-full" />
							<p class="text-white text-xl font-medium ml-4">
								{{ player.user.username }}
							</p>
						</div>

						<p class="text-white text-base font-medium">
							<Icon name="ri:currency-fill" class="text-lg text-yellow-400" />
							{{ player.bet }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAuth } from '~/stores/auth';
import { useRoulette } from '~~/stores/roulette';

const roulette = useRoulette();
const auth = useAuth();

const deposit = ref(0);


// Group bets by color and sort by bet amount and group by user
const bets = computed(() => {
	const bets = roulette.currentGame.players;

	const grouped = {
		red: [],
		green: [],
		black: [],
	};

	for (const bet of bets) {
		grouped[bet.color].push(bet);
	}

	for (const color in grouped) {
		grouped[color].sort((a, b) => b.bet - a.bet);
	}

	// Group by user
	for (const color in grouped) {
		const groupedByUser = {};

		for (const bet of grouped[color]) {
			if (!groupedByUser[bet.user.id]) {
				groupedByUser[bet.user.id] = {
					user: bet.user,
					bet: 0,
				};
			}

			groupedByUser[bet.user.id].bet += bet.bet;
		}

		grouped[color] = Object.values(groupedByUser);
	}

	return grouped;
});

</script>