import { importHTML } from "./import-html";
import { getPrevRoute, getNextRoute } from "./rewrite-router";
// 处理路由变化
import { getApps } from "./index";

export const handleRouter = async () => {
  const apps = getApps();
  // 卸载上一个路由应用
  const prevApp = apps.find((item) => {
    return getPrevRoute().startsWith(item.activeRule);
  });
  // 获取下一个路由应用
  const app = apps.find((item) => getNextRoute().startsWith(item.activeRule));

  // 如果有上一个应用，则先销毁
  if (prevApp) {
    await unmount(prevApp);
  }

  if (!app) return;
  // 3.加载子应用
  const { template, getExternalScripts, execScripts } = await importHTML(
    app.entry
  );
  const container = document.querySelector(app.container);
  container.appendChild(template);

  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry;

  const appExports = await execScripts();

  app.bootstrap = appExports.bootstrap;
  app.mount = appExports.mount;
  app.unmount = appExports.unmount;

  await bootstrap(app);
  await mount(app);

  // 请求获取子应用的资源: HTML,CSS,JS
  // // 1.客户端渲染需要通过执行 js 来生成内容
  // // 2.浏览器出于安全考虑， innerHtml中的 script 不会加载执行

  // 手动加载子应用的script
  // 执行script中的代码
  // eval或者new Function

  // 4.渲染子应用
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}
async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}
async function unmount(app) {
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container),
    }));
}
