import { handleRouter } from "./handle-router";

let prevRoute = ""; //上一个路由
let nextRoute = window.location.pathname; // 下一个路由

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

window.getNextRoute = getNextRoute;
window.getPrevRoute = getPrevRoute;

export const rewriteRouter = () => {
  window.addEventListener("popstate", () => {
    // popstate 触发的时候，路由已经完成导航了
    prevRoute = nextRoute; // 之前的
    nextRoute = window.location.pathname; //最新的
    handleRouter();
  });
  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    // 导航前
    prevRoute = window.location.pathname;
    rawPushState.apply(window.history, args); // 这是在真正的改变历史记录
    nextRoute = window.location.pathname;
    // 导航后
    handleRouter();
  };

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    prevRoute = window.location.pathname;
    rawReplaceState.apply(window.history, args);
    nextRoute = window.location.pathname;
    handleRouter();
  };
};
