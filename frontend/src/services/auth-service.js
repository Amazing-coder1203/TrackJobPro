// 🛡️ AUTH SERVICE - The Iron Suit of Your App
// File Location: src/services/auth-service.js
// This is your centralized authentication logic

/**
 * LocalStorage Auth Service
 * Handles all user authentication operations
 */

const AUTH_STORAGE_KEYS = {
  USERS: 'job_tracker_users',
  CURRENT_USER: 'job_tracker_current_user'
};

/**
 * Initialize auth storage on app start
 * Creates default users array if it doesn't exist
 */
export const initializeAuth = () => {
  if (!localStorage.getItem(AUTH_STORAGE_KEYS.USERS)) {
    localStorage.setItem(AUTH_STORAGE_KEYS.USERS, JSON.stringify([]));
  }
};

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User full name
 * @returns {object} { success: boolean, message: string, user: object }
 */
export const registerUser = (email, password, name) => {
  try {
    // Validate inputs
    if (!email || !password || !name) {
      return {
        success: false,
        message: '❌ All fields are required!'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: '❌ Please enter a valid email address!'
      };
    }

    // Validate password strength
    if (password.length < 6) {
      return {
        success: false,
        message: '❌ Password must be at least 6 characters!'
      };
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEYS.USERS)) || [];

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return {
        success: false,
        message: '❌ Email already registered! Try logging in instead.'
      };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      password, // ⚠️ In production, NEVER store plain passwords! Use bcrypt!
      name,
      createdAt: new Date().toISOString(),
      jobApplications: [] // Store user's job apps
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem(AUTH_STORAGE_KEYS.USERS, JSON.stringify(users));

    // Auto-login after registration
    const currentUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    };
    localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));

    return {
      success: true,
      message: '🎉 Registration successful! Welcome aboard!',
      user: currentUser
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: '⚠️ Registration failed. Please try again.'
    };
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {object} { success: boolean, message: string, user: object }
 */
export const loginUser = (email, password) => {
  try {
    // Validate inputs
    if (!email || !password) {
      return {
        success: false,
        message: '❌ Email and password are required!'
      };
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEYS.USERS)) || [];

    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return {
        success: false,
        message: '❌ Invalid email or password!'
      };
    }

    // Create session (don't store password)
    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));

    return {
      success: true,
      message: `🚀 Welcome back, ${user.name}!`,
      user: currentUser
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: '⚠️ Login failed. Please try again.'
    };
  }
};

/**
 * Get current logged-in user
 * @returns {object|null} Current user or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const currentUser = localStorage.getItem(AUTH_STORAGE_KEYS.CURRENT_USER);
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in
 */
export const isUserLoggedIn = () => {
  return getCurrentUser() !== null;
};

/**
 * Logout current user
 */
export const logoutUser = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER);
  return {
    success: true,
    message: '👋 You have been logged out successfully!'
  };
};

/**
 * Get all users (for debugging only - remove in production!)
 */
export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEYS.USERS)) || [];
};

/**
 * Clear all auth data (for debugging only - remove in production!)
 */
export const clearAllAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.USERS);
  localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER);
  console.log('🧹 All auth data cleared!');
};
