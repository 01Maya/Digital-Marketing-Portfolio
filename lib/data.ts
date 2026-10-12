/**
 * ALL SITE CONTENT LIVES HERE. Replace the sample values with your own.
 */
export const site = {
  name: "Riya Shah",
  role: "Digital marketing consultant",
  email: "hello@riyashah.example",
  url: "https://riyashah.example",
  title: "Riya Shah | Digital Marketing Consultant: SEO, Paid Ads & Email",
  description:
    "Digital marketing consultant for e-commerce, SaaS and local businesses. SEO, paid advertising and email marketing, with clear reporting. Request a free audit.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Creative", href: "#creative" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],
  tools: ["Google Search Console", "GA4", "Google Ads", "Meta Ads", "Ahrefs", "Klaviyo", "Looker Studio", "Tag Manager", "Canva", "Zapier",],
  facts: [
    ["Focus", "SEO, paid ads, email"],
    ["Works with", "E-commerce, SaaS, local"],
    ["Reply time", "Within one working day"],
  ],
}

export type Category = "seo" | "ads" | "email"
export type ArtKind = "search" | "ads" | "local" | "email" | "social"

export interface Project {
  slug: string
  title: string
  sector: string
  year: string
  category: Category
  tags: string[]
  challenge: string
  approach: string
  results: { label: string; value: string }[]
  source: string
  art: ArtKind
}

export const filters: { value: "all" | Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "seo", label: "SEO" },
  { value: "ads", label: "Paid ads" },
  { value: "email", label: "Email" },
]

export const projects: Project[] = [
  {
    slug: "aarna-skincare",
    title: "Aarna Skincare",
    sector: "D2C e-commerce",
    year: "2025",
    category: "seo",
    tags: ["SEO", "Content", "Technical audit"],
    challenge:
      "Almost all revenue came from paid social. Product and category pages did not rank, and blog posts attracted readers who never bought.",
    approach:
      "Fixed Core Web Vitals and duplicate collection pages, mapped 90 buying-intent keywords to pages, and replaced 40 thin blog posts with 12 ingredient and routine guides linked to products.",
    results: [
      { label: "Organic clicks", value: "+184%" },
      { label: "Non-brand keywords in top 3", value: "23" },
      { label: "Organic share of revenue", value: "11% to 24%" },
    ],
    source: "Google Search Console and Shopify, Jan to Sep 2025",
    art: "search",
  },
  {
    slug: "ledgerloop",
    title: "LedgerLoop",
    sector: "B2B SaaS",
    year: "2025",
    category: "ads",
    tags: ["Google Ads", "CRO", "Landing pages"],
    challenge:
      'Cost per trial had climbed for two quarters, and most clicks came from broad terms like "free invoice template".',
    approach:
      "Split campaigns by intent, added negative keywords from search term reports, rebuilt the landing page around one promise, and ran 18 A/B tests on headline, form length and proof.",
    results: [
      { label: "Cost per trial signup", value: "-41%" },
      { label: "Trial signups", value: "+63%" },
      { label: "Monthly ad spend", value: "Unchanged" },
    ],
    source: "Google Ads and HubSpot, Mar to Aug 2025",
    art: "ads",
  },
  {
    slug: "smile-studio-dental",
    title: "Smile Studio Dental",
    sector: "Local services, 5 clinics",
    year: "2024",
    category: "seo",
    tags: ["Local SEO", "Reviews", "WhatsApp reminders"],
    challenge: "Five clinics had inconsistent listings, few reviews and a steady rate of missed appointments.",
    approach:
      "Cleaned up listings, added service and doctor pages, set up a review request after each visit, and sent WhatsApp reminders 24 hours before appointments.",
    results: [
      { label: "Calls from Google profiles", value: "2.9x" },
      { label: "No-shows", value: "-27%" },
      { label: "Average rating", value: "4.4 to 4.7" },
    ],
    source: "Google Business Profile and clinic booking records, 2024",
    art: "local",
  },
  {
    slug: "kasa-home-decor",
    title: "Kasa Home Decor",
    sector: "E-commerce",
    year: "2024",
    category: "email",
    tags: ["Klaviyo", "Automation", "Segmentation"],
    challenge: "Email was a weekly newsletter only. Abandoned carts and first-time buyers received nothing.",
    approach:
      "Built welcome, browse and cart flows in Klaviyo, segmented by purchase history, and added a post-purchase series with care guides and a reorder prompt.",
    results: [
      { label: "Revenue from email", value: "9% to 27%" },
      { label: "Repeat purchase rate", value: "+18%" },
      { label: "Active flows", value: "7" },
    ],
    source: "Klaviyo and Shopify, Feb to Oct 2024",
    art: "email",
  },
  {
    slug: "fieldwork-coffee",
    title: "Fieldwork Coffee",
    sector: "Subscription e-commerce",
    year: "2025",
    category: "ads",
    tags: ["Meta Ads", "Video", "Retargeting"],
    challenge: "Boosted posts earned likes but few orders, and new subscribers cancelled quickly.",
    approach:
      "Moved to a prospecting and retargeting structure, tested six creative angles in short video, and optimised for subscription starts instead of clicks.",
    results: [
      { label: "Cost per subscription", value: "-32%" },
      { label: "Return on ad spend", value: "2.1x to 3.4x" },
      { label: "Creative angles tested", value: "6" },
    ],
    source: "Meta Ads Manager and Shopify, Apr to Sep 2025",
    art: "social",
  },
]

export type ServiceId = "seo" | "ads" | "email" | "analytics"

export interface Service {
  id: ServiceId
  number: string
  title: string
  short: string
  headline: string
  description: string
  deliverables: string[]
  meta: [string, string][]
}

export const services: Service[] = [
  {
    id: "seo",
    number: "01",
    title: "Search engine optimisation",
    short: "SEO",
    headline: "Be the answer when your customers search.",
    description: "Fix the blockers, then build content around the questions buyers ask.",
    deliverables: [
      "Technical and site-speed audit",
      "Keyword research mapped to pages",
      "Content briefs and on-page optimisation",
      "Local and Google Business Profile setup",
      "Monthly ranking and traffic report",
    ],
    meta: [
      ["Best for", "Stores and businesses that rely on being found"],
      ["First signals", "3 to 6 months"],
      ["Tools", "Search Console, Ahrefs, GA4"],
    ],
  },
  {
    id: "ads",
    number: "02",
    title: "Paid advertising",
    short: "Paid ads",
    headline: "Pay for customers, not clicks.",
    description: "Campaigns built around buying intent, with tracking you can trust and creative tested every week.",
    deliverables: [
      "Account and conversion tracking setup",
      "Intent-based campaign structure",
      "Ad copy and creative testing",
      "Landing page recommendations",
      "Weekly optimisation and spend reports",
    ],
    meta: [
      ["Best for", "Businesses that need leads or sales soon"],
      ["First signals", "2 to 4 weeks"],
      ["Tools", "Google Ads, Meta Ads, Tag Manager"],
    ],
  },
  {
    id: "email",
    number: "03",
    title: "Email and retention",
    short: "Email marketing",
    headline: "Turn first-time buyers into regulars.",
    description: "Automated flows and well-timed campaigns that bring people back without discounting every time.",
    deliverables: [
      "Welcome, cart and win-back flows",
      "List segmentation by behaviour",
      "Campaign calendar and templates",
      "Deliverability and list health check",
      "Revenue reporting by flow",
    ],
    meta: [
      ["Best for", "Stores with repeat-purchase potential"],
      ["First signals", "2 to 3 weeks for the first flows"],
      ["Tools", "Klaviyo, Canva, Zapier"],
    ],
  },
  {
    id: "analytics",
    number: "04",
    title: "Analytics and reporting",
    short: "Analytics and reporting",
    headline: "Know exactly what is working.",
    description: "One clear view of leads and revenue, so every decision has a signal.",
    deliverables: [
      "GA4 and Tag Manager setup",
      "Conversion and event tracking audit",
      "Looker Studio dashboard",
      "Monthly review call with next steps",
      "Attribution notes in plain language",
    ],
    meta: [
      ["Best for", "Teams unsure which channel drives revenue"],
      ["First signals", "1 to 2 weeks for setup"],
      ["Tools", "GA4, Tag Manager, Looker Studio"],
    ],
  },
]

export const serviceOptions = [...services.map((s) => s.short), "Not sure yet"]

export const steps = [
  { title: "Audit", text: "Review of your site, ads and analytics, ending in one clear goal." },
  { title: "Plan", text: "Channels, budget and expected timeline, in writing." },
  { title: "Launch", text: "Campaigns and tracking go live together." },
  { title: "Improve", text: "Weekly tests and a monthly report with next steps." },
]

export const testimonials = [
  {
    quote:
      "Riya showed us that most of our sales were hiding behind a handful of product pages. Six months later, search is our second-biggest channel.",
    name: "Meera K.",
    role: "Founder, Aarna Skincare",
  },
  {
    quote:
      "She explained every change in plain language, and our cost per trial dropped without raising spend. That combination is rare.",
    name: "Daniel O.",
    role: "Head of Growth, LedgerLoop",
  },
  {
    quote:
      "The reminders and review requests were simple ideas, but she set them up properly. Our front desk noticed the difference within a month.",
    name: "Dr. Nikhil Rao",
    role: "Smile Studio Dental",
  },
]

export const faqs = [
  {
    q: "How long does SEO take to show results?",
    a: "Most sites see early movement in three to six months. Competitive keywords can take longer, so I set expected timelines in your plan.",
  },
  {
    q: "How much do your services cost?",
    a: "It depends on scope. After the free audit you receive a fixed monthly quote before you commit.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. I work with e-commerce stores, SaaS companies and local businesses, and scale the plan to your budget.",
  },
  {
    q: "How do you report results?",
    a: "A live dashboard plus a monthly report that ties results to leads and revenue, not just clicks.",
  },
  {
    q: "What happens in the free audit?",
    a: "I review your website, search visibility, ads and analytics, then send three prioritised quick wins. There is no obligation.",
  },
  {
  q: "How will we communicate during the project?",
  a: "I provide regular updates, share progress reports and stay available to discuss priorities, feedback and next steps throughout the project.",
},
]
