import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import { projectAuth } from "@/config/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
    try {
        isPending.value = true;
        const response = await createUserWithEmailAndPassword(projectAuth, email, password, displayName);
        await updateProfile(response.user, { displayName });
        return response;
    } catch (err) {
        error.value = err.message;
    } finally {
        isPending.value = false;
    }
};

const useSignUp = () => {
    return { error, isPending, signup };
};

export default useSignUp;