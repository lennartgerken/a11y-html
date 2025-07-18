import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import clickOther from './directives/clickOther'

const app = createApp(App)
app.directive('click-other', clickOther)
app.mount('#app')
