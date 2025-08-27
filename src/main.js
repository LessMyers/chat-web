import { createApp } from 'vue'
//import './style.css'
import App from './App.vue';
import 'emoji-picker-element';

import "vant/lib/index.css";

import {
    Button, Field, Icon, Col, Row,NavBar
} from "vant";

const app = createApp(App);

app.use(Button);
app.use(Field);
app.use(Icon);
app.use(Col);
app.use(Row);
app.use(NavBar);

app.mount('#app')
