import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import { projectAuth } from "@/config/config";

const error = ref(null);
const isPending = ref(false);

const signin = async (email, password, displayName) => {
    try {
        isPending.value = true;

        const userCredential = await signInWithEmailAndPassword(projectAuth, email, password);

        await updateProfile(userCredential.user, { displayName });

        error.value = null;
    } catch (err) {
        error.value = err.message;
    } finally {
        isPending.value = false;
    }
};

const useSignIn = () => {
    return { error, isPending, signin };
};

export default useSignIn;