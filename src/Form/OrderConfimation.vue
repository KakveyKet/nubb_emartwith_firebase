<template>
  <div class="w-full">
    <div class="flex flex-col space-y-2">
      <label for="">Confirm Pending Time</label>
      <InputNumber placeholder="Time *" v-model="time" suffix=" Minutes" />
    </div>
    <Button class="mt-4" label="Submit" @click="handleSubmit" />
  </div>
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
    const time = ref(null);
    const currentUser = ref(null);
    const auth = getAuth();

    const { updateDocs } = useCollection("orders");
    const { addDocs: addReport } = useCollection("orders_report");
    const handleSubmit = async () => {
      try {
        if (props.dataToEdit) {
          const result = await updateDocs(props.dataToEdit.id, {
            pending_time: time.value,
            status: "accepted",
          });
          if (result) {
            const report = await addReport({
              branch_id: props.dataToEdit.branch_id,
              orderId: props.dataToEdit.id,
              userId: props.dataToEdit.user[0]?.id,
              reject_reason: "",
              items: props.dataToEdit.items,
              pending_time: props.dataToEdit.pending_time,
              total_price: props.dataToEdit.total_price,
              location: props.dataToEdit.location,
              instructions: props.dataToEdit.instructions,
              status: "accepted",
              created_at: Timestamp.now(),
              updated_at: Timestamp.now(),
              user: props.dataToEdit.user,
            });
            console.log("report", report);
          }
          console.log("success", result);
        }
        emit("close");
        emit("toast", "update", "success");
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      currentUser.value = auth.currentUser;
      if (props.dataToEdit) {
        time.value = props.dataToEdit.pending_time;
        console.log("props.dataToEdit", props.dataToEdit.user[0]?.id);
        console.log("props.dataToEdit", props.dataToEdit.branch_id);
      }
    });
    return {
      time,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
