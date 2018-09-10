import Vue from 'vue'
import FastClick from 'fastclick'
import app from './app.vue'
import jsBridge from "./modules/jsBridge";

import './styles/common.less'
import './styles/iconfont.css'

if(process.env.NODE_ENV == "development"){
	console.log("当前是开发模式！");
}else if(process.env.NODE_ENV == "production"){
	console.log("当前是生产模式！");
}

var Vconsole = new VConsole();

new Vue({
	el : "#MYAPP",
	data : () => {
		return {
		}
	},
	mounted() {
		if(jsBridge.g_deviceType() != "Android"){
			FastClick.attach(document.body);
		}
	},
	render: (h) => h(app)
});
