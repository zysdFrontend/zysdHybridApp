import Vue from 'vue'

import app from './app.vue'

if(process.env.NODE_ENV == "development"){
	console.log("当前是开发模式！");
}else if(process.env.NODE_ENV == "production"){
	console.log("当前是生产模式！");
}

new Vue({
	el : "#MYAPP",
	data : () => {
		return {
		}
	},
	render: (h) => h(app)
});
