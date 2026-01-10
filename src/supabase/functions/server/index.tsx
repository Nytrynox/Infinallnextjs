import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Auth Helper
async function getUser(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  if (!token) return null;

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

// Health check
app.get("/make-server-4d235f11/health", (c) => {
  return c.json({ status: "ok" });
});

// --- Projects Routes ---

app.get("/make-server-4d235f11/projects", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  // Use prefix: user:{id}:project
  const entries = await kv.getByPrefix(`user:${user.id}:project`);
  const projects = entries.map(e => e.value);
  
  // Sort by updatedAt desc
  projects.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return c.json(projects);
});

app.post("/make-server-4d235f11/projects", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const project = await c.req.json();
  if (!project.id) return c.json({ error: "Project ID required" }, 400);

  // Save project
  const key = `user:${user.id}:project:${project.id}`;
  await kv.set(key, { ...project, userId: user.id });

  return c.json({ success: true, project });
});

// --- Notifications Routes ---

app.get("/make-server-4d235f11/notifications", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const entries = await kv.getByPrefix(`user:${user.id}:notification`);
  const notifications = entries.map(e => e.value);
  
  // Sort by created time desc
  notifications.sort((a: any, b: any) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime());

  return c.json(notifications);
});

app.post("/make-server-4d235f11/notifications/mark-read", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const { id } = await c.req.json();
  const key = `user:${user.id}:notification:${id}`;
  
  // Get existing
  const existing = await kv.get(key);
  if (existing) {
    await kv.set(key, { ...existing, read: true });
  }

  return c.json({ success: true });
});

// --- Profile Routes ---

app.get("/make-server-4d235f11/profile", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const profile = await kv.get(`user:${user.id}:profile`);
  return c.json(profile || { 
    displayName: user.user_metadata?.full_name || user.email?.split('@')[0], 
    email: user.email,
    theme: 'dark' 
  });
});

app.post("/make-server-4d235f11/profile", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const data = await c.req.json();
  const key = `user:${user.id}:profile`;
  await kv.set(key, { ...data, email: user.email }); // Ensure email matches auth

  return c.json({ success: true });
});

// --- Auth Routes ---

app.post("/make-server-4d235f11/signup", async (c) => {
  const { email, password, name } = await c.req.json();
  
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name: name },
    email_confirm: true
  });

  if (error) return c.json({ error: error.message }, 400);
  return c.json({ success: true, user: data.user });
});

Deno.serve(app.fetch);