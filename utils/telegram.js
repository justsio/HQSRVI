import axios from 'axios';

export const sendToTelegram = async (message, copyText) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram Error: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return false;
  }

  const text = message.trim();
  const textToCopy = (copyText || text).trim();

  const payload = {
    chat_id: chatId,
    text,
  };

  if (textToCopy) {
    payload.reply_markup = {
      inline_keyboard: [
        [
          {
            text: '📋 نسخ',
            copy_text: { text: textToCopy.slice(0, 256) },
          },
        ],
      ],
    };
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      payload
    );
    return true;
  } catch (error) {
    console.error('Telegram Error:', error?.response?.data || error.message);
    return false;
  }
};
