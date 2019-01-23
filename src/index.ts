import Vue from "vue";

import AppComponent from "./App.vue";

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
