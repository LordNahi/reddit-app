import Vue from "vue";

import AppComponent from "./components/App.vue";

let v = new Vue({
	el: "#app",
	template: `
	<div>
		<AppComponent />
	</div>
	`,
	components: {
		AppComponent
	}
});
