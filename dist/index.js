var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  bookings: () => bookings,
  gallery_items: () => gallery_items,
  insertBookingSchema: () => insertBookingSchema,
  insertGalleryItemSchema: () => insertGalleryItemSchema,
  insertProfileSchema: () => insertProfileSchema,
  insertServiceSchema: () => insertServiceSchema,
  insertSiteSettingsSchema: () => insertSiteSettingsSchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  insertUserSchema: () => insertUserSchema,
  profiles: () => profiles,
  services: () => services,
  site_settings: () => site_settings,
  testimonials: () => testimonials,
  users: () => users
});
import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  uuid,
  timestamp,
  jsonb
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull().unique(),
  full_name: text("full_name"),
  role: text("role").default("user"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});
var site_settings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});
var services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  features: text("features").array(),
  is_active: boolean("is_active").default(true),
  sort_order: integer("sort_order").default(0),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});
var testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  rating: integer("rating"),
  is_active: boolean("is_active").default(true),
  sort_order: integer("sort_order").default(0),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});
var gallery_items = pgTable("gallery_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title"),
  image_url: text("image_url").notNull(),
  description: text("description"),
  is_active: boolean("is_active").default(true),
  sort_order: integer("sort_order").default(0),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});
var bookings = pgTable("bookings", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: integer("guests").notNull().default(1),
  special_requests: text("special_requests"),
  status: text("status").default("pending"),
  // pending, confirmed, cancelled
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at").default(sql`now()`)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertProfileSchema = createInsertSchema(profiles).pick({
  user_id: true,
  full_name: true,
  role: true
});
var insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  icon: true,
  features: true,
  is_active: true,
  sort_order: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  content: true,
  rating: true,
  is_active: true,
  sort_order: true
});
var insertGalleryItemSchema = createInsertSchema(gallery_items).pick({
  title: true,
  image_url: true,
  description: true,
  is_active: true,
  sort_order: true
});
var insertSiteSettingsSchema = createInsertSchema(site_settings).pick({
  key: true,
  value: true
});
var insertBookingSchema = createInsertSchema(bookings).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  date: true,
  time: true,
  guests: true,
  special_requests: true,
  status: true
});

// server/db.ts
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // Users
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }
  async createUser(insertUser) {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  // Profiles
  async getProfile(userId) {
    const result = await db.select().from(profiles).where(eq(profiles.user_id, userId)).limit(1);
    return result[0];
  }
  async createProfile(profile) {
    const result = await db.insert(profiles).values(profile).returning();
    return result[0];
  }
  async updateProfile(userId, updates) {
    const result = await db.update(profiles).set({ ...updates, updated_at: /* @__PURE__ */ new Date() }).where(eq(profiles.user_id, userId)).returning();
    return result[0];
  }
  // Services
  async getServices() {
    return db.select().from(services).orderBy(desc(services.sort_order));
  }
  async getActiveServices() {
    return db.select().from(services).where(eq(services.is_active, true)).orderBy(desc(services.sort_order));
  }
  async getService(id) {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }
  async createService(service) {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }
  async updateService(id, updates) {
    const result = await db.update(services).set({ ...updates, updated_at: /* @__PURE__ */ new Date() }).where(eq(services.id, id)).returning();
    return result[0];
  }
  async deleteService(id) {
    await db.delete(services).where(eq(services.id, id));
  }
  // Testimonials
  async getTestimonials() {
    return db.select().from(testimonials).orderBy(desc(testimonials.sort_order));
  }
  async getActiveTestimonials() {
    return db.select().from(testimonials).where(eq(testimonials.is_active, true)).orderBy(desc(testimonials.sort_order));
  }
  async getTestimonial(id) {
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    return result[0];
  }
  async createTestimonial(testimonial) {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }
  async updateTestimonial(id, updates) {
    const result = await db.update(testimonials).set({ ...updates, updated_at: /* @__PURE__ */ new Date() }).where(eq(testimonials.id, id)).returning();
    return result[0];
  }
  async deleteTestimonial(id) {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }
  // Gallery Items
  async getGalleryItems() {
    return db.select().from(gallery_items).orderBy(desc(gallery_items.sort_order));
  }
  async getActiveGalleryItems() {
    return db.select().from(gallery_items).where(eq(gallery_items.is_active, true)).orderBy(desc(gallery_items.sort_order));
  }
  async getGalleryItem(id) {
    const result = await db.select().from(gallery_items).where(eq(gallery_items.id, id)).limit(1);
    return result[0];
  }
  async createGalleryItem(item) {
    const result = await db.insert(gallery_items).values(item).returning();
    return result[0];
  }
  async updateGalleryItem(id, updates) {
    const result = await db.update(gallery_items).set({ ...updates, updated_at: /* @__PURE__ */ new Date() }).where(eq(gallery_items.id, id)).returning();
    return result[0];
  }
  async deleteGalleryItem(id) {
    await db.delete(gallery_items).where(eq(gallery_items.id, id));
  }
  // Site Settings
  async getSiteSettings() {
    return db.select().from(site_settings);
  }
  async getSiteSetting(key) {
    const result = await db.select().from(site_settings).where(eq(site_settings.key, key)).limit(1);
    return result[0];
  }
  async updateSiteSetting(key, value) {
    const result = await db.update(site_settings).set({ value, updated_at: /* @__PURE__ */ new Date() }).where(eq(site_settings.key, key)).returning();
    return result[0];
  }
  // Bookings
  async getBookings() {
    return await db.select().from(bookings).orderBy(desc(bookings.created_at));
  }
  async getBooking(id) {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || void 0;
  }
  async createBooking(booking) {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }
  async updateBooking(id, updates) {
    const [booking] = await db.update(bookings).set({ ...updates, updated_at: /* @__PURE__ */ new Date() }).where(eq(bookings.id, id)).returning();
    return booking;
  }
  async deleteBooking(id) {
    await db.delete(bookings).where(eq(bookings.id, id));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/services", async (req, res) => {
    try {
      const services2 = await storage.getActiveServices();
      res.json(services2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });
  app2.get("/api/admin/services", async (req, res) => {
    try {
      const services2 = await storage.getServices();
      res.json(services2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });
  app2.post("/api/admin/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data" });
    }
  });
  app2.put("/api/admin/services/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, validatedData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Failed to update service" });
    }
  });
  app2.delete("/api/admin/services/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteService(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getActiveTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/admin/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });
  app2.post("/api/admin/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });
  app2.put("/api/admin/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, validatedData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Failed to update testimonial" });
    }
  });
  app2.delete("/api/admin/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });
  app2.get("/api/gallery", async (req, res) => {
    try {
      const items = await storage.getActiveGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });
  app2.get("/api/admin/gallery", async (req, res) => {
    try {
      const items = await storage.getGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });
  app2.post("/api/admin/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid gallery item data" });
    }
  });
  app2.put("/api/admin/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertGalleryItemSchema.partial().parse(req.body);
      const item = await storage.updateGalleryItem(id, validatedData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Failed to update gallery item" });
    }
  });
  app2.delete("/api/admin/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteGalleryItem(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery item" });
    }
  });
  app2.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site settings" });
    }
  });
  app2.put("/api/admin/settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const setting = await storage.updateSiteSetting(key, value);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: "Failed to update setting" });
    }
  });
  app2.get("/api/bookings", async (req, res) => {
    try {
      const bookings2 = await storage.getBookings();
      res.json(bookings2);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });
  app2.get("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = req.body;
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });
  app2.put("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const booking = await storage.updateBooking(id, updates);
      res.json(booking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  });
  app2.delete("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBooking(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [await import("@replit/vite-plugin-cartographer").then((m) => m.cartographer())] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(import.meta.dirname, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
