import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/css/index.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


import ToastService from 'primevue/toastservice';

import Drawer from 'primevue/drawer'; // PrimeVue Drawer component
import Button from 'primevue/button'; // PrimeVue Button component
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import Chip from 'primevue/chip';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Tag from 'primevue/tag';
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Skeleton from 'primevue/skeleton';
import ProgressSpinner from 'primevue/progressspinner';
import OverlayBadge from 'primevue/overlaybadge';
import ToggleSwitch from 'primevue/toggleswitch';

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
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Tag', Tag)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('Textarea', Textarea)
app.component("Toast", Toast)
app.component("Skeleton", Skeleton)
app.component("ProgressSpinner", ProgressSpinner)
app.component("OverlayBadge", OverlayBadge)
app.component("ToggleSwitch", ToggleSwitch)
// Mount the app
app.use(ToastService);

app.mount('#app');
