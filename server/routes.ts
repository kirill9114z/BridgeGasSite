import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWhitelistEmailSchema, insertSiteContentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Whitelist email submission
  app.post("/api/whitelist", async (req, res) => {
    try {
      const { email } = insertWhitelistEmailSchema.parse(req.body);
      
      // Check if email already exists
      const existingEmails = await storage.getWhitelistEmails();
      const emailExists = existingEmails.some(e => e.email === email);
      
      if (emailExists) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const newEmail = await storage.createWhitelistEmail({ email });
      res.status(201).json({ message: "Successfully added to whitelist", email: newEmail });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email format", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all whitelist emails (for admin purposes) - requires password
  app.get("/api/whitelist", async (req, res) => {
    try {
      const { password } = req.query;
      
      if (!password || password !== "172374") {
        return res.status(401).json({ 
          message: "Access denied. Password required to view whitelist emails." 
        });
      }
      
      const emails = await storage.getWhitelistEmails();
      res.json(emails);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get site content
  app.get("/api/content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const content = await storage.getSiteContent(section);
      
      if (!content) {
        return res.status(404).json({ message: "Content section not found" });
      }
      
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update site content
  app.put("/api/content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const contentData = insertSiteContentSchema.parse({
        section,
        content: req.body.content
      });
      
      const updatedContent = await storage.createOrUpdateSiteContent(contentData);
      res.json(updatedContent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content format", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all site content
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getAllSiteContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
