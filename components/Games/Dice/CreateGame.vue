<template>
	<div>
		<input v-model="isShown" type="checkbox" id="dice-modal" class="modal-toggle" />
		<label class="modal cursor-pointer" for="dice-modal">
			<label class="modal-box px-4 w-72 text-center" for="">
				<h1 class="text-xl text-white mb-2">Create Dice Duel</h1>
				<div class="form-control w-full mb-2 max-w-xs">
					<label class="label font-bold">
						<span class="label-text text-xs">Buy In</span>
					</label>
					<input v-model="buyIn" type="number" min="30" max="100000"
						class="input input-primary input-sm bg-primary w-full max-w-xs text-white" />
				</div>

				<div class="form-control w-full mb-2 max-w-xs">
					<label class="label font-bold">
						<span class="label-text text-xs">Max Players</span>
					</label>
					<input v-model="maxPlayers" type="number" min="2" max="10"
						class="input input-primary input-sm bg-primary w-full max-w-xs text-white" />
				</div>

				<button class="btn btn-primary btn-sm normal-case mx-auto mt-4" @click="createGame">
					<Icon name="fa6-solid:eye" class="mr-1" />
					Create
				</button>
			</label>
		</label>
	</div>
</template>

<script lang="ts" setup>import { Icon } from '@iconify/vue';
import { useDice } from '~/stores/dice';
import { useAuth } from '~~/stores/auth';

const auth = useAuth();
const dice = useDice();
const isShown = ref(false);

const buyIn = ref(0);
const maxPlayers = ref(2);

function showModal() {
	isShown.value = true;
}

async function createGame() {
	dice.createGame(buyIn.value, maxPlayers.value);
}

defineExpose({
	showModal,
});
</script>