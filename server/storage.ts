import { type WhitelistEmail, type InsertWhitelistEmail, type SiteContent, type InsertSiteContent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Whitelist emails
  createWhitelistEmail(email: InsertWhitelistEmail): Promise<WhitelistEmail>;
  getWhitelistEmails(): Promise<WhitelistEmail[]>;
  
  // Site content
  getSiteContent(section: string): Promise<SiteContent | undefined>;
  createOrUpdateSiteContent(content: InsertSiteContent): Promise<SiteContent>;
  getAllSiteContent(): Promise<SiteContent[]>;
}

export class MemStorage implements IStorage {
  private whitelistEmails: Map<string, WhitelistEmail>;
  private siteContent: Map<string, SiteContent>;

  constructor() {
    this.whitelistEmails = new Map();
    this.siteContent = new Map();
    
    // Initialize default content
    this.initializeDefaultContent();
  }

  private async initializeDefaultContent() {
    const defaultContent = [
      {
        section: "hero",
        content: {
          title: "BridgeGas",
          tagline: "Bridging TradFi & Crypto Payment Solutions"
        }
      },
      {
        section: "about",
        content: {
          heading: "Who We Are",
          description: "BridgeGas is an innovative B2B crypto project designed to simplify the user experience when paying for gas across different blockchains. Using a network of relays and a secure bridge protocol, we enable companies to integrate our system, which helps users pay transaction fees in any supported ERC-20 token from another chain. For example, using BNB on BSC to cover USDC→ETH exchanges on Ethereum. Focusing exclusively on corporate clients, we prioritize robust security, minimal fees, and seamless integration. BridgeGas is currently in the concept development stage and is laying the technical and legal groundwork to become the preferred solution for cross-chain gas payments for enterprises worldwide.",
          mission: "",
          values: ""
        }
      },
      {
        section: "solutions",
        content: {
          heading: "Our Solutions",
          subheading: "Comprehensive crypto payment infrastructure designed for enterprise adoption and scalability",
          payment: {
            title: "Crypto Payment Gateway",
            description: "Seamlessly integrate cryptocurrency payments into your existing infrastructure with our secure, enterprise-grade gateway solution.",
            benefit: "Reduce transaction fees by up to 70% while expanding your customer base to the growing crypto economy."
          },
          bridging: {
            title: "On-chain/Off-chain Bridging",
            description: "Advanced bridging technology that connects traditional banking systems with blockchain networks for fluid value transfer.",
            benefit: "Enable instant settlements and 24/7 operations while maintaining full compatibility with existing financial workflows."
          },
          compliance: {
            title: "Enterprise-Grade Compliance",
            description: "Comprehensive regulatory compliance suite including AML/KYC, audit trails, and real-time monitoring for institutional standards.",
            benefit: "Meet regulatory requirements while accessing crypto markets with confidence and complete transparency."
          }
        }
      },
      {
        section: "team",
        content: {
          heading: "Our Team",
          subheading: "Led by experienced entrepreneurs and technical experts in fintech and blockchain technology",
          kirill: {
            name: "Kirill Shurakhtov",
            role: "Founder & CEO",
            bio: "Visionary leader with deep expertise in bridging traditional finance and blockchain technology for enterprise adoption."
          },
          footerNote: "Our team is growing—your feedback and interest will help us build out the BridgeGas leadership."
        }
      }
    ];

    for (const content of defaultContent) {
      await this.createOrUpdateSiteContent(content);
    }
  }

  async createWhitelistEmail(insertEmail: InsertWhitelistEmail): Promise<WhitelistEmail> {
    const id = randomUUID();
    const email: WhitelistEmail = {
      ...insertEmail,
      id,
      createdAt: new Date(),
    };
    this.whitelistEmails.set(id, email);
    return email;
  }

  async getWhitelistEmails(): Promise<WhitelistEmail[]> {
    return Array.from(this.whitelistEmails.values());
  }

  async getSiteContent(section: string): Promise<SiteContent | undefined> {
    return Array.from(this.siteContent.values()).find(
      (content) => content.section === section
    );
  }

  async createOrUpdateSiteContent(insertContent: InsertSiteContent): Promise<SiteContent> {
    const existing = await this.getSiteContent(insertContent.section);
    
    if (existing) {
      const updated: SiteContent = {
        ...existing,
        content: insertContent.content,
        updatedAt: new Date(),
      };
      this.siteContent.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const content: SiteContent = {
        ...insertContent,
        id,
        updatedAt: new Date(),
      };
      this.siteContent.set(id, content);
      return content;
    }
  }

  async getAllSiteContent(): Promise<SiteContent[]> {
    return Array.from(this.siteContent.values());
  }
}

export const storage = new MemStorage();
