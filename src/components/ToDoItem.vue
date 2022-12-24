<template>
	<div class="todo__list-item">
		<input 
			v-model="form.status"
			@change="changeStatus"
			type="checkbox"
			class="todo__list-checkbox"
		>
		<p class="todo__list-title">{{ form.name }}</p>
		<span class="todo__list-date">{{ form.day }}</span>
		<span @click="$emit('remove', form.id)" class="todo__list-date">
			delete
		</span>
	</div>
</template>
<script>
export default {
	name: 'ToDoItem',
	props: {
		task: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			form: {
				name: null,
				status: false
			}
		}
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.form = {...this.task};
		},
		changeStatus() {
			const form = {status: this.form.status};

			this.$emit('changed', {form, id: this.form.id});
		}
	}
}
</script>
<style lang="scss" scoped>
	.todo__list-date {
		cursor: pointer;
	}
</style>
