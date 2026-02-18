
import { Company } from '../types';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";
const STAMP = "20260214";

export const REAL_COMPANIES: Company[] = [
    // --- TECH & MULTINATIONALS ---
    { id: 'c1', slug: `vodafone-egypt-${STAMP}-c1`, name: 'Vodafone Egypt', domain: 'vodafone.com.eg', industry: 'Telecommunications', description: 'Leading mobile operator and digital services provider.' },
    { id: 'c2', slug: `cib-egypt-${STAMP}-c2`, name: 'CIB Egypt', domain: 'cibeg.com', industry: 'Banking', description: 'Commercial International Bank, the largest private sector bank.' },
    { id: 'c32', slug: `ebny-${STAMP}-c32`, name: 'Ebny', domain: 'ebny.com', industry: 'Recent/Mid-sized Developer', description: 'Emerging developer focused on smart residential compounds.' },
    { id: 'c33', slug: `sodic-${STAMP}-c33`, name: 'SODIC', domain: 'sodic.com', industry: 'Real Estate Developer', description: 'One of the country’s leading real estate development companies.', employeeCount: '501-1,000 employees', followerCount: '292K followers' },
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
    { id: 're9', slug: `nawy-${STAMP}-re9`, name: 'Nawy', domain: 'nawy.com', industry: 'PropTech', type: 'Technology' },
    { id: 're10', slug: `coldwell-banker-egypt-${STAMP}-re10`, name: 'Coldwell Banker Egypt', domain: 'coldwellbanker-eg.com', industry: 'Real Estate Brokerage' },
    { id: 're11', slug: `re-max-egypt-${STAMP}-re11`, name: 'RE/MAX Egypt', domain: 'remax.com.eg', industry: 'Real Estate Brokerage' },
    { id: 're12', slug: `property-finder-egypt-${STAMP}-re12`, name: 'Property Finder Egypt', domain: 'propertyfinder.eg', industry: 'PropTech', type: 'Technology' },
    { id: 're13', slug: `aqarmap-${STAMP}-re13`, name: 'Aqarmap', domain: 'aqarmap.com.eg', industry: 'PropTech', type: 'Technology' },

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
    { id: 'dev_alqamzi', slug: `al-qamzi-developments-${STAMP}-dev_alqamzi`, name: 'Al Qamzi Developments', domain: 'alqamzidevelopments.com', industry: 'Real Estate', type: 'Developer' },

    // --- LIVE DATA INJECTION FEB 2026 ---
    { id: 'live_infinity', slug: `infinity-towers-${STAMP}-live_infinity`, name: 'Infinity Towers for Urban Development', domain: 'infinityt.net', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_cornerstone', slug: `cornerstone-development-${STAMP}-live_cornerstone`, name: 'Cornerstone Development', domain: 'cornerstonedv.com', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_address', slug: `the-address-investments-${STAMP}-live_address`, name: 'The Address Investments', domain: 'theaddress-eg.com', industry: 'Real Estate', type: 'Brokerage' },
    { id: 'live_maf', slug: `majid-al-futtaim-${STAMP}-live_maf`, name: 'Majid Al Futtaim', domain: 'majidalfuttaim.com', industry: 'Real Estate / Retail', type: 'Developer' },
    { id: 'live_era', slug: `era-real-estate-egypt-${STAMP}-live_era`, name: 'ERA Real Estate Egypt', domain: 'eraegypt.com', industry: 'Real Estate', type: 'Brokerage' },
    { id: 'live_connect', slug: `connect-homes-${STAMP}-live_connect`, name: 'Connect Homes', domain: 'connecthomes-eg.com', industry: 'Real Estate', type: 'Brokerage' },
    { id: 'live_red', slug: `red-real-estate-domain-${STAMP}-live_red`, name: 'RED - Real Estate Domain', domain: 'redconegypt.com', industry: 'Real Estate', type: 'Brokerage' },
    { id: 'live_tld', slug: `tld-the-land-developers-${STAMP}-live_tld`, name: 'TLD - The Land Developers', domain: 'thelanddevelopers.com', industry: 'Real Estate', type: 'Developer' },
    {
        id: 're9',
        slug: `nawy-${STAMP}-re9`,
        name: 'Nawy',
        domain: 'nawy.com',
        industry: 'PropTech / Brokerage',
        description: "Africa's largest proptech. An end to end platform providing a seamless experience for prospective buyers, sellers & investors in the real estate space. We are a tech-based information & services hub...",
        employeeCount: "1,001-5,000 employees",
        followerCount: "196K followers",
        locations: ["New Cairo, Egypt"]
    },
    { id: 'live_deloitte', slug: `deloitte-${STAMP}-live_deloitte`, name: 'Deloitte', domain: 'deloitte.com', industry: 'Consulting', description: 'Real Estate Advisory' },
    { id: 're10', slug: `coldwell-banker-egypt-${STAMP}-re10`, name: 'Coldwell Banker Egypt', domain: 'coldwellbanker-eg.com', industry: 'Real Estate', type: 'Brokerage' },
    { id: 'live_xestate', slug: `x-estate-developments-${STAMP}-live_xestate`, name: 'X Estate Developments', domain: 'xestate.com', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_vbroker', slug: `v-the-brokers-${STAMP}-live_vbroker`, name: 'V The Brokers', domain: 'vthebrokers.com', industry: 'Real Estate', type: 'Brokerage' },
    { id: 'live_ssc', slug: `ssc-hr-solutions-${STAMP}-live_ssc`, name: 'SSC HR Solutions', domain: 'sschrsolutions.com', industry: 'HR / Recruitment' },
    { id: 'live_beta', slug: `beta-egypt-${STAMP}-live_beta`, name: 'BETA', domain: 'betaegypt.com', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_gemotec', slug: `gemotec-development-${STAMP}-live_gemotec`, name: 'Gemotec Development', domain: 'gemotec.com', industry: 'Real Estate', type: 'Developer' },

    // --- LIVE DATA INJECTION FEB 2026 (Part 2) ---
    { id: 'live_turath', slug: `turath-real-estate-${STAMP}-live_turath`, name: 'Turath Real Estate', domain: 'turath.com', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_udc', slug: `udc-real-estate-development-${STAMP}-live_udc`, name: 'UDC Real Estate Development', domain: 'udc.com.eg', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_royal', slug: `royal-for-real-estate-development-${STAMP}-live_royal`, name: 'Royal for Real Estate Development', domain: 'royal-development.com', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_solik', slug: `solik-real-estate-investment-${STAMP}-live_solik`, name: 'Solik Real Estate Investment', domain: 'solik.com', industry: 'Real Estate', type: 'Developer' },
    { id: 'live_ebny', slug: `ebny-developments-${STAMP}-live_ebny`, name: 'EBNY Developments', domain: 'ebny.com.eg', industry: 'Real Estate', type: 'Developer' },

    // --- FORTUNE 500 & MULTINATIONALS (INJECTED) ---
    // Tech & Telecom
    { id: 'c_microsoft', slug: 'microsoft-egypt', name: 'Microsoft', domain: 'microsoft.com', industry: 'Technology', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_amazon', slug: 'amazon-egypt', name: 'Amazon', domain: 'amazon.eg', industry: 'E-commerce', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_ibm', slug: 'ibm-egypt', name: 'IBM', domain: 'ibm.com', industry: 'Technology', employeeCount: '10,000+', locations: ['Smart Village, Egypt'] },
    { id: 'c_dell', slug: 'dell-technologies', name: 'Dell Technologies', domain: 'dell.com', industry: 'Technology', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_vodafone', slug: 'vodafone-egypt', name: 'Vodafone', domain: 'vodafone.com.eg', industry: 'Telecommunications', employeeCount: '5,000-10,000', locations: ['Smart Village, Egypt'] },
    { id: 'c_orange', slug: 'orange-egypt', name: 'Orange', domain: 'orange.eg', industry: 'Telecommunications', employeeCount: '5,000-10,000', locations: ['Smart Village, Egypt'] },

    // FMCG (Fast-Moving Consumer Goods)
    { id: 'c_pepsico', slug: 'pepsico-egypt', name: 'PepsiCo', domain: 'pepsico.com', industry: 'FMCG', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_coca_cola', slug: 'coca-cola-egypt', name: 'The Coca-Cola Company', domain: 'coca-cola.com', industry: 'FMCG', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_pg', slug: 'procter-gamble-egypt', name: 'Procter & Gamble (P&G)', domain: 'pg.com', industry: 'FMCG', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_unilever', slug: 'unilever-egypt', name: 'Unilever', domain: 'unilever.com', industry: 'FMCG', employeeCount: '10,000+', locations: ['Alexandria, Egypt'] },
    { id: 'c_nestle', slug: 'nestle-egypt', name: 'Nestlé', domain: 'nestle.com.eg', industry: 'FMCG', employeeCount: '5,000-10,000', locations: ['Cairo, Egypt'] },

    // Pharma & Healthcare
    { id: 'c_novartis', slug: 'novartis-egypt', name: 'Novartis', domain: 'novartis.com', industry: 'Pharmaceuticals', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },
    { id: 'c_sanofi', slug: 'sanofi-egypt', name: 'Sanofi', domain: 'sanofi.com.eg', industry: 'Pharmaceuticals', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },

    // Banking & Finance
    { id: 'c_cib', slug: 'cib-egypt', name: 'Commercial International Bank (CIB)', domain: 'cibeg.com', industry: 'Banking', employeeCount: '5,000-10,000', locations: ['Smart Village, Egypt'] },
    { id: 'c_hsbc', slug: 'hsbc-egypt', name: 'HSBC', domain: 'hsbc.com.eg', industry: 'Banking', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },

    // Top Egyptian Real Estate Developers
    { id: 'c_palmhills', slug: 'palm-hills-developments', name: 'Palm Hills Developments', domain: 'palmhillsdevelopments.com', industry: 'Real Estate', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },
    { id: 'c_orascom', slug: 'orascom-development', name: 'Orascom Development', domain: 'orascomdh.com', industry: 'Real Estate', employeeCount: '5,000-10,000', locations: ['Cairo, Egypt'] },
    { id: 'c_tmg', slug: 'tmg-holding', name: 'Talaat Moustafa Group (TMG)', domain: 'talaatmoustafa.com', industry: 'Real Estate', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_mountainview', slug: 'mountain-view-egypt', name: 'Mountain View', domain: 'mountainviewegypt.com', industry: 'Real Estate', employeeCount: '1,000-5,000', locations: ['New Cairo, Egypt'] },
    { id: 'c_madinetmasr', slug: 'madinet-masr', name: 'Madinet Masr', domain: 'madinetmasr.com', industry: 'Real Estate', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },
    { id: 'c_tatweer', slug: 'tatweer-misr', name: 'Tatweer Misr', domain: 'tatweermisr.com', industry: 'Real Estate', employeeCount: '501-1,000', locations: ['Cairo, Egypt'] },
    { id: 'c_ora', slug: 'ora-developers', name: 'Ora Developers', domain: 'oradevelopers.com', industry: 'Real Estate', employeeCount: '501-1,000', locations: ['Zayed City, Egypt'] },

    // Multinationals & Tech in Egypt
    { id: 'c_google', slug: 'google-egypt', name: 'Google', domain: 'google.com.eg', industry: 'Technology', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_sap', slug: 'sap-egypt', name: 'SAP', domain: 'sap.com', industry: 'Technology', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_cisco', slug: 'cisco-egypt', name: 'Cisco', domain: 'cisco.com', industry: 'Technology', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_etisalat', slug: 'etisalat-egypt', name: 'Etisalat by e&', domain: 'etisalat.eg', industry: 'Telecommunications', employeeCount: '5,000-10,000', locations: ['Cairo, Egypt'] },
    { id: 'c_we', slug: 'telecom-egypt', name: 'Telecom Egypt (WE)', domain: 'te.eg', industry: 'Telecommunications', employeeCount: '10,000+', locations: ['Smart Village, Egypt'] },

    // Top Egyptian Banks & Financial Institutions
    { id: 'c_nbe', slug: 'national-bank-of-egypt', name: 'National Bank of Egypt (NBE)', domain: 'nbe.com.eg', industry: 'Banking', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_banquemisr', slug: 'banque-misr', name: 'Banque Misr', domain: 'banquemisr.com', industry: 'Banking', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_qnb', slug: 'qnb-alahli', name: 'QNB ALAHLI', domain: 'qnb.com.eg', industry: 'Banking', employeeCount: '5,000-10,000', locations: ['Cairo, Egypt'] },
    { id: 'c_efghermes', slug: 'efg-holding', name: 'EFG Holding (Hermes)', domain: 'efghermes.com', industry: 'Financial Services', employeeCount: '1,000-5,000', locations: ['Smart Village, Egypt'] },
    { id: 'c_fawry_bank', slug: 'fawry-banking', name: 'Fawry', domain: 'fawry.com', industry: 'Financial Technology', employeeCount: '1,000-5,000', locations: ['Smart Village, Egypt'] },

    // Egyptian Infrastructure, Construction & Manufacturing
    { id: 'c_elsewedy', slug: 'elsewedy-electric', name: 'Elsewedy Electric', domain: 'elsewedyelectric.com', industry: 'Manufacturing', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_hassanallam', slug: 'hassan-allam-holding', name: 'Hassan Allam Holding', domain: 'hassanallam.com', industry: 'Construction', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_arabcont', slug: 'arab-contractors', name: 'The Arab Contractors', domain: 'arabcont.com', industry: 'Construction', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_ezzsteel', slug: 'ezz-steel', name: 'Ezz Steel', domain: 'ezzsteel.com', industry: 'Manufacturing', employeeCount: '5,000-10,000', locations: ['Cairo, Egypt'] },
    { id: 'c_orascom_const', slug: 'orascom-construction', name: 'Orascom Construction', domain: 'orascom.com', industry: 'Construction', employeeCount: '10,000+', locations: ['Cairo, Egypt'] },
    { id: 'c_mopco', slug: 'mopco', name: 'Misr Fertilizer Production (MOPCO)', domain: 'mopco-eg.com', industry: 'Manufacturing', employeeCount: '1,000-5,000', locations: ['Damietta, Egypt'] },

    // Egyptian FMCG & Food 
    { id: 'c_juhayna', slug: 'juhayna', name: 'Juhayna Food Industries', domain: 'juhayna.com', industry: 'FMCG', employeeCount: '1,000-5,000', locations: ['6th of October, Egypt'] },
    { id: 'c_edita', slug: 'edita', name: 'Edita Food Industries', domain: 'edita.com.eg', industry: 'FMCG', employeeCount: '5,000-10,000', locations: ['Sheikh Zayed, Egypt'] },
    { id: 'c_eastern', slug: 'eastern-company', name: 'Eastern Company', domain: 'easterncompany.com', industry: 'FMCG', employeeCount: '10,000+', locations: ['Giza, Egypt'] },

    // Global Multinationals in Egypt
    { id: 'c_schneider', slug: 'schneider-electric-egypt', name: 'Schneider Electric', domain: 'se.com', industry: 'Technology', employeeCount: '1,000-5,000', locations: ['New Cairo, Egypt'] },
    { id: 'c_siemens', slug: 'siemens-egypt', name: 'Siemens', domain: 'siemens.com', industry: 'Engineering', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },
    { id: 'c_slb', slug: 'slb-egypt', name: 'SLB (Schlumberger)', domain: 'slb.com', industry: 'Oil & Gas', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },
    { id: 'c_gsk', slug: 'gsk-egypt', name: 'GSK', domain: 'gsk.com', industry: 'Pharmaceuticals', employeeCount: '1,000-5,000', locations: ['Cairo, Egypt'] },
    { id: 'c_pfizer', slug: 'pfizer-egypt', name: 'Pfizer', domain: 'pfizer.com', industry: 'Pharmaceuticals', employeeCount: '501-1,000', locations: ['Cairo, Egypt'] },
    { id: 'c_valeo', slug: 'valeo-egypt', name: 'Valeo', domain: 'valeo.com', industry: 'Automotive Tech', employeeCount: '1,000-5,000', locations: ['Smart Village, Egypt'] },
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
