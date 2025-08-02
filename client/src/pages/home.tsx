import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  CreditCard, 
  ArrowLeftRight, 
  Shield, 
  ChevronDown, 
  Check,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import kirillPhoto from "@assets/5219902681336902091_1754130035865.jpg";

const whitelistSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
});

type WhitelistForm = z.infer<typeof whitelistSchema>;

// Logo SVG Component
const BridgeGasLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="25" y="45" width="70" height="30" rx="5" fill="hsl(217, 91%, 60%)"/>
    <rect x="20" y="35" width="80" height="8" rx="4" fill="currentColor"/>
    <rect x="20" y="77" width="80" height="8" rx="4" fill="currentColor"/>
    <text x="60" y="95" fontFamily="Montserrat, sans-serif" fontSize="10" fontWeight="600" fill="currentColor" textAnchor="middle">BRIDGEGAS</text>
  </svg>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();
  const { toast } = useToast();

  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Fetch content
  const { data: heroContent } = useQuery({
    queryKey: ["/api/content/hero"],
  });

  const { data: aboutContent } = useQuery({
    queryKey: ["/api/content/about"],
  });

  const { data: solutionsContent } = useQuery({
    queryKey: ["/api/content/solutions"],
  });

  const { data: teamContent } = useQuery({
    queryKey: ["/api/content/team"],
  });

  // Whitelist form
  const form = useForm<WhitelistForm>({
    resolver: zodResolver(whitelistSchema),
    defaultValues: {
      email: "",
    },
  });

  const whitelistMutation = useMutation({
    mutationFn: async (data: WhitelistForm) => {
      const response = await apiRequest("POST", "/api/whitelist", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully added to whitelist!",
        description: "We'll be in touch soon with partnership opportunities.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/whitelist"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join whitelist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WhitelistForm) => {
    whitelistMutation.mutate(data);
  };

  // Scroll spy
  useEffect(() => {
    const sections = ["hero", "about", "solutions", "whitelist", "team"];
    const observers = sections.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>BridgeGas - Bridging TradFi & Crypto Payment Solutions</title>
      <meta 
        name="description" 
        content="BridgeGas delivers cutting-edge B2B crypto payment solutions, bridging traditional finance with blockchain technology for enterprise-grade compliance and seamless transactions." 
      />
      <meta property="og:title" content="BridgeGas - Bridging TradFi & Crypto Payment Solutions" />
      <meta property="og:description" content="Enterprise crypto payment gateway with on-chain/off-chain bridging and compliance solutions for traditional businesses." />
      <meta property="og:type" content="website" />

      <div className="min-h-screen bg-charcoal text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-card backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <BridgeGasLogo className="w-8 h-8 text-white" />
                <span className="font-heading font-bold text-xl">BridgeGas</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {[
                  { id: "about", label: "About" },
                  { id: "solutions", label: "Solutions" },
                  { id: "team", label: "Team" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "text-steel hover:text-electric transition-colors duration-200 font-medium",
                      activeSection === item.id && "text-electric"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  onClick={() => scrollToSection("whitelist")}
                  className="bg-electric hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Join Whitelist
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden py-4 border-t border-white/10"
              >
                <div className="flex flex-col space-y-4">
                  {[
                    { id: "about", label: "About" },
                    { id: "solutions", label: "Solutions" },
                    { id: "team", label: "Team" },
                    { id: "whitelist", label: "Join Whitelist" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-steel hover:text-electric transition-colors duration-200 font-medium text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen gradient-bg blockchain-pattern flex items-center justify-center relative overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 bg-gradient-to-br from-electric/5 to-emerald-custom/5"
          />
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BridgeGasLogo className="w-32 h-32 mx-auto mb-8 text-white" />
              
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-white to-steel bg-clip-text text-transparent">
                {heroContent?.content.title || "BridgeGas"}
              </h1>
              
              <p className="text-xl md:text-2xl text-steel mb-12 font-heading font-light">
                {heroContent?.content.tagline || "Bridging TradFi & Crypto Payment Solutions"}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  onClick={() => scrollToSection("whitelist")}
                  className="bg-electric hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  Join Our Whitelist
                </Button>
                <Button 
                  onClick={() => scrollToSection("about")}
                  variant="outline"
                  className="border-steel hover:border-electric text-steel hover:text-electric px-8 py-4 rounded-xl text-lg font-medium"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-steel" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-midnight relative">
          <div className="absolute inset-0 blockchain-pattern opacity-30" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-white">
                {aboutContent?.content.heading || "Who We Are"}
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-xl text-steel leading-relaxed">
                  {aboutContent?.content.description || "BridgeGas is a pioneering B2B crypto startup revolutionizing how traditional businesses interact with blockchain technology."}
                </p>
                <p className="text-xl text-steel leading-relaxed">
                  {aboutContent?.content.mission || "Our mission is to eliminate complexity barriers for enterprise crypto adoption."}
                </p>
                <p className="text-xl text-steel leading-relaxed">
                  {aboutContent?.content.values || "Built on principles of trust, innovation, and enterprise-grade reliability."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-charcoal">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-white">
                {solutionsContent?.content.heading || "Our Solutions"}
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto">
                {solutionsContent?.content.subheading || "Comprehensive crypto payment infrastructure designed for enterprise adoption"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: CreditCard,
                  color: "text-electric",
                  bgColor: "bg-electric/20",
                  title: solutionsContent?.content.payment?.title || "Crypto Payment Gateway",
                  description: solutionsContent?.content.payment?.description || "Seamlessly integrate cryptocurrency payments into your existing infrastructure.",
                  benefit: solutionsContent?.content.payment?.benefit || "Reduce transaction fees by up to 70%.",
                },
                {
                  icon: ArrowLeftRight,
                  color: "text-emerald-custom",
                  bgColor: "bg-emerald-custom/20",
                  title: solutionsContent?.content.bridging?.title || "On-chain/Off-chain Bridging",
                  description: solutionsContent?.content.bridging?.description || "Advanced bridging technology connecting traditional banking with blockchain networks.",
                  benefit: solutionsContent?.content.bridging?.benefit || "Enable instant settlements and 24/7 operations.",
                },
                {
                  icon: Shield,
                  color: "text-yellow-500",
                  bgColor: "bg-yellow-500/20",
                  title: solutionsContent?.content.compliance?.title || "Enterprise-Grade Compliance",
                  description: solutionsContent?.content.compliance?.description || "Comprehensive regulatory compliance suite with AML/KYC and audit trails.",
                  benefit: solutionsContent?.content.compliance?.benefit || "Meet regulatory requirements with confidence.",
                },
              ].map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-2xl hover-lift"
                >
                  <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-6", solution.bgColor)}>
                    <solution.icon className={cn("w-8 h-8", solution.color)} />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-steel leading-relaxed mb-4">
                    {solution.description}
                  </p>
                  <p className="text-steel leading-relaxed">
                    {solution.benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Whitelist Section */}
        <section id="whitelist" className="py-24 bg-midnight relative">
          <div className="absolute inset-0 bg-gradient-to-r from-electric/10 to-emerald-custom/10" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                Join the BridgeGas Whitelist
              </h2>
              <p className="text-xl text-steel mb-12">
                Enter your business email below to learn more about partnership opportunities and early access to our platform.
              </p>

              <div className="max-w-md mx-auto">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your business email"
                              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-steel focus:border-electric focus:ring-2 focus:ring-electric/50 h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={whitelistMutation.isPending}
                      className="w-full bg-electric hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 h-12"
                    >
                      {whitelistMutation.isPending ? "Submitting..." : "Join Whitelist"}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 bg-charcoal">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-white">
                {teamContent?.content.heading || "Our Team"}
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto">
                {teamContent?.content.subheading || "Led by experienced entrepreneurs and technical experts"}
              </p>
            </motion.div>

            <div className="flex justify-center max-w-4xl mx-auto">
              {[
                {
                  name: teamContent?.content.kirill?.name || "Kirill Shurakhtov",
                  role: teamContent?.content.kirill?.role || "Founder & CEO",
                  bio: teamContent?.content.kirill?.bio || "Visionary leader with deep expertise in bridging traditional finance and blockchain technology.",
                  image: kirillPhoto,
                  borderColor: "border-electric/30"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-2xl hover-lift text-center"
                >
                  <img 
                    src={member.image} 
                    alt={`${member.name}`} 
                    className={cn("w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4", member.borderColor)}
                  />
                  <h3 className="text-2xl font-heading font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-electric font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-steel leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-steel text-lg">
                {teamContent?.content.footerNote || "Our team is growing—your feedback and interest will help us build out the BridgeGas leadership."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-midnight border-t border-white/10 py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <div className="flex items-center space-x-3 justify-center md:justify-start mb-4">
                  <BridgeGasLogo className="w-8 h-8 text-white" />
                  <span className="font-heading font-bold text-xl">BridgeGas</span>
                </div>
                <p className="text-steel">Bridging TradFi & Crypto Payment Solutions</p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex space-x-6">
                  <a href="#" className="text-steel hover:text-electric transition-colors duration-200">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-steel hover:text-electric transition-colors duration-200">
                    Terms of Service
                  </a>
                </div>
                <p className="text-steel text-sm">© 2025 BridgeGas. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
