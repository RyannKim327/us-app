import { defineEventHandler, readBody } from 'h3';
import fileHandling from '../../utils/fileHandling';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    if (!body || !body.username || !body.password) {
      return {
        error: 'Username and password are required'
      };
    }

    const { username, password, avatar } = body;
    
    // Load existing users
    const users = fileHandling('users') || {};
    
    // Check if the user already exists
    if (users[username]) {
      return {
        error: 'Account might be registered already'
      };
    }
    
    // Register the new user
    users[username] = {
      username,
      password,
      avatar: avatar || '🦊'
    };
    
    // Save updated users
    fileHandling('users', users);
    
    return {
      success: true,
      username,
      avatar: avatar || '🦊'
    };
  } catch (error: any) {
    return {
      error: error.message || 'Internal server error'
    };
  }
});   
