<template>
  <!-- <div
    class="xl:w-full lg:w-full md:w-full w-full xl:flex lg:flex md:flex flex-col items-center justify-center border-t border-slate-200 xl:h-[250px] lg:h-[250px] md:h-[200px]"
  >
    <div
      class="flex flex-col md:flex-row xl:w-[70%] lg:w-[70%] md:w-[70%] w-full justify-between p-8"
    >
      <div
        class="xl:w-[300px] lg:w-[300px] md:w-[200px] w-full xl:border-r lg:border-r md:border-r xl:border-b-0 lg:border-b-0 md:border-b-0 border-b py-2 border-primary-5 space-y-3"
      >
        <div
          class="xl:w-[84px] lg:w-[84px] md:w-[64px] w-[54px] xl:h-[150px] lg:h-[130px] md:h-[120px] h-[100px] overflow-hidden mx-auto py-2"
        >
          <img src="../assets/nubb.png" />
        </div>
        <div>
          <h2
            class="xl:text-16px lg:text-16px md:text-16px text-14px text-center"
          >
            Copyright 2024, All right serve
          </h2>
        </div>
      </div>
      <div
        class="xl:flex lg:flex md:flex grid grid-cols-2 xl:w-[70%] lg:w-[70%] md:w-[70%] w-[100%] justify-between p-8"
      >
        <ul>
          <li class="text-16px font-bold py-2 text-nowrap">MY ACCOUNT</li>
          <li class="text-slate-400">About US</li>
          <li class="text-slate-400">Feedback</li>
          <li class="text-slate-400">Membership</li>
        </ul>
        <ul>
          <li class="text-16px font-bold py-2 text-nowrap">HELP & SUPPORT</li>
          <li class="text-slate-400">Delivery info</li>
          <li class="text-slate-400">Return</li>
          <li class="text-slate-400">Refund</li>
          <li class="text-slate-400">How to order</li>
        </ul>

        <ul>
          <li class="text-16px font-bold py-2 text-nowrap">CUSTOMER CARE</li>
          <li class="text-slate-400">Contact us</li>
          <li class="text-slate-400">Payment</li>
          <li class="text-slate-400">Coupon</li>
        </ul>
        <ul class="">
          <li class="text-16px font-bold py-2 text-nowrap">PAYMENT METHOD</li>
          <div class="flex gap-3">
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/ababank.png"
                alt=""
              />
            </li>
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/ac.png"
                alt=""
              />
            </li>
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/paypal.png"
                alt=""
              />
            </li>
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/wing.png"
                alt=""
              />
            </li>
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/truemoney.png"
                alt=""
              />
            </li>
          </div>
          <li class="text-16px font-bold py-2 text-nowrap">FIND US ON</li>
          <div class="flex gap-3">
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/icon/teletegram.png"
                alt=""
              />
            </li>
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/icon/ig.png"
                alt=""
              />
            </li>
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/icon/facebook.png"
                alt=""
              />
            </li>
            <li class="text-slate-400">
              <img
                class="w-[40px] rounded-[8px]"
                src="../assets/icon/tiktok.png"
                alt=""
              />
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div> -->

  <footer class="bg-white border-t w-full">
    <div class="mx-auto w-[80%] p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <div
            href="https://flowbite.com/"
            class="flex items-center size-10 object-cover"
          >
            <img src="../assets/nubb.png" class="size-10 me-3" />
            <span
              class="self-center xl:text-2xl lg:text-2xl md:text-2xl text-16px font-semibold whitespace-nowrap"
              >NUBB E-Shop</span
            >
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li class="mb-4">
                <a href="https://flowbite.com/" class="hover:underline">{{
                  t("message.about_us")
                }}</a>
              </li>
              <li>
                <a href="https://tailwindcss.com/" class="hover:underline">
                  {{ t("message.facebook") }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li class="mb-4">
                <a
                  href="https://github.com/themesberg/flowbite"
                  class="hover:underline"
                  >{{ t("message.telegram") }}</a
                >
              </li>
              <li>
                <a
                  href="https://discord.gg/4eeurUVvTy"
                  class="hover:underline"
                  >{{ t("message.instagram") }}</a
                >
              </li>
            </ul>
          </div>
          <div>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li class="mb-4">
                <a
                  href="https://github.com/themesberg/flowbite"
                  class="hover:underline"
                  >{{ t("message.website") }}</a
                >
              </li>
            </ul>
          </div>
          <!-- <div>
            <h2 class="mb-6 text-sm font-semibold uppercase dark:text-white">
              Legal
            </h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li class="mb-4">
                <a href="#" class="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="hover:underline">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2024
          <a href="https://flowbite.com/" class="hover:underline">
            National University of Battambang
          </a>
        </span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <a href="#" class="text-gray-500 hover: dark:hover:text-white">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Facebook page</span>
          </a>
          <a href="#" class="text-gray-500 hover: dark:hover:text-white ms-5">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 21 16"
            >
              <path
                d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
              />
            </svg>
            <span class="sr-only">Discord community</span>
          </a>
          <a href="#" class="text-gray-500 hover: dark:hover:text-white ms-5">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fill-rule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Twitter page</span>
          </a>
          <a href="#" class="text-gray-500 hover: dark:hover:text-white ms-5">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">GitHub account</span>
          </a>
          <a href="#" class="text-gray-500 hover: dark:hover:text-white ms-5">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Dribbble account</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
export default {
  setup() {
    const { t, locale } = useI18n();
    const dynamicFont = computed(() => {
      switch (locale.value) {
        case "khm":
          return "font-NotoSerif";
        case "eng":
          return "font-Roboto";

        default:
          return "";
      }
    });
    const handleChangeLangue = (lang) => {
      locale.value = lang;
    };
    const toggleTranslate = (event) => {
      if (translate.value) {
        translate.value.toggle(event);
      }
    };
    return {
      t,
      locale,
      dynamicFont,
      handleChangeLangue,
      toggleTranslate,
    };
  },
};
</script>

<style></style>
