<template>
	<div>
		<input v-model="isShown" type="checkbox" id="my-modal" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box px-12 w-96">
				<h3 class="font-bold text-white text-center text-2xl ">Sign In</h3>
				<p class="text-sm text-center mb-8 mt-2">Sign in with an existing social media</p>
				<div class="flex flex-col gap-4">
					<a v-for="(provider, index) in providers" :key="index" :class="`btn ${provider.color} normal-case`" :href="`${useRuntimeConfig().public.BASE_URL}/auth/${provider.name}`">
						<Icon :name="provider.icon" class="text-2xl mr-2" />
						Sign in with {{ provider.name }}
					</a>
				</div>

				<p class="text-sm text-center mt-8 mb-4">
					By signing in, you agree to our <a href="#" class="text-primary">Terms of Service</a> and <a href="#" class="text-primary">Privacy Policy</a>.
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAuth } from '~~/stores/auth';

const auth = useAuth();
const isShown = ref(false);

const providers = [
	{ name: 'Google', icon: 'fa6-brands:google', url: '', color: 'bg-white text-black' },
	{ name: 'Discord', icon: 'fa6-brands:discord', url: '', color: 'bg-indigo-500 text-white' },
	{ name: 'Apple', icon: 'fa6-brands:apple', url: '', color: 'bg-apple text-white' },
	{ name: 'Steam', icon: 'fa6-brands:steam', url: '', color: 'bg-slate-900 text-white' }
]

function showModal() {
	isShown.value = true;
}

defineExpose({
	showModal,
});
</script>