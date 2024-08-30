<template>
  <div class="w-[80%] mx-auto">
    <div class="py-2">
      <h2 class="font-bold text-black text-14px">Categories</h2>
    </div>
    <div class="flex flex-wrap gap-8">
      <div v-for="data in 5" class="mt-6" :key="data">
        <div class="size-[96px] overflow-hidden rounded-full border">
          <img
            class="size-full object-cover"
            src="../assets/icon/sanwitch.jpg"
            alt=""
          />
        </div>
        <h2 class="text-center font-semibold mt-2">Sandwich</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
