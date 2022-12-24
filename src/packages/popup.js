import Vue from 'vue'
import Notifications from 'vue-notification';

Vue.use(Notifications);

const notify = {
    error(text, title = "Error") {
        Vue.notify({
            group: 'notify',
            type: 'error',
            title: title,
            text: text,
            duration: 3000,
            speed: 500
        });
    },
    warn(text, title = "Warning") {
        Vue.notify({
            group: 'notify',
            type: 'warn',
            title: title,
            text: text,
            duration: 3000,
            speed: 500
        });
    },
    success(text, title = "Success") {
        Vue.notify({
            group: 'notify',
            type: 'success',
            title: title,
            text: text,
            duration: 3000,
            speed: 500
        });
    }
};

Vue.prototype.$notify = notify;

export default notify;