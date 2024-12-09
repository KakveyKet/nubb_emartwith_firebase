<template>
  <form @submit.prevent="handleRejectOrder">
    <div class="flex flex-col gap-2">
      <div>
        <p>Please Enter Your Reason</p>
      </div>
      <InputText v-model="reason" placeholder="Reason" />
      <Button class="mt-4 w-[120px]" severity="danger" type="submit"
        >Reject</Button
      >
    </div>
  </form>
</template>

<script>
import useCollection from "@/composible/useCollection";
import { ref, onMounted, watch } from "vue";
import { getCollectionQuery } from "@/composible/getCollection";
import { getAuth } from "firebase/auth";
import { projectAuth } from "@/config/config";
import { where, Timestamp } from "firebase/firestore";
export default {
  props: ["dataToEdit"],
  setup(props, { emit }) {
    const currentUser = ref(null);
    const auth = getAuth();
    const reason = ref("");
    const { updateDocs } = useCollection("orders");
    const { addDocs: addReport } = useCollection("orders_report");
    const handleRejectOrder = async () => {
      console.log("reason", reason.value);
      const result = await updateDocs(props.dataToEdit.id, {
        reject_reason: reason.value,
        status: "rejected",
      });
      if (result) {
        const report = await addReport({
          orderId: props.dataToEdit.id,
          userId: currentUser.value.uid,
          reject_reason: reason.value,
          items: props.dataToEdit.items,
          pending_time: props.dataToEdit.pending_time,
          total_price: props.dataToEdit.total_price,
          location: props.dataToEdit.location,
          instructions: props.dataToEdit.instructions,
          status: "rejected",
          created_at: Timestamp.now(),
          updated_at: Timestamp.now(),
          user: props.dataToEdit.user,
        });
        console.log("report", report);
      }
      console.log("result", result);
      emit("close");
      emit("toast", "update", "success");
    };

    onMounted(() => {
      console.log("props", props.dataToEdit);
      currentUser.value = auth.currentUser;
      console.log("currentUser", currentUser.value.uid);
      if (props.dataToEdit) {
        reason.value = props.dataToEdit.reject_reason;
      }
    });
    return {
      reason,
      handleRejectOrder,
    };
  },
};
</script>
