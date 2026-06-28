import { ref, computed } from 'vue'

export interface User {
  id: string
  username: string
  email: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  statusText?: string
}

export interface Channel {
  id: string
  name: string
  description: string
  type: 'global' | 'group'
  createdById?: string
  createdAt: string
  memberCount: number
}

export interface Message {
  id: string
  channelId: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string // ISO string
  isSystem?: boolean
}

// Seed mock data if not in localStorage
const MOCK_USERS: User[] = [
  { id: 'u1', username: 'Sarah Connor', email: 'sarah@usapp.io', avatar: '👩‍💻', status: 'online', statusText: 'Coding in Vue...' },
  { id: 'u2', username: 'Neo', email: 'neo@usapp.io', avatar: '🕶️', status: 'online', statusText: 'Follow the white rabbit' },
  { id: 'u3', username: 'Jarvis', email: 'jarvis@usapp.io', avatar: '🤖', status: 'online', statusText: 'At your service.' },
  { id: 'u4', username: 'Penny', email: 'penny@usapp.io', avatar: '🥯', status: 'away', statusText: 'Baking some bread' },
]

const MOCK_CHANNELS: Channel[] = [
  { id: 'global', name: 'Global Chat', description: 'The main lobby for everyone to hang out and talk about anything.', type: 'global', createdAt: new Date().toISOString(), memberCount: 5 },
  { id: 'tech-talk', name: 'Tech Talk', description: 'Share coding tips, framework debates, and the future of AI.', type: 'group', createdAt: new Date().toISOString(), memberCount: 3 },
  { id: 'gaming', name: 'Gaming Zone', description: 'Co-op match making, speedruns, and game recommendations.', type: 'group', createdAt: new Date().toISOString(), memberCount: 2 }
]

const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    channelId: 'global',
    senderId: 'system',
    senderName: 'System',
    senderAvatar: '⚙️',
    content: 'Welcome to UsApp! Feel free to chat here or join/create custom groups in the sidebar.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isSystem: true
  },
  {
    id: 'm2',
    channelId: 'global',
    senderId: 'u3',
    senderName: 'Jarvis',
    senderAvatar: '🤖',
    content: 'Hello everyone! I am Jarvis, a simulated assistant here to keep you company.',
    timestamp: new Date(Date.now() - 3600000 * 1.8).toISOString()
  },
  {
    id: 'm3',
    channelId: 'global',
    senderId: 'u1',
    senderName: 'Sarah Connor',
    senderAvatar: '👩‍💻',
    content: 'Hey Jarvis! Working on a new Vue web application today. The client-side state is running beautifully.',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString()
  },
  {
    id: 'm4',
    channelId: 'tech-talk',
    senderId: 'u1',
    senderName: 'Sarah Connor',
    senderAvatar: '👩‍💻',
    content: 'Vue 3 composition API combined with Tailwind CSS makes prototyping super fast.',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'm5',
    channelId: 'tech-talk',
    senderId: 'u2',
    senderName: 'Neo',
    senderAvatar: '🕶️',
    content: 'Indeed. It feels like bending the rules of the Matrix.',
    timestamp: new Date(Date.now() - 3600000 * 2.8).toISOString()
  }
]

export const useChat = () => {
  const currentUser = ref<User | null>(null)
  const channels = ref<Channel[]>([])
  const messages = ref<Message[]>([])
  const activeChannelId = ref<string>('global')
  const onlineUsers = ref<User[]>([])

  // Load from LocalStorage
  const initializeState = () => {
    if (typeof window === 'undefined') return

    // 1. Get users
    const storedUsers = localStorage.getItem('usapp_users')
    if (!storedUsers) {
      localStorage.setItem('usapp_users', JSON.stringify(MOCK_USERS))
    }

    // 2. Get channels
    const storedChannels = localStorage.getItem('usapp_channels')
    if (storedChannels) {
      channels.value = JSON.parse(storedChannels)
    } else {
      channels.value = MOCK_CHANNELS
      localStorage.setItem('usapp_channels', JSON.stringify(MOCK_CHANNELS))
    }

    // 3. Get messages
    const storedMessages = localStorage.getItem('usapp_messages')
    if (storedMessages) {
      messages.value = JSON.parse(storedMessages)
    } else {
      messages.value = MOCK_MESSAGES
      localStorage.setItem('usapp_messages', JSON.stringify(MOCK_MESSAGES))
    }

    // 4. Get active user session
    const storedActiveUser = localStorage.getItem('usapp_active_user')
    if (storedActiveUser) {
      currentUser.value = JSON.parse(storedActiveUser)
    }

    // 5. Populate online users (mock users + current user if logged in)
    const allUsers: User[] = JSON.parse(localStorage.getItem('usapp_users') || '[]')
    onlineUsers.value = allUsers.filter(u => u.id !== currentUser.value?.id)
  }

  // Save specific datasets to localStorage
  const saveChannels = () => {
    localStorage.setItem('usapp_channels', JSON.stringify(channels.value))
  }

  const saveMessages = () => {
    localStorage.setItem('usapp_messages', JSON.stringify(messages.value))
  }

  // Actions
  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('usapp_users') || '[]')
    const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!foundUser) {
      return { success: false, error: 'User with this email not found. Please register first!' }
    }

    // Update status to online
    foundUser.status = 'online'
    currentUser.value = foundUser
    localStorage.setItem('usapp_active_user', JSON.stringify(foundUser))

    // Update in all users
    const updatedUsers = allUsers.map(u => u.id === foundUser.id ? foundUser : u)
    localStorage.setItem('usapp_users', JSON.stringify(updatedUsers))

    // Refresh online list
    onlineUsers.value = updatedUsers.filter(u => u.id !== foundUser.id)

    return { success: true }
  }

  const register = (username: string, email: string, avatar: string): { success: boolean; error?: string } => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('usapp_users') || '[]')
    
    // Check if email already exists
    if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email is already registered.' }
    }
    // Check if username already exists
    if (allUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Username is already taken.' }
    }

    const newUser: User = {
      id: 'u_' + Date.now(),
      username,
      email,
      avatar,
      status: 'online',
      statusText: 'Hey there! I am using UsApp.'
    }

    allUsers.push(newUser)
    localStorage.setItem('usapp_users', JSON.stringify(allUsers))

    // Auto login
    currentUser.value = newUser
    localStorage.setItem('usapp_active_user', JSON.stringify(newUser))

    // Refresh online list
    onlineUsers.value = allUsers.filter(u => u.id !== newUser.id)

    // Add join message to Global Chat
    addSystemMessage('global', `${username} has joined the workspace! Welcome! 👋`)

    return { success: true }
  }

  const logout = () => {
    if (currentUser.value) {
      const allUsers: User[] = JSON.parse(localStorage.getItem('usapp_users') || '[]')
      const updatedUsers = allUsers.map(u => {
        if (u.id === currentUser.value?.id) {
          return { ...u, status: 'offline' as const }
        }
        return u
      })
      localStorage.setItem('usapp_users', JSON.stringify(updatedUsers))
    }

    currentUser.value = null
    localStorage.removeItem('usapp_active_user')
    activeChannelId.value = 'global'
  }

  const sendMessage = (channelId: string, content: string) => {
    if (!currentUser.value) return

    const newMessage: Message = {
      id: 'm_' + Date.now(),
      channelId,
      senderId: currentUser.value.id,
      senderName: currentUser.value.username,
      senderAvatar: currentUser.value.avatar,
      content,
      timestamp: new Date().toISOString()
    }

    messages.value.push(newMessage)
    saveMessages()

    // Trigger mock response after a delay
    triggerMockResponse(channelId, content)
  }

  const addSystemMessage = (channelId: string, content: string) => {
    const newMessage: Message = {
      id: 'm_sys_' + Date.now(),
      channelId,
      senderId: 'system',
      senderName: 'System',
      senderAvatar: '⚙️',
      content,
      timestamp: new Date().toISOString(),
      isSystem: true
    }
    messages.value.push(newMessage)
    saveMessages()
  }

  const createChannel = (name: string, description: string): Channel => {
    const cleanName = name.trim().startsWith('#') ? name.trim() : `# ${name.trim()}`
    const newChannel: Channel = {
      id: 'chan_' + Date.now(),
      name: cleanName,
      description: description || 'No description provided.',
      type: 'group',
      createdById: currentUser.value?.id || 'system',
      createdAt: new Date().toISOString(),
      memberCount: 1
    }

    channels.value.push(newChannel)
    saveChannels()

    // Add system message about channel creation
    addSystemMessage(newChannel.id, `${currentUser.value?.username || 'Someone'} created this channel: "${name}". Welcome! 🎉`)

    // Select this channel
    activeChannelId.value = newChannel.id

    // Trigger initial bot greeting in the group
    setTimeout(() => {
      const bots = onlineUsers.value.filter(u => u.id.startsWith('u')) // u1, u2, u3 are seed bots
      if (bots.length > 0) {
        const randomBot = bots[Math.floor(Math.random() * bots.length)]
        const welcomeMessage: Message = {
          id: 'm_bot_' + Date.now(),
          channelId: newChannel.id,
          senderId: randomBot.id,
          senderName: randomBot.username,
          senderAvatar: randomBot.avatar,
          content: `Awesome! Thanks for creating ${name}. Let's see what this space is about! 💡`,
          timestamp: new Date().toISOString()
        }
        messages.value.push(welcomeMessage)
        saveMessages()
      }
    }, 1200)

    return newChannel
  }

  // Active channel helper
  const activeChannel = computed(() => {
    return channels.value.find(c => c.id === activeChannelId.value) || channels.value[0]
  })

  // Messages in active channel
  const activeChannelMessages = computed(() => {
    return messages.value.filter(m => m.channelId === activeChannelId.value)
  })

  // Simulation Bot Response
  const triggerMockResponse = (channelId: string, userMessage: string) => {
    if (typeof window === 'undefined') return

    const bots = onlineUsers.value.filter(u => ['u1', 'u2', 'u3', 'u4'].includes(u.id))
    if (bots.length === 0) return

    const randomBot = bots[Math.floor(Math.random() * bots.length)]

    setTimeout(() => {
      let replyContent = ''
      const lowerMsg = userMessage.toLowerCase()

      if (channelId === 'global') {
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg.includes('hey')) {
          replyContent = `Hey ${currentUser.value?.username || 'there'}! Hope you are having a fantastic day! What are you working on? 😊`
        } else if (lowerMsg.includes('how are you')) {
          replyContent = `I am doing great, just chatting around! Thanks for asking. How about yourself?`
        } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodnight')) {
          replyContent = `Catch you later! Have a good one! 👋`
        } else {
          const generalReplies = [
            `That's interesting! Tell me more about it.`,
            `Ah, I see! Very cool.`,
            `UsApp feels so responsive, don't you think? Love the sidebar styling.`,
            `Wait, did you see the group chat creator? It updates instantly!`,
            `Haha, true! 😂`,
            `Let's invite some more people to check out this awesome UI.`
          ]
          replyContent = generalReplies[Math.floor(Math.random() * generalReplies.length)]
        }
      } else if (channelId === 'tech-talk') {
        if (lowerMsg.includes('vue') || lowerMsg.includes('nuxt')) {
          replyContent = `Nuxt SSR and hybrid rendering is such a game changer. The folder-based routing makes pages a breeze.`
        } else if (lowerMsg.includes('tailwind') || lowerMsg.includes('css')) {
          replyContent = `Tailwind is perfect for prototyping. Customizing with classes like backdrop-blur and border-white/20 is clean.`
        } else if (lowerMsg.includes('react') || lowerMsg.includes('angular')) {
          replyContent = `Vue's reactivity system (using Proxies) is so intuitive. Once you use computed() and watch(), you can't go back!`
        } else {
          const techReplies = [
            `Have you tried using the new CSS container queries? They are widely supported now.`,
            `Local state management with Composition API is super lightweight for chat apps.`,
            `Clean code is self-documenting code. That's why we structure composables nicely!`,
            `I've been playing around with Vite, it's blazing fast.`
          ]
          replyContent = techReplies[Math.floor(Math.random() * techReplies.length)]
        }
      } else {
        replyContent = `Hey, this custom channel ${activeChannel.value?.name || 'group'} is nice! Glad to be here with you.`
      }

      const botMessage: Message = {
        id: 'm_reply_' + Date.now(),
        channelId,
        senderId: randomBot.id,
        senderName: randomBot.username,
        senderAvatar: randomBot.avatar,
        content: replyContent,
        timestamp: new Date().toISOString()
      }

      messages.value.push(botMessage)
      saveMessages()
    }, 1500)
  }

  // Initialize on composable creation
  initializeState()

  return {
    currentUser,
    channels,
    messages,
    activeChannelId,
    onlineUsers,
    activeChannel,
    activeChannelMessages,
    login,
    register,
    logout,
    sendMessage,
    createChannel,
    initializeState
  }
}
