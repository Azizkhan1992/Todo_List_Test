import Vue from 'vue';
import VueMoment from 'vue-moment';
const moment = require('moment');

window.moment = moment;
Vue.use(VueMoment, { moment });