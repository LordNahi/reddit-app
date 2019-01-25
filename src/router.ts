import Vue from "vue";
import Router from "vue-router";

import Home from "./screens/Home.vue";
import RedditVideo from "./components/RedditVideo.vue";

Vue.use(Router);

const router = new Router({
	base: "http://192.168.143.2:8080",
	mode: "history",
	routes: [
		{
			component: Home,
			name: "home",
			path: "/"
		},
		{
			component: RedditVideo,
			name: "Video",
			path: "/v/:id"
		}
	]
});

export default router;
