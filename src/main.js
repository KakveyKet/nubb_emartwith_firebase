import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/css/index.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBowlFood, faBurger, faShop, faStar, faUtensils } from "@fortawesome/free-solid-svg-icons";

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
import RadioButton from 'primevue/radiobutton';
import Timeline from 'primevue/timeline';
import Badge from 'primevue/badge';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


import Popover from 'primevue/popover';

// notivue
import { createNotivue } from 'notivue'

import 'notivue/notification.css'
import 'notivue/animations.css'
// Create Vue app instance
const app = createApp(App);

// Set up router
const notivue = createNotivue({
    position: 'top-center',
    limit: 1,
    enqueue: false,
    notifications: {
        global: {
            duration: 2000
        }
    }
})
app.use(router);
app.use(notivue)

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
library.add(faStar, faBowlFood, faShop, faBurger, faUtensils);
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
app.component("RadioButton", RadioButton)
app.component("Timeline", Timeline)
app.component("Badge", Badge)
app.component("IconField", IconField)
app.component("InputIcon", InputIcon)
app.component("Popover", Popover)
// Mount the app
app.use(ToastService);

app.mount('#app');
