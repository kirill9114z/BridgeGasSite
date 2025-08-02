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
            title: "Improved user experience",
            description: "Paying gas fees with different tokens on different networks can be a real headache — multiple wallets, asset conversions, and high on-chain fees slow down business processes. With BridgeGas, users get a truly unified payment flow: choose any supported ERC-20 token on any network, and our relay bridge system will automatically handle the conversion and settlement.",
            benefit: "This eliminates the need for manual exchanges, reduces the number of transaction steps by 100%, and provides a seamless experience — no more 'wallet juggling' or unexpected fees."
          },
          bridging: {
            title: "Plug-and-Play Integration",
            description: "Traditional businesses need solutions that slot effortlessly into existing infrastructure. BridgeGas offers a lightweight, developer-friendly SDK and API that can be up and running in days, not months. We've made rapid, high-quality integration a core pillar of our roadmap—so you can embed cross-chain gas payments into your web or backend systems with just a few lines of code.",
            benefit: "Minimize your engineering overhead, and start transacting immediately."
          },
          compliance: {
            title: "System security and transparency",
            description: "Security and compliance with legislation are mandatory conditions for the introduction of cryptocurrencies in enterprises. BridgeGas undergoes a multi-level verification process — smart contract audits by leading companies, continuous on-chain monitoring, and off-chain compliance checks — to ensure that every component meets institutional standards.",
            benefit: "We provide full transparency of our protocols prior to launch so that you can verify, confirm, and trust every transaction from start to finish."
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
