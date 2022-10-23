<template>
</template>

<script lang="ts" setup>
import { useAuth } from '~~/stores/auth';

const auth = useAuth();

function serialize(obj: any) {
	const str = [];
	for (const p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
	return str.join('&');
}

onMounted(async () => {
	const strategy = useRoute().params.strategy;
	const query = useRoute().query;

	console.log(strategy, query);

	await auth.submitCode(strategy, serialize(query));

	navigateTo('/');
})
</script>