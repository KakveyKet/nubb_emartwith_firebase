import axios from "axios";

const botToken = "7838683847:AAGTlTxOIMkT7bJ9QWqmDudNuw0lj4Pbhe8"; // Your Telegram Bot Token

// Function to send a message to a user
export const sendTelegramMessage = async (telegramUserId, message) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`; // Correct API endpoint

    try {
        const response = await axios.post(url, {
            chat_id: telegramUserId,
            text: message,
        });
        console.log("Message sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};


export const getTelegramUserId = async (telegramUserId) => {
    try {
        // Send a message to @raw_data_bot to trigger its response
        const telegramBotUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await axios.post(telegramBotUrl, {
            chat_id: telegramUserId,
            text: "/start", // Trigger the bot to respond with user info
        });

        // Assuming the bot replies with user information that includes user_id
        const userId = response.data.result.message.text; // Extract the user ID from the response
        return userId;
    } catch (error) {
        console.error('Error fetching Telegram user ID:', error);
        return null;  // Return null in case of error
    }
};