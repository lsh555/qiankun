import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './public-path';

Vue.config.productionTip = false

let instance = null;
function render(props) {
  // props 组件通信
  const { container } = props;
  instance = new Vue({
    router,
    render: h => h(App)
    // 如果有container，说明运行在主应用里面，否则就不是在qiankun里面运行，container就是我们的qiankun-base里面的<div id="vue"></div>，
    // 它里面就是我们的index.html
  }).$mount(container ? container.querySelector('#app') : '#app') // 这里是挂载到自己的HTML中，基座会拿到这个挂载后的HTML，将其插入进去
}

if (!window.__POWERED_BY_QIANKUN__) { // 如果是独立运行，则手动调用渲染
  mount({});
}
if(window.__POWERED_BY_QIANKUN__){ // 如果是qiankun使用到了，则会动态注入路径
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 子应用接入qiankun
// 1.导出三个必要的生命周期钩子函数
// bootstrap 渲染之前
// mount 渲染函数
// unmount 卸载函数
// 生命周期函数必须返回promise

// 根据 qiankun 的协议需要导出 bootstrap/mount/unmount
export async function bootstrap(props) {

};
export async function mount(props) {
  render(props);
};
export async function unmount(props) {
  // 防止造成内存泄漏
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
};
