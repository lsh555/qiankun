import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

function render(props) {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}
export async function bootstrap() {}
export async function mount(props) {
  render(props);
}
export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
