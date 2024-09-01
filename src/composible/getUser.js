import { projectAuth } from "../config/config";
import { ref } from "vue";

const user = ref(null);

const initializeAuthStateListener = () => {
    projectAuth.onAuthStateChanged((_user) => {
        if (_user) {
            user.value = _user;
        } else {
            user.value = null;
        }
    });
};

const getUser = () => {
    initializeAuthStateListener();
    return { user };
};

export default getUser;