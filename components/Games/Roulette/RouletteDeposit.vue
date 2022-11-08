<template>
	<div class="flex justify-between">
		<div class="flex flex-col">
			<button class="btn bg-red-500 text-white normal-case w-72">
				Red x2
			</button>
		</div>
		<div class="flex flex-col gap-12">
			<button class="btn bg-green-500 text-white normal-case w-72">
				Green x14
			</button>
		</div>
		<div class="flex flex-col gap-12">
			<button class="btn bg-slate-800 text-white normal-case w-72">
				Black x2
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAuth } from '~/stores/auth';
</script>