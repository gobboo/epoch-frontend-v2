<template>
	<div class="navbar bg-base-100">
		<SignIn ref="loginModal" />
		<div class="flex-1">
		</div>
		<div class="flex-none">
			<button v-if="!auth.loggedIn" class="btn btn-primary btn-sm normal-case" @click="loginModal.showModal()">
				Sign In
			</button>
			
			<div v-else class="flex gap-4">
				<div v-if="auth.loggedIn" class="btn btn-primary btn-sm">
					<Icon name="ri:currency-fill" class="text-lg text-white" />
					<div class="divider divider-horizontal mx-0"></div>
					{{ auth.user.balance }}
				</div>

				<button class="btn btn-primary btn-sm normal-case" @click="auth.logout">
					Sign Out
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAuth } from '~~/stores/auth';
import SignIn from '../Authentication/SignIn.vue';


const auth = useAuth();
const loginModal = ref(null);
</script>