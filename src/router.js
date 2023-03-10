import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [{
            path: "/",
            component: () => import ("./layout/default"),
            children: [
				{
                    path: "",
                    name: 'home',
                    component: () => import ("./pages/home.vue")
                }]
			}
    ]
});

export default router;
