import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsletterSubscriberSchema,
  insertQuizSubmissionSchema,
  insertContactMessageSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import Stripe from "stripe";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing required Stripe secret: STRIPE_SECRET_KEY');
  }
  const stripe = process.env.STRIPE_SECRET_KEY ? 
    new Stripe(process.env.STRIPE_SECRET_KEY) : 
    null;
    
  // Set up API routes with '/api' prefix
  
  // Newsletter subscription endpoint
  app.post('/api/newsletter/subscribe', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const subscriberData = insertNewsletterSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getNewsletterSubscriberByEmail(subscriberData.email);
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      
      // Create new subscriber
      const newSubscriber = await storage.createNewsletterSubscriber(subscriberData);
      
      res.status(201).json({
        message: "Successfully subscribed to newsletter",
        subscriber: newSubscriber
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });
  
  // Quiz submission endpoint
  app.post('/api/quiz/submit', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const submissionData = insertQuizSubmissionSchema.parse(req.body);
      
      // Store quiz submission
      const submission = await storage.createQuizSubmission(submissionData);
      
      res.status(201).json({
        message: "Quiz submission recorded",
        submission: submission,
        isCorrect: submission.isCorrect
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: "Failed to submit quiz answer" });
    }
  });
  
  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const messageData = insertContactMessageSchema.parse(req.body);
      
      // Store contact message
      const message = await storage.createContactMessage(messageData);
      
      res.status(201).json({
        message: "Contact message sent successfully",
        contactMessage: message
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });
  
  // Endpoint to get quiz statistics (for showing how many users played)
  app.get('/api/quiz/stats', async (_req: Request, res: Response) => {
    try {
      const submissions = await storage.getQuizSubmissions();
      const totalSubmissions = submissions.length;
      
      // Count correct answers and percentage
      const correctSubmissions = submissions.filter(sub => sub.isCorrect).length;
      const correctPercentage = totalSubmissions > 0 
        ? Math.round((correctSubmissions / totalSubmissions) * 100) 
        : 0;
      
      res.status(200).json({
        totalSubmissions,
        correctSubmissions,
        correctPercentage
      });
    } catch (error: unknown) {
      res.status(500).json({ message: "Failed to get quiz statistics" });
    }
  });
  
  // Stripe payment intent creation endpoint
  app.post('/api/create-payment-intent', async (req: Request, res: Response) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe is not configured" });
      }
      
      const { amount, currency = "eur" } = req.body;
      
      if (!amount || isNaN(amount)) {
        return res.status(400).json({ message: "Valid amount is required" });
      }
      
      // Convert amount to cents for Stripe (e.g., €15.99 becomes 1599)
      const amountInCents = Math.round(amount * 100);
      
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        // Add additional data like items, shipping info if needed
        metadata: {
          source: "Serie A Insider Shop"
        },
      });
      
      // Send the client secret to the client
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error('Payment intent error:', error);
      res.status(500).json({ 
        message: "Error creating payment intent", 
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
