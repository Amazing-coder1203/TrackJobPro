// 🛡️ AUTH SERVICE - The Supabase Edition
// File Location: src/services/auth-service.js

import { supabase } from '../supabaseClient';

const AUTH_STORAGE_KEYS = {
  CURRENT_USER: 'job_tracker_current_user'
};

/**
 * Initialize auth (placeholder for Supabase setup)
 */
export const initializeAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const userData = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata.full_name || 'User'
    };
    localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER);
  }
};

/**
 * Register a new user
 */
export const registerUser = async (email, password, name) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error) throw error;

    // Supabase might require email confirmation depending on settings
    // If confirmation is off, data.user will exist
    if (data.user) {
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: name
      };
      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
      return { success: true, message: '🎉 Registration successful!', user: userData };
    }

    return { success: true, message: '📧 Please check your email to confirm registration!' };
  } catch (error) {
    return { success: false, message: `❌ ${error.message}` };
  }
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.full_name || 'User'
      };
      localStorage.setItem(AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
      return { success: true, message: '🚀 Login successful!', user: userData };
    }
  } catch (error) {
    return { success: false, message: `❌ ${error.message}` };
  }
};

/**
 * Get current logged-in user (Synchronous from localStorage for UI)
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

/**
 * Check if user is logged in
 */
export const isUserLoggedIn = () => {
  return getCurrentUser() !== null;
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem(AUTH_STORAGE_KEYS.CURRENT_USER);
  return { success: true, message: '👋 Logged out!' };
};
