<template>
  <div class="w-full">
    <div class="flex flex-col space-y-2">
      <label for="">Confirm Pending Time</label>
      <InputNumber
        placeholder="Time *"
        v-model="time"
        suffix=" Minutes"
        style="width: 250px"
      />
    </div>
    <Button class="mt-4" label="Submit" @click="handleSubmit" />
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";
import { ref, onMounted } from "vue";
import useCollection from "@/composible/useCollection";
export default {
  props: ["dataToEdit"],

  setup(props, { emit }) {
    const time = ref(null);
    const { updateDocs } = useCollection("orders");
    const handleSubmit = async () => {
      try {
        if (props.dataToEdit) {
          const result = await updateDocs(props.dataToEdit.id, {
            pending_time: time.value,
            status: "accepted",
          });
          console.log("success", result);
        }
        emit("close");
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      if (props.dataToEdit) {
        time.value = props.dataToEdit.pending_time;
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
