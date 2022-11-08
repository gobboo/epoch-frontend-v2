<template>
	<div class="min-h-screen fixed float-left p-4 bg-neutral rounded-r-md">
		<div class="games flex flex-col gap-4">
			<NuxtLink  v-for="(game, index) in games" :key="index" :to="game.route" class="p-1 rounded-md transition-all">
				<div class="tooltip tooltip-right" :data-tip="game.name">
					<Icon :name="game.icon" class="w-6 h-6" />
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>

const games = [
	{
		name: 'Mines',
		icon: 'mdi:bomb',
		route: '/mines'
	},
	{
		name: 'Dice Duels',
		icon: 'tabler:swords',
		route: '/dice-duels'
	},
	{
		name: 'Roulette',
		icon: 'game-icons:abstract-103',
		route: '/roulette'
	}
]

</script>

<style scoped>

.router-link-exact-active {
  background-color: hsl(var(--p) / var(--tw-bg-opacity)) !important;
	color: white;
}
</style>