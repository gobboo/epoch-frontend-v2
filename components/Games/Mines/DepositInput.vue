<template>
	<div class="flex flex-col">
		<div class="flex gap-2">
			<button class="btn btn-primary btn-xs text-white normal-case">
				Manual
			</button>
			<div class="mx-auto" />
			<button class="btn btn-primary btn-xs text-white normal-case">
				?
			</button>
			<button class="btn btn-primary btn-xs text-white normal-case">
				Fairness
			</button>
			<button class="btn btn-primary btn-xs text-white normal-case">
				History
			</button>
		</div>

		<div class="form-control w-full my-2 max-w-xs">
			<label class="label font-bold">
				<span class="label-text text-xs">Bet Amount</span>
			</label>
			<input v-model="deposit" type="number" class="input input-primary input-sm bg-primary w-full max-w-xs text-white" />
		</div>

		<div class="form-control w-full my-2 max-w-xs">
			<label class="label font-bold">
				<span class="label-text text-xs">Mine Count</span>
			</label>
			<input v-model="mineCount" type="number" class="input input-primary input-sm bg-primary w-full max-w-xs text-white" />
		</div>

		<div class="form-control w-full my-2 max-w-xs">
			<label class="label font-bold">
				<span class="label-text text-xs">Potential Win</span>
			</label>
			<input v-model="calculateWinnings" type="number" readonly
				class="input input-primary input-sm bg-primary w-full max-w-xs text-white" />
		</div>

		<button v-if="!props.currentGame" class="btn btn-primary mt-8 btn-sm normal-case" :disabled="!auth.loggedIn" @click="createGame">
			Create Game
		</button>

		<button v-else class="btn btn-primary mt-8 btn-sm normal-case" :disabled="!auth.loggedIn" @click="cashoutGame">
			Cash out - {{ calculateMultiplier }}x
		</button>
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useAuth } from '~~/stores/auth';
import { MineInfo } from '~~/types/interfaces';

const { $socket } = useNuxtApp();

const auth = useAuth();

const deposit = ref(30);
const mineCount = ref(3);

const props = defineProps({
	currentGame: {
		type: Object as PropType<MineInfo>,
		default: null
	}
})

const emit = defineEmits(['create-game', 'cashout-game'])

function createGame() {
	$socket.emit('mine:create', { deposit: deposit.value, mineCount: mineCount.value }, (gameInfo: MineInfo) => {
		emit('create-game', gameInfo)
		auth.fetchUser();
	})
}

function cashoutGame () {
	$socket.emit('mine:cashout', null, (gameInfo: MineInfo) => {
		emit('cashout-game', gameInfo)
		auth.fetchUser();
	})
}

const calculateWinnings = computed(() => {
	if (props.currentGame === null) {
		return 0;
	}
	
	return Math.round(props.currentGame.potentialWin * 100) / 100;
})

const calculateMultiplier = computed(() => {
	// Calculate a multipler based on calculatedWinnings difference to deposit
	if (props.currentGame === null) {
		return 0;
	}

	// Calculate % difference
	const percentage = (calculateWinnings.value / deposit.value) * 100;

	// Calculate multiplier
	const multiplier = percentage / 100;

	return multiplier.toFixed(2);
})
</script>