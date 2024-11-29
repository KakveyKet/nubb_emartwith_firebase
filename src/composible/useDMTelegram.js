// import { projectAuth } from "@/config/config";
// import { ref, onMounted } from "vue";
// import axios from "axios";
// import { getCollectionQuery } from "./getCollection";
// const currentUser = ref(null);
// const items = ref([]);
// const fetchUser = async (field, value) => {
//     const conditions = [where(field, "==", value)];
//     await getCollectionQuery(
//         "users",
//         conditions,
//         (data) => {
//             items.value = data;
//             console.log("items", items.value);
//         },

//         true
//     );
// };
// onMounted(async () => {
//     currentUser.value = projectAuth.currentUser;
//     await fetchUser("id", currentUser.value?.uid)

// });

// // Function to send a message to a Telegram bot for the current user
// export const sendTelegramMessage = async (message) => {
//     if (!currentUser.value) {
//         console.error("No user is currently logged in.");
//         return;
//     }
//     const botToken = items.value[0]?.botToken;
//     const chatId = items.value[0]?.telegram_id;
//     if (!botToken || !chatId) {
//         console.error("Bot token or chat ID is missing.");
//         return;
//     }

//     // Construct the URL for the API request
//     const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
//     const payload = {
//         chat_id: chatId,
//         text: message, // Message to send
//     };

//     try {
//         // Send the message via axios POST request
//         const response = await axios.post(url, payload);
//         console.log("Message sent successfully:", response.data);
//     } catch (error) {
//         console.error("Error sending message:", error?.response?.data || error.message);
//     }
// };
