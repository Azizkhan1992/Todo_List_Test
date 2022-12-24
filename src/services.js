import Vue from "vue";

export default {
    api: Vue.prototype.$api,

    getTasks() {
        return this.api.get(`tasks`);
    },

    getTask(id) {
        return this.api.get(`tasks?id=${id}`);
    },

    addTask(form) {
        return this.api.post(`tasks`, form);
    },

    updateStatus(form, id) {
        return this.api.patch(`tasks/${id}`, form);
    },

    deleteTask(id) {
        return this.api.delete(`tasks/${id}`);
    }
}