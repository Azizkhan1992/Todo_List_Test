<template>
	<div class="container">
		<to-do></to-do>
	</div>
</template>
<script>
import ToDo from '@/components/ToDo.vue';
export default {
	name: 'home',
	components: {
		ToDo
	},
	data() {
		return {
		}
	}
}
</script>
