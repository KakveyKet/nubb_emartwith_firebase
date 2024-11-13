// useDMTelegram.js
import axios from "axios";

const botToken = "7838683847:AAGTlTxOIMkT7bJ9QWqmDudNuw0lj4Pbhe8";
const chatId = "899957340"; // Replace with your group/channel chat ID or @username

// Function to send a message to Telegram
export const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
        const response = await axios.post(url, {
            chat_id: chatId,
            text: message,
        });
        console.log("Message sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending message:", error?.response?.data);
    }
};
