<template>
	<div>
		<router-view></router-view>
		<notifications group="notify" position="bottom right"></notifications>
	</div>
	
</template>

<script>
import '@/assets/styles/app.scss';

export default {
  name: "app"
};
</script>
