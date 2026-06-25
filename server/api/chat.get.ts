import { defineEventHandler, getQuery } from 'h3';
import fileHandling from '../../utils/fileHandling';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const chatId = query.id;

    if (!chatId) {
      return {
        error: 'Chat ID is required'
      };
    }

    // Load chats from data/chat.json
    const chats = fileHandling('chat') || {};
    
    // Retrieve messages list for the specified chatId
    const messages = chats[chatId as string] || [];

    return messages;
  } catch (error: any) {
    return {
      error: error.message || 'Internal server error'
    };
  }
});
