import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

//引入重置样式
import "normalize.css/normalize.css"

//引入ElementUI
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import iconPicker from 'e-icon-picker';
import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库


Vue.use(iconPicker, {
        FontAwesome: true,
        ElementUI: true,
        eIcon: true,
        eIconSymbol: true
    });


Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
