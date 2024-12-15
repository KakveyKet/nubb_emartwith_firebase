<template>
  <Dialog
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '30vw', position: 'absolute', top: '10vh' }"
    v-model:visible="visible"
    :header="'Are you sure?'"
    :modal="true"
    @hide="handleClose"
  >
    <div>
      <p>
        កាលុបមិនអាចយកមកវិញបានទេ [
        {{
          route.path === "/paymentmethod"
            ? dataToDelete?.bank_name
            : dataToDelete?.name
        }}
        ] ?
      </p>
    </div>
    <template #footer>
      <Button
        class="p-button-danger p-button-outlined !w-12"
        label="No"
        @click="handleClose"
      />
      <Button
        class="p-button-success !bg-primary-6 !border-none"
        label="Yes"
        @click="confirmDelete"
      />
    </template>
  </Dialog>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { Button } from "primevue/button";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    deleteId: {
      type: String,
      required: true,
    },
    dataToDelete: {
      type: Object,
      required: true,
    },
    toast: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    const visible = ref(props.visible);
    const route = useRoute();
    const handleClose = () => {
      // emit("update:visible", false); // Emit an event to close the dialog
      emit("close");
    };

    const confirmDelete = () => {
      emit("delete", props.deleteId); // Emit delete event with the ID
      handleClose(); // Close the dialog after confirming delete
      emit("toast", "delete");
    };

    // Watch for prop changes to update local visibility state
    watch(
      () => props.visible,
      (newValue) => {
        visible.value = newValue;
      }
    );
    onMounted(() => {
      console.log(props.dataToDelete);
    });

    return {
      visible,
      handleClose,
      confirmDelete,
      route,
    };
  },
};
</script>

<style lang="scss" scoped></style>
