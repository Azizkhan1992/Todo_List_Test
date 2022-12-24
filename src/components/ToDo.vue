<template>
	<div class="todo-container">
		<div class="error" v-if="errorChecker">
			<p>README ni o'qing va ma'lumotlar bazasini ishga tushiring</p>
		</div>
		<div class="todo__list-header" :class="errorChecker == true ? 'an-error': ''">
			<h3>To Do App</h3>
			<div class="todo__list-add">
				<input
					v-model="form.name"
					type="text"
					class="todo__list-input"
					:class="{'is-invalid': $v.form.name.$error}"
					placeholder="some words" />
				<!-- <input v-model="form.day" type="date" :min="today" class="todo__list-input" pattern="\d{4}-\d{2}-\d{2}" /> -->
				<button
					class="todo__list-btn"
					@click="addTask"
				>+</button>
			</div>
			<div class="todo__list-add calendar">
				<date-picker
					v-model="form.day"
					format="DD-MM-YYYY"
					valueType="DD-MM-YYYY"
					:disabled-date="minDate"
					:input-class="pickerClass"
				></date-picker>
			</div>
		</div>
		<div class="todo__list-list">
			<template v-if="tasks.length > 0">
				<to-do-item
					v-for="(taskItem, id) in tasks"
					:key="id"
					:task="taskItem"
					@changed="saveChange($event)"
					@remove="deleteTask($event)"
				></to-do-item>
			</template>
			<div v-else class="not-found">
				<p>Vazifalar topilmadi</p>
			</div>
		</div>
	</div>
</template>
<script>
import ToDoItem from './ToDoItem.vue';
import Services from '@/services';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import { required, minLength, maxLength, integer } from "vuelidate/lib/validators";

export default {
	name: 'ToDo',
	components: {
		ToDoItem,
		DatePicker
	},
	data() {
		return {
			form: {
				name: null,
				status: false,
				day: this.today
			},
			clearForm: {},
			tasks: [],
			errorChecker: false
		}
	},
	created() {
		this.loadTasks();
		this.clearForm = JSON.parse(JSON.stringify(this.form));
	},
	methods: {
		// init() {}
		loadTasks() {
			Services.getTasks()
			.then(res => {
				console.log(res);
				this.tasks = res.data;
				this.errorChecker = false
			}).catch(err => {if(err){
				this.errorChecker = true
				console.log(err)
			}})
		},
		addTask() {
			this.$v.form.$touch();console.log(this.$v)
			if (this.$v.form.$invalid) {
				this.$notify.error("Ma'lumotlar xato kiritilgan!");
				return;
			}

			Services.addTask(this.form)
			.then(res => {
				if (res.status === 201) {
					this.$notify.success("Saqlandi!");
					this.loadTasks();
				} else {
					this.$notify.error("Saqlashda xatolik!");
				}
			}, error => console.log(error))
			.finally(() => {
				this.form = this.clearForm;
			})
		},
		saveChange(data) {
			Services.updateStatus(data.form, data.id)
			.then(res => {
				console.log(res);
				if (res.status === 200 && data.form.status) {
					this.$notify.success("Belgilandi!");
				} else if(res.status === 200) {
					this.$notify.success("Belgi olib tashlandi!");
				} else {
					this.$notify.error("Yangilashda xatolik!");
				}
			}, error => console.log(error))
		},
		deleteTask(id) {
			Services.deleteTask(id)
			.then(res => {
				if (res.status === 200) {
					this.$notify.success("O'chirildi!");
				} else {
					this.$notify.error("O'chirishda xatolik!");
				}

				this.loadTasks();
			}, error => console.log(error))
		},
		minDate(date) {
			return date.getTime() < (new Date(`${this.today} 00:00:00`)).getTime();
		}
	},
	computed: {
		today: function () {
			const now = new Date();
			return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
		},
		pickerClass: function() {
			let className = 'mx-input';

			if (this.$v.form.day.$error) {
				className += " is-invalid";
			}
			return className;
		}
	},
	validations: {
		form: {
			name: { 
				required,
				minLength: minLength(3),
				maxLength: maxLength(255)
			},
			status: {
				required,
			},
			day: {
				required,
				isString: function (value) {
					return typeof value === 'string' && value.match(/^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d{4}$/)
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
	.not-found p {
		text-align: center;
    	font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
		margin: 0;
	}
</style>
