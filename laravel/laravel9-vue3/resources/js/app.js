import './bootstrap';

import { createApp } from 'vue';
import ComponentA from './components/ComponentA.vue';
import ComponentB from './components/ComponentB.vue';

import App from './App.vue';

const app = createApp(App);

app.component('ComponentA', ComponentA);
app.component('ComponentB', ComponentB);

app.mount("#app");
