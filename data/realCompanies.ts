
import { Company } from '../types';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";
const STAMP = "20260214";

export const REAL_COMPANIES: Company[] = [
  // --- TECH & MULTINATIONALS ---
  { id: 'c1', slug: `vodafone-egypt-${STAMP}-c1`, name: 'Vodafone Egypt', domain: 'vodafone.com.eg', industry: 'Telecommunications', description: 'Leading mobile operator and digital services provider.' },
  { id: 'c2', slug: `cib-egypt-${STAMP}-c2`, name: 'CIB Egypt', domain: 'cibeg.com', industry: 'Banking', description: 'Commercial International Bank, the largest private sector bank.' },
  { id: 'c4', slug: `swvl-${STAMP}-c4`, name: 'Swvl', domain: 'swvl.com', industry: 'Mobility Tech', description: 'Global tech startup for mass transit solutions.' },
  { id: 'c5', slug: `fawry-${STAMP}-c5`, name: 'Fawry', domain: 'fawry.com', industry: 'Fintech', description: 'Egypt\'s leading e-payments platform.' },
  { id: 'c6', slug: `paymob-${STAMP}-c6`, name: 'Paymob', domain: 'paymob.com', industry: 'Fintech', description: 'Omnichannel payment gateway for MENA merchants.' },
  { id: 'c7', slug: `instabug-${STAMP}-c7`, name: 'Instabug', domain: 'instabug.com', industry: 'Software / SaaS', description: 'Mobile app performance monitoring and bug reporting.' },
  { id: 'c8', slug: `valeo-egypt-${STAMP}-c8`, name: 'Valeo Egypt', domain: 'valeo.com', industry: 'Automotive Tech', description: 'Global automotive software and R&D hub.' },
  { id: 'c10', slug: `thndr-${STAMP}-c10`, name: 'Thndr', domain: 'thndr.me', industry: 'Fintech', description: 'Digital investment platform for Egyptian stocks.' },
  { id: 'c11', slug: `orascom-construction-${STAMP}-c11`, name: 'Orascom Construction', domain: 'orascom.com', industry: 'Construction', description: 'Global engineering and construction contractor.' },
  { id: 'c12', slug: `breadfast-${STAMP}-c12`, name: 'Breadfast', domain: 'breadfast.com', industry: 'Logistics', description: 'Hyper-local grocery delivery engine.' },
  { id: 'c13', slug: `vezeeta-${STAMP}-c13`, name: 'Vezeeta', domain: 'vezeeta.com', industry: 'Healthtech', description: 'Healthcare booking and consultation platform.' },
  { id: 'c14', slug: `bosta-${STAMP}-c14`, name: 'Bosta', domain: 'bosta.co', industry: 'Logistics', description: 'Courier service for the e-commerce sector.' },
  { id: 'c15', slug: `maxab-${STAMP}-c15`, name: 'MaxAB', domain: 'maxab.io', industry: 'Logistics / B2B', description: 'B2B platform for food and grocery retailers.' },
  { id: 'c16', slug: `elsewedy-electric-${STAMP}-c16`, name: 'Elsewedy Electric', domain: 'elsewedyelectric.com', industry: 'Energy', description: 'Global energy solutions provider.' },
  { id: 'c17', slug: `valu-${STAMP}-c17`, name: 'ValU', domain: 'valu.com.eg', industry: 'Fintech', description: 'Leading BNPL platform in Egypt.' },
  { id: 'c19', slug: `orange-egypt-${STAMP}-c19`, name: 'Orange Egypt', domain: 'orange.eg', industry: 'Telecommunications', description: 'Comprehensive mobile and data provider.' },
  { id: 'c20', slug: `etisalat-by-e-${STAMP}-c20`, name: 'Etisalat by e&', domain: 'etisalat.com.eg', industry: 'Telecommunications', description: 'Leading global telecom operator.' },
  { id: 'c21', slug: `hassan-allam-${STAMP}-c21`, name: 'Hassan Allam', domain: 'hassanallam.com', industry: 'Construction', description: 'Regional infrastructure and engineering leader.' },
  { id: 'c22', slug: `dell-technologies-${STAMP}-c22`, name: 'Dell Technologies', domain: 'dell.com', industry: 'Tech', description: 'Multinational technology hub.' },
  { id: 'c23', slug: `microsoft-${STAMP}-c23`, name: 'Microsoft', domain: 'microsoft.com', industry: 'Tech', description: 'Global cloud and software initiatives.' },
  { id: 'c24', slug: `ibm-${STAMP}-c24`, name: 'IBM', domain: 'ibm.com', industry: 'Tech', description: 'Consulting and technology services.' },
  { id: 'c26', slug: `robosta-${STAMP}-c26`, name: 'Robosta', domain: 'robosta.tech', industry: 'AI / Tech', description: 'AI-driven customer engagement.' },
  { id: 'c27', slug: `klivvr-${STAMP}-c27`, name: 'Klivvr', domain: 'klivvr.com', industry: 'Fintech', description: 'Financial lifestyle platform.' },
  { id: 'c28', slug: `trella-${STAMP}-c28`, name: 'Trella', domain: 'trella.app', industry: 'Logistics Tech', description: 'Marketplace for trucking and freight.' },
  { id: 'c29', slug: `kmt-egypt-${STAMP}-c29`, name: 'KMT Egypt', domain: 'kmt.eg', industry: 'Tech Hub', description: 'Innovation and entrepreneurship consulting.' },
  { id: 'c30', slug: `edita-${STAMP}-c30`, name: 'Edita', domain: 'edita.com.eg', industry: 'FMCG', description: 'Leader in packaged snack foods.' },

  // --- REAL ESTATE BROKERAGES ---
  { id: 're9', slug: `nawy-${STAMP}-re9`, name: 'Nawy', domain: 'nawy.com', industry: 'PropTech / Brokerage' },
  { id: 're10', slug: `coldwell-banker-egypt-${STAMP}-re10`, name: 'Coldwell Banker Egypt', domain: 'coldwellbanker-eg.com', industry: 'Real Estate Brokerage' },
  { id: 're11', slug: `re-max-egypt-${STAMP}-re11`, name: 'RE/MAX Egypt', domain: 'remax.com.eg', industry: 'Real Estate Brokerage' },
  { id: 're12', slug: `property-finder-egypt-${STAMP}-re12`, name: 'Property Finder Egypt', domain: 'propertyfinder.eg', industry: 'PropTech' },
  { id: 're13', slug: `aqarmap-${STAMP}-re13`, name: 'Aqarmap', domain: 'aqarmap.com.eg', industry: 'PropTech' },

  // --- ADVANCED TIER DEVELOPERS ---
  { id: 'dev_alahly', slug: `al-ahly-sabbour-developments-${STAMP}-dev_alahly`, name: 'Al Ahly Sabbour Developments', domain: 'alahly.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_cityedge', slug: `city-edge-developments-${STAMP}-dev_cityedge`, name: 'City Edge Developments', domain: 'cityedgedevelopments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_emaar', slug: `emaar-misr-${STAMP}-dev_emaar`, name: 'Emaar Misr', domain: 'emaarmisr.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_hassanallam', slug: `hassan-allam-properties-${STAMP}-dev_hassanallam`, name: 'Hassan Allam Properties', domain: 'hap.com.eg', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_hydepark', slug: `hyde-park-developments-${STAMP}-dev_hydepark`, name: 'Hyde Park Developments', domain: 'hydeparkdevelopments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_imkan', slug: `imkan-misr-${STAMP}-dev_imkan`, name: 'Imkan Misr', domain: 'alburoujeg.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_lmd', slug: `landmark-developments-${STAMP}-dev_lmd`, name: 'Landmark Developments', domain: 'lmd.com.eg', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_misritalia', slug: `misr-italia-${STAMP}-dev_misritalia`, name: 'Misr Italia', domain: 'misritaliaproperties.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_mv', slug: `mountain-view-dmg-${STAMP}-dev_mv`, name: 'Mountain View - DMG', domain: 'mountainviewegypt.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_palmhills', slug: `palm-hills-developments-${STAMP}-dev_palmhills`, name: 'Palm Hills Developments', domain: 'palmhillsdevelopments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_tatweer', slug: `tatweer-misr-${STAMP}-dev_tatweer`, name: 'Tatweer Misr', domain: 'tatweermisr.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_waterway', slug: `the-waterway-developments-${STAMP}-dev_waterway`, name: 'The Waterway Developments', domain: 'thewaterwaydevelopments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_starlight', slug: `starlight-developments-${STAMP}-dev_starlight`, name: 'Starlight Developments', domain: 'starlightdevelopments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_arco', slug: `arco-developments-${STAMP}-dev_arco`, name: 'ARCO Developments', domain: 'arcoegypt.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_devx', slug: `developer-x-${STAMP}-dev_devx`, name: 'Developer X', domain: 'developerx.co', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_betterhome', slug: `better-home-${STAMP}-dev_betterhome`, name: 'Better Home', domain: 'betterhome.com.eg', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_cleo', slug: `cleopatra-developments-${STAMP}-dev_cleo`, name: 'Cleopatra Developments', domain: 'cleopatradevelopments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_oud', slug: `oud-developments-${STAMP}-dev_oud`, name: 'OUD Developments', domain: 'oud-egypt.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_skyad', slug: `sky-ad-developments-${STAMP}-dev_skyad`, name: 'SKY AD. Developments', domain: 'skyabudhabi.ae', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_alfuttaim', slug: `al-futtaim-group-${STAMP}-dev_alfuttaim`, name: 'Al-Futtaim Group', domain: 'alfuttaim.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_beta', slug: `beta-developments-${STAMP}-dev_beta`, name: 'Beta Developments', domain: 'betadevelopments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_dorra', slug: `dorra-group-${STAMP}-dev_dorra`, name: 'Dorra Group', domain: 'dorra.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_morshedy', slug: `memaar-el-morshedy-${STAMP}-dev_morshedy`, name: 'Memaar El Morshedy', domain: 'morshedy.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_rock', slug: `rock-developments-${STAMP}-dev_rock`, name: 'Rock Developments', domain: 'rock-developments.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_tmg', slug: `talaat-moustafa-group-${STAMP}-dev_tmg`, name: 'Talaat Moustafa Group', domain: 'talaatmoustafa.com', industry: 'Real Estate', type: 'Developer' },
  { id: 'dev_alqamzi', slug: `al-qamzi-developments-${STAMP}-dev_alqamzi`, name: 'Al Qamzi Developments', domain: 'alqamzidevelopments.com', industry: 'Real Estate', type: 'Developer' }
].reduce((acc: Company[], current) => {
    const existingIndex = acc.findIndex(c => c.domain === current.domain);
    if (existingIndex > -1) {
        acc[existingIndex] = { ...acc[existingIndex], ...current };
    } else {
        acc.push(current as Company);
    }
    return acc;
}, []).map(c => ({
    ...c,
    logoUrl: `https://cdn.brandfetch.io/domain/${c.domain}?c=${BRANDFETCH_CLIENT_ID}`,
    location: (c as any).location || 'Cairo, Egypt',
    isVerified: true
}));
