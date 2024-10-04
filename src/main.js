import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/css/index.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Drawer from 'primevue/drawer'; // PrimeVue Drawer component
import Button from 'primevue/button'; // PrimeVue Button component
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import Chip from 'primevue/chip';
// Create Vue app instance
const app = createApp(App);

// Set up router
app.use(router);
app.use(PrimeVue, {
    theme: {

        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light', // Force light mode
            cssLayer: false
        }
    }
});
// FontAwesome configuration
library.add(faStar);
app.component('font-awesome-icon', FontAwesomeIcon);
// Register PrimeVue components
app.component('Drawer', Drawer); // Use a multi-word name
app.component('DatePicker', DatePicker); // Use a multi-word name
app.component('Button', Button); // Use a multi-word name
app.component('InputText', InputText)
app.component('Select', Select)
app.component('Dialog', Dialog)
app.component('Chip', Chip)

// Mount the app
app.mount('#app');
