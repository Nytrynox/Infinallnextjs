import { projectId, publicAnonKey } from './supabase/info';
import { createClient } from '@supabase/supabase-js';

// Supabase Client
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-4d235f11`;

async function getHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': session ? `Bearer ${session.access_token}` : '',
  };
}

export const api = {
  getProjects: async () => {
    const headers = await getHeaders();
    if (!headers.Authorization) return [];
    try {
      const res = await fetch(`${API_BASE}/projects`, { headers });
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error("Failed to fetch projects", e);
      return [];
    }
  },
  
  saveProject: async (project: any) => {
    const headers = await getHeaders();
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify(project)
      });
      return await res.json();
    } catch (e) {
      console.error("Failed to save project", e);
      return null;
    }
  },

  getNotifications: async () => {
    const headers = await getHeaders();
    if (!headers.Authorization) return [];
    try {
      const res = await fetch(`${API_BASE}/notifications`, { headers });
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error("Failed to fetch notifications", e);
      return [];
    }
  },

  markNotificationRead: async (id: any) => {
    const headers = await getHeaders();
    try {
      await fetch(`${API_BASE}/notifications/mark-read`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ id })
      });
    } catch (e) {
      console.error("Failed to mark notification", e);
    }
  },

  getProfile: async () => {
    const headers = await getHeaders();
    if (!headers.Authorization) return null;
    try {
      const res = await fetch(`${API_BASE}/profile`, { headers });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.error("Failed to fetch profile", e);
      return null;
    }
  },

  updateProfile: async (data: any) => {
    const headers = await getHeaders();
    try {
      await fetch(`${API_BASE}/profile`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.error("Failed to update profile", e);
    }
  },

  signup: async (data: any) => {
    const headers = { 'Content-Type': 'application/json' };
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      console.error("Failed to sign up", e);
      return { error: "Network error" };
    }
  }
};
