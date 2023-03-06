import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
uni.$http = $http
// 请求根路径
$http.baseUrl = 'https://www.uinav.com'
// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中..."
	})
}
// 响应拦截器
$http.afterRequest = function(options) {
	uni.hideLoading()
}
// 封装弹窗方法
uni.$showMessage = function(title ='请求数据失败', duration=500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif