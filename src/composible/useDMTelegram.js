const TelegramBot = require("node-telegram-bot-api");
const { getFirestore, doc, getDoc } = require("firebase/firestore");

const db = getFirestore();

const getTelegramBotToken = async () => {
    const settingsDoc = await getDoc(doc(db, "settings", "telegramBotToken"));
    if (settingsDoc.exists()) {
        return settingsDoc.data().telegramBotToken;
    } else {
        throw new Error("Telegram Bot Token not found in Firestore.");
    }
};

// Example usage
const startBot = async () => {
    try {
        const botToken = await getTelegramBotToken();
        const bot = new TelegramBot(botToken, { polling: true });

        bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, "Welcome to the Telegram bot!");
        });
    } catch (error) {
        console.error("Error starting bot:", error);
    }
};

startBot();
