import { projectAuth } from "@/config/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { ref } from "vue";
const error = ref(null);
const isPending = ref(false);

const resetPassword = async (email) => {
    error.value = null;
    isPending.value = true;

    try {
        const res = await sendPasswordResetEmail(projectAuth, email);
        isPending.value = false;

        return res;
    } catch (err) {
        console.log("err", err);
        error.value = err.message;
        isPending.value = false;
    }
};

const useResetPassword = () => {
    return { error, resetPassword, isPending };
};

export default useResetPassword;