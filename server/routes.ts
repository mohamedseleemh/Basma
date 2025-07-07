import type { Express } from 'express';
import { createServer, type Server } from 'http';
import { storage } from './storage';
import {
  insertServiceSchema,
  insertTestimonialSchema,
  insertGalleryItemSchema,
  insertSiteSettingsSchema,
} from '@shared/schema';

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getActiveServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  app.get('/api/admin/services', async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  app.post('/api/admin/services', async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: 'Invalid service data' });
    }
  });

  app.put('/api/admin/services/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, validatedData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update service' });
    }
  });

  app.delete('/api/admin/services/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteService(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  // Testimonials routes
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  app.get('/api/admin/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  app.post('/api/admin/testimonials', async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: 'Invalid testimonial data' });
    }
  });

  app.put('/api/admin/testimonials/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, validatedData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update testimonial' });
    }
  });

  app.delete('/api/admin/testimonials/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete testimonial' });
    }
  });

  // Gallery routes
  app.get('/api/gallery', async (req, res) => {
    try {
      const items = await storage.getActiveGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch gallery items' });
    }
  });

  app.get('/api/admin/gallery', async (req, res) => {
    try {
      const items = await storage.getGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch gallery items' });
    }
  });

  app.post('/api/admin/gallery', async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: 'Invalid gallery item data' });
    }
  });

  app.put('/api/admin/gallery/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertGalleryItemSchema.partial().parse(req.body);
      const item = await storage.updateGalleryItem(id, validatedData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update gallery item' });
    }
  });

  app.delete('/api/admin/gallery/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteGalleryItem(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete gallery item' });
    }
  });

  // Site settings routes
  app.get('/api/settings', async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch site settings' });
    }
  });

  app.put('/api/admin/settings/:key', async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const setting = await storage.updateSiteSetting(key, value);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update setting' });
    }
  });

  // Booking endpoints
  app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  app.get('/api/bookings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ error: 'Failed to fetch booking' });
    }
  });

  app.post('/api/bookings', async (req, res) => {
    try {
      const bookingData = req.body;
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  app.put('/api/bookings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const booking = await storage.updateBooking(id, updates);
      res.json(booking);
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  });

  app.delete('/api/bookings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBooking(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'Failed to delete booking' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
