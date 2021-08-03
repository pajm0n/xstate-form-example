import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { inspect } from "@xstate/inspect";

inspect({
  // options
  // url: 'https://statecharts.io/inspect', // (default)
  iframe: false, // open in new window
});

createApp(App).mount("#app");
