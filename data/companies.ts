
import { Company } from '../types';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";

export const COMPANIES: Company[] = [
  {
    id: "c1",
    // Fix: Added slug property
    slug: "vodafone-egypt",
    name: "Vodafone Egypt",
    domain: "vodafone.com.eg",
    logoUrl: `https://cdn.brandfetch.io/domain/vodafone.com.eg?c=${BRANDFETCH_CLIENT_ID}`,
    industry: "Telecommunications",
    location: "Smart Village, Giza",
    description: "Leading telecommunications provider in Egypt."
  },
  {
    id: "c2",
    // Fix: Added slug property
    slug: "orascom-construction",
    name: "Orascom Construction",
    domain: "orascom.com",
    logoUrl: `https://cdn.brandfetch.io/domain/orascom.com?c=${BRANDFETCH_CLIENT_ID}`,
    industry: "Construction",
    location: "Nile City Towers, Cairo",
    description: "Global engineering and construction contractor."
  },
  {
    id: "c3",
    // Fix: Added slug property
    slug: "cib-egypt",
    name: "CIB Egypt",
    domain: "cibeg.com",
    logoUrl: `https://cdn.brandfetch.io/domain/cibeg.com?c=${BRANDFETCH_CLIENT_ID}`,
    industry: "Banking",
    location: "New Cairo, Cairo",
    description: "The leading private sector bank in Egypt."
  },
  {
    id: "c4",
    // Fix: Added slug property
    slug: "fawry",
    name: "Fawry",
    domain: "fawry.com",
    logoUrl: `https://cdn.brandfetch.io/domain/fawry.com?c=${BRANDFETCH_CLIENT_ID}`,
    industry: "Fintech",
    location: "Smart Village, Giza",
    description: "The leading digital transformation & e-payments platform."
  },
  {
    id: "c5",
    // Fix: Added slug property
    slug: "swvl",
    name: "Swvl",
    domain: "swvl.com",
    logoUrl: `https://cdn.brandfetch.io/domain/swvl.com?c=${BRANDFETCH_CLIENT_ID}`,
    industry: "Tech / Transportation",
    location: "New Cairo, Cairo",
    description: "Transforming mass transit with technology."
  }
];
