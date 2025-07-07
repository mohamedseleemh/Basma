import { db } from './db';
import {
  users,
  profiles,
  services,
  testimonials,
  gallery_items,
  site_settings,
  bookings,
  type User,
  type InsertUser,
  type Profile,
  type InsertProfile,
  type Service,
  type InsertService,
  type Testimonial,
  type InsertTestimonial,
  type GalleryItem,
  type InsertGalleryItem,
  type SiteSetting,
  type InsertSiteSetting,
  type Booking,
  type InsertBooking,
} from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile>;

  // Services
  getServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, updates: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<void>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, updates: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;

  // Gallery Items
  getGalleryItems(): Promise<GalleryItem[]>;
  getActiveGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: string): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: string, updates: Partial<InsertGalleryItem>): Promise<GalleryItem>;
  deleteGalleryItem(id: string): Promise<void>;

  // Site Settings
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  updateSiteSetting(key: string, value: any): Promise<SiteSetting>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking>;
  deleteBooking(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Profiles
  async getProfile(userId: string): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.user_id, userId)).limit(1);
    return result[0];
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const result = await db.insert(profiles).values(profile).returning();
    return result[0];
  }

  async updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile> {
    const result = await db
      .update(profiles)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(profiles.user_id, userId))
      .returning();
    return result[0];
  }

  // Services
  async getServices(): Promise<Service[]> {
    return db.select().from(services).orderBy(desc(services.sort_order));
  }

  async getActiveServices(): Promise<Service[]> {
    return db
      .select()
      .from(services)
      .where(eq(services.is_active, true))
      .orderBy(desc(services.sort_order));
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service> {
    const result = await db
      .update(services)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }

  async deleteService(id: string): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(desc(testimonials.sort_order));
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.is_active, true))
      .orderBy(desc(testimonials.sort_order));
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    return result[0];
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  async updateTestimonial(id: string, updates: Partial<InsertTestimonial>): Promise<Testimonial> {
    const result = await db
      .update(testimonials)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return result[0];
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Gallery Items
  async getGalleryItems(): Promise<GalleryItem[]> {
    return db.select().from(gallery_items).orderBy(desc(gallery_items.sort_order));
  }

  async getActiveGalleryItems(): Promise<GalleryItem[]> {
    return db
      .select()
      .from(gallery_items)
      .where(eq(gallery_items.is_active, true))
      .orderBy(desc(gallery_items.sort_order));
  }

  async getGalleryItem(id: string): Promise<GalleryItem | undefined> {
    const result = await db.select().from(gallery_items).where(eq(gallery_items.id, id)).limit(1);
    return result[0];
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const result = await db.insert(gallery_items).values(item).returning();
    return result[0];
  }

  async updateGalleryItem(id: string, updates: Partial<InsertGalleryItem>): Promise<GalleryItem> {
    const result = await db
      .update(gallery_items)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(gallery_items.id, id))
      .returning();
    return result[0];
  }

  async deleteGalleryItem(id: string): Promise<void> {
    await db.delete(gallery_items).where(eq(gallery_items.id, id));
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSetting[]> {
    return db.select().from(site_settings);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const result = await db.select().from(site_settings).where(eq(site_settings.key, key)).limit(1);
    return result[0];
  }

  async updateSiteSetting(key: string, value: any): Promise<SiteSetting> {
    const result = await db
      .update(site_settings)
      .set({ value, updated_at: new Date() })
      .where(eq(site_settings.key, key))
      .returning();
    return result[0];
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.created_at));
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking> {
    const [booking] = await db
      .update(bookings)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async deleteBooking(id: string): Promise<void> {
    await db.delete(bookings).where(eq(bookings.id, id));
  }
}

export const storage = new DatabaseStorage();
