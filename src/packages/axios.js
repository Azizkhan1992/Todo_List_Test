import Vue from 'vue';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
});

Vue.prototype.$api = instance;