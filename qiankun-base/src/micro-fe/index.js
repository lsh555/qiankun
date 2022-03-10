import { handleRouter } from "./handle-router";
import { rewriteRouter } from './rewrite-router';
let _apps = [];

export const getApps = () => _apps;

export const registerMicroApps = (apps) => {
    _apps = apps;
};

export const start = () => {
    //微前端的运行原理: 2.匹配子应用 3.加载子应用 4.渲染子应用

    // 1.监视路由变化
    // hash 路由: window.onhashchange

    // history 路由
    // history.go  history.back history.forward 使用window.onpopstate事件
    // pushState, replaceState 需要通过函数重写的方式进行劫持，因为popstate只能监听浏览器的前进后退
    rewriteRouter();

    //初始执行匹配
    handleRouter();
};

