/**
 * Generate customer intelligence JSON from Excel template + demo data
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL = path.join(__dirname, '..', 'Demo Customer Intelligence Project Pipeline Database_Europe Fencing Market _CMI.xlsx');
const OUT = path.join(__dirname, '..', 'public', 'data', 'customer-intelligence.json');

const PROP1_KEYS = [
  'customerName', 'yearOfEstablishment', 'headquarters', 'industryVertical',
  'companyRevenue', 'existingSuppliers'
];
const PROP2_KEYS = [
  'contactName', 'designation', 'email', 'phone', 'linkedin', 'projectType',
  'projectName', 'projectLocation', 'projectStatus', 'projectValue',
  'fencingRequirementType', 'productCategoryProcured', 'procurementQuantity',
  'procurementTimeline', 'currentSecurityTechnology', 'supplierSwitchingProbability',
  'priceSensitivity', 'procurementDecisionStage'
];
const PROP3_KEYS = [
  'currentFencingProvider', 'productPortfolioUsed', 'estimatedContractValue',
  'keyCompetitiveAdvantage', 'renewalOpportunityTimeline', 'tenderName',
  'releaseDate', 'qualificationCriteria', 'estimatedProcurementBudget', 'bidParticipants'
];

const DEMO_CUSTOMERS = [
  { customerName: 'Deutsche Bahn AG', headquarters: 'Germany', industryVertical: 'Railways / Critical Transport Infrastructure', yearOfEstablishment: 1994, companyRevenue: 'US$ 56.3 Bn' },
  { customerName: 'Heathrow Airport Holdings', headquarters: 'U.K.', industryVertical: 'Airport Operator / Aviation Infrastructure', yearOfEstablishment: 1966, companyRevenue: 'US$ 3.8 Bn' },
  { customerName: 'Amazon EU SARL (Luxembourg Fulfillment)', headquarters: 'Luxembourg', industryVertical: 'Logistics / Warehousing', yearOfEstablishment: 1994, companyRevenue: 'US$ 120 Bn (Global)' },
  { customerName: 'Equinix FR5 Paris Data Center', headquarters: 'France', industryVertical: 'Data Centers and Technology Facilities', yearOfEstablishment: 1998, companyRevenue: 'US$ 8.2 Bn (Global)' },
  { customerName: 'Siemens AG – Erlangen Campus', headquarters: 'Germany', industryVertical: 'Manufacturing / Industrial Facilities', yearOfEstablishment: 1847, companyRevenue: 'US$ 82.9 Bn' },
  { customerName: 'EDF Flamanville Nuclear Site', headquarters: 'France', industryVertical: 'Utilities and Energy Infrastructure', yearOfEstablishment: 1946, companyRevenue: 'US$ 98.5 Bn' },
  { customerName: 'NATO Joint Force Command Brunssum', headquarters: 'Netherlands', industryVertical: 'Defense and High-Security Installations', yearOfEstablishment: 2004, companyRevenue: 'Government / NATO Budget' },
  { customerName: 'Mercedes-Benz Sindelfingen Plant', headquarters: 'Germany', industryVertical: 'Automotive Manufacturing', yearOfEstablishment: 1915, companyRevenue: 'US$ 175 Bn (Group)' },
  { customerName: 'Port of Rotterdam Authority', headquarters: 'Netherlands', industryVertical: 'Seaports and Harbors / Transport Infrastructure', yearOfEstablishment: 1932, companyRevenue: 'US$ 1.2 Bn' },
  { customerName: 'Sanofi Gent Biotech Facility', headquarters: 'Belgium', industryVertical: 'Pharmaceuticals and Healthcare', yearOfEstablishment: 2004, companyRevenue: 'US$ 47.4 Bn (Group)' },
  { customerName: 'University of Oxford – Science Park', headquarters: 'U.K.', industryVertical: 'Education and Public Institutions', yearOfEstablishment: 1096, companyRevenue: 'Public Institution' },
  { customerName: 'Allianz Arena (FC Bayern)', headquarters: 'Germany', industryVertical: 'Sports and Recreation Facilities', yearOfEstablishment: 2005, companyRevenue: 'US$ 900 Mn (Annual)' },
  { customerName: 'Iberdrola Renewable Energy Park', headquarters: 'Spain', industryVertical: 'Renewable Energy Facilities', yearOfEstablishment: 1992, companyRevenue: 'US$ 44.3 Bn' },
  { customerName: 'BASF Ludwigshafen Chemical Complex', headquarters: 'Germany', industryVertical: 'Chemical Manufacturing / Industrial', yearOfEstablishment: 1865, companyRevenue: 'US$ 87.3 Bn' },
  { customerName: 'Vinci Autoroutes – A86 Tunnel', headquarters: 'France', industryVertical: 'Roads and Highways / Transport Infrastructure', yearOfEstablishment: 1899, companyRevenue: 'US$ 72.1 Bn (Group)' },
  { customerName: 'Apple Data Center – Viborg', headquarters: 'Denmark', industryVertical: 'Hyperscale Data Centers', yearOfEstablishment: 2015, companyRevenue: 'US$ 383 Bn (Global)' },
  { customerName: 'Royal Dutch Shell – Pernis Refinery', headquarters: 'Netherlands', industryVertical: 'Oil & Gas Storage / Energy', yearOfEstablishment: 1907, companyRevenue: 'US$ 316 Bn (Group)' },
  { customerName: 'Nestlé Waters Vittel Plant', headquarters: 'France', industryVertical: 'Food & Beverage Manufacturing', yearOfEstablishment: 1866, companyRevenue: 'US$ 103 Bn (Group)' },
  { customerName: 'DHL Supply Chain – Leipzig Hub', headquarters: 'Germany', industryVertical: 'Warehouses and Logistics Parks', yearOfEstablishment: 1969, companyRevenue: 'US$ 94.4 Bn (Group)' },
  { customerName: 'Thales Cybersecurity Campus', headquarters: 'France', industryVertical: 'Secure Technology Infrastructure', yearOfEstablishment: 2000, companyRevenue: 'US$ 20.2 Bn' },
  { customerName: 'Irish Rail – Dublin Heuston Depot', headquarters: 'Ireland', industryVertical: 'Railways / Transport Infrastructure', yearOfEstablishment: 1987, companyRevenue: 'US$ 450 Mn' },
  { customerName: 'Enel Green Power – Catania Solar Farm', headquarters: 'Italy', industryVertical: 'Renewable Energy Facilities', yearOfEstablishment: 2008, companyRevenue: 'US$ 88.7 Bn (Group)' },
  { customerName: 'BMW Group Plant Dingolfing', headquarters: 'Germany', industryVertical: 'Automotive Manufacturing', yearOfEstablishment: 1967, companyRevenue: 'US$ 168 Bn (Group)' },
  { customerName: 'Telefónica Madrid Data Hub', headquarters: 'Spain', industryVertical: 'Telecom Infrastructure', yearOfEstablishment: 1924, companyRevenue: 'US$ 44.7 Bn' },
  { customerName: 'GSK Stevenage R&D Campus', headquarters: 'U.K.', industryVertical: 'Pharmaceutical Manufacturing / Laboratories', yearOfEstablishment: 2000, companyRevenue: 'US$ 33.0 Bn' },
  { customerName: 'SNCF Réseau – LGV Sud-Est', headquarters: 'France', industryVertical: 'High-Speed Rail / Transport Infrastructure', yearOfEstablishment: 1937, companyRevenue: 'US$ 38.2 Bn' },
  { customerName: 'Volkswagen Wolfsburg Plant', headquarters: 'Germany', industryVertical: 'Automotive Manufacturing', yearOfEstablishment: 1938, companyRevenue: 'US$ 322 Bn (Group)' },
  { customerName: 'Maersk APM Terminals – Gothenburg', headquarters: 'Sweden', industryVertical: 'Seaports and Harbors', yearOfEstablishment: 1904, companyRevenue: 'US$ 51.2 Bn (Group)' },
  { customerName: 'Rolls-Royce Derby Manufacturing', headquarters: 'U.K.', industryVertical: 'Aerospace / Defense Manufacturing', yearOfEstablishment: 1906, companyRevenue: 'US$ 18.9 Bn' },
  { customerName: 'Carrefour Distribution Center – Lyon', headquarters: 'France', industryVertical: 'Distribution Centers / Retail Logistics', yearOfEstablishment: 1958, companyRevenue: 'US$ 93.9 Bn (Group)' },
  { customerName: 'Microsoft Azure – Dublin Region', headquarters: 'Ireland', industryVertical: 'Cloud Infrastructure Facilities', yearOfEstablishment: 2009, companyRevenue: 'US$ 245 Bn (Global)' },
  { customerName: 'Rheinmetall Military Depot', headquarters: 'Germany', industryVertical: 'Defense Warehouses / Military Bases', yearOfEstablishment: 1889, companyRevenue: 'US$ 7.2 Bn' },
  { customerName: 'Stade de France – Paris', headquarters: 'France', industryVertical: 'Sports Stadiums / Event Grounds', yearOfEstablishment: 1998, companyRevenue: 'Public / Event Venue' },
  { customerName: 'Crossrail – Elizabeth Line Depots', headquarters: 'U.K.', industryVertical: 'Railways / Civil Infrastructure', yearOfEstablishment: 2009, companyRevenue: 'US$ 25 Bn (Project)' },
];

const FENCING_TYPES = [
  'High-Security Fencing; Anti-Climb Systems; Smart Perimeter Security',
  'Wire and Mesh Fencing; Palisade Fencing; Barrier Systems',
  'Integrated Surveillance Fencing; PIDS-ready perimeter systems',
  'Anti-Climb Systems; Vehicle access gates; High-security gates',
  'Smart Perimeter Security; CCTV-integrated fencing',
];

const PROJECT_TYPES = [
  'New Installation', 'Expansion', 'Upgrade / Retrofitting',
  'Maintenance Contract', 'Future Construction Package'
];

const SUPPLIERS = [
  'Betafence / Heras / Jacksons Fencing',
  'Coherent certified regional installer network',
  'Multi-vendor / EPC contractor framework',
  'OEM direct + local installation partner',
];

const FENCING_PROVIDERS = [
  'Heras / Betafence / Zaun',
  'Jacksons Fencing / CLD Fencing',
  'Regional EPC security contractor',
  'In-house maintenance + OEM supply',
];

function pick(arr, i) { return arr[i % arr.length]; }

function rowToRecord(row) {
  const rec = { sNo: row[0] };
  PROP1_KEYS.forEach((k, i) => { rec[k] = String(row[i + 1] ?? '').trim(); });
  PROP2_KEYS.forEach((k, i) => { rec[k] = String(row[i + 7] ?? '').trim(); });
  PROP3_KEYS.forEach((k, i) => { rec[k] = String(row[i + 25] ?? '').trim(); });
  return rec;
}

function isPlaceholder(val) {
  if (!val) return true;
  const v = String(val).trim().toLowerCase();
  return v === 'xx' || v === 'x' || v.startsWith('customer ') && v !== 'customer name';
}

function fillDemo(rec, demo, index) {
  const hq = demo.headquarters;
  rec.customerName = demo.customerName;
  rec.yearOfEstablishment = String(demo.yearOfEstablishment);
  rec.headquarters = hq;
  rec.industryVertical = demo.industryVertical;
  rec.companyRevenue = demo.companyRevenue;
  rec.existingSuppliers = pick(SUPPLIERS, index);

  const slug = demo.customerName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 12);
  rec.contactName = isPlaceholder(rec.contactName) ? `Contact ${index + 1}` : rec.contactName;
  rec.designation = isPlaceholder(rec.designation) ? 'Head of Facilities / Security' : rec.designation;
  rec.email = isPlaceholder(rec.email) ? `security@${slug}.demo` : rec.email;
  rec.phone = isPlaceholder(rec.phone) ? `+49 30 ${1000 + index}${2000 + index}` : rec.phone;
  rec.linkedin = isPlaceholder(rec.linkedin) ? `https://www.linkedin.com/in/demo-${slug}/` : rec.linkedin;
  rec.projectType = isPlaceholder(rec.projectType) ? pick(PROJECT_TYPES, index) : rec.projectType;
  rec.projectName = isPlaceholder(rec.projectName) ? `${demo.customerName} Perimeter Security Upgrade` : rec.projectName;
  rec.projectLocation = isPlaceholder(rec.projectLocation) ? `${hq} – Primary Facility` : rec.projectLocation;
  rec.projectStatus = isPlaceholder(rec.projectStatus) ? pick(['Planning', 'Tender Released', 'Under Construction', 'Vendor prequalification'], index) : rec.projectStatus;
  rec.projectValue = isPlaceholder(rec.projectValue) ? `US$ ${(2 + (index % 8) * 1.5).toFixed(1)} Mn` : rec.projectValue;
  rec.fencingRequirementType = isPlaceholder(rec.fencingRequirementType) ? pick(FENCING_TYPES, index) : rec.fencingRequirementType;
  rec.productCategoryProcured = isPlaceholder(rec.productCategoryProcured) ? 'Palisade fencing, anti-climb mesh, security gates, access barriers' : rec.productCategoryProcured;
  rec.procurementQuantity = isPlaceholder(rec.procurementQuantity) ? `${120 + index * 15} Units / ${45 + index * 5} Tons` : rec.procurementQuantity;
  rec.procurementTimeline = isPlaceholder(rec.procurementTimeline) ? `Q${(index % 4) + 1} 2026 – Q${(index % 4) + 1} 2027` : rec.procurementTimeline;
  rec.currentSecurityTechnology = isPlaceholder(rec.currentSecurityTechnology) ? 'Legacy perimeter fencing, CCTV, access control, PIDS (partial)' : rec.currentSecurityTechnology;
  rec.supplierSwitchingProbability = isPlaceholder(rec.supplierSwitchingProbability) ? pick(['Low', 'Medium', 'Medium – compliance-driven review', 'High – active tender'], index) : rec.supplierSwitchingProbability;
  rec.priceSensitivity = isPlaceholder(rec.priceSensitivity) ? pick(['Medium', 'Low', 'Medium to Low', 'High'], index) : rec.priceSensitivity;
  rec.procurementDecisionStage = isPlaceholder(rec.procurementDecisionStage) ? pick(['RFI / vendor shortlisting', 'Tender monitoring', 'Prequalification', 'Award pending'], index) : rec.procurementDecisionStage;

  rec.currentFencingProvider = isPlaceholder(rec.currentFencingProvider) ? pick(FENCING_PROVIDERS, index) : rec.currentFencingProvider;
  rec.productPortfolioUsed = isPlaceholder(rec.productPortfolioUsed) ? 'Palisade panels, welded mesh, sliding gates, bollards' : rec.productPortfolioUsed;
  rec.estimatedContractValue = isPlaceholder(rec.estimatedContractValue) ? `US$ ${(0.8 + index * 0.2).toFixed(1)} – ${(2 + index * 0.3).toFixed(1)} Mn` : rec.estimatedContractValue;
  rec.keyCompetitiveAdvantage = isPlaceholder(rec.keyCompetitiveAdvantage) ? 'EU compliance, rapid install, integrated surveillance readiness' : rec.keyCompetitiveAdvantage;
  rec.renewalOpportunityTimeline = isPlaceholder(rec.renewalOpportunityTimeline) ? `2026–2028 (Best Effort Basis)` : rec.renewalOpportunityTimeline;
  rec.tenderName = isPlaceholder(rec.tenderName) ? `${demo.customerName} – Perimeter Security & Fencing Package` : rec.tenderName;
  rec.releaseDate = isPlaceholder(rec.releaseDate) ? `${['Jan', 'Mar', 'Jun', 'Sep'][index % 4]} 2026 (Estimated)` : rec.releaseDate;
  rec.qualificationCriteria = isPlaceholder(rec.qualificationCriteria) ? 'ISO 9001, EU procurement compliance, critical infrastructure references' : rec.qualificationCriteria;
  rec.estimatedProcurementBudget = isPlaceholder(rec.estimatedProcurementBudget) ? `US$ ${(1.5 + index * 0.4).toFixed(1)} Mn` : rec.estimatedProcurementBudget;
  rec.bidParticipants = isPlaceholder(rec.bidParticipants) ? 'Heras, Betafence, Zaun, Regional EPC (Best Effort Basis)' : rec.bidParticipants;

  return rec;
}

const wb = XLSX.readFile(EXCEL);
const ws = wb.Sheets['Customer Database'];
const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

const headers = {
  title: 'Customer Intelligence / Project Pipeline Database',
  proposition1: {
    group: 'Company & Facility Identification',
    subgroup: 'Company Overview',
    columns: ['S.No.', ...PROP1_KEYS.map((k, i) => {
      const labels = ['Customer Name', 'Year of Establishment', 'Headquarters', 'Industry Vertical', 'Company Revenue', 'Existing Suppliers  (on Best Effort basis)'];
      return labels[i];
    })]
  },
  proposition2: {
    group: 'Decision-Maker Contact Details & Project & Product Details',
    columns: ['S.No.', ...[
      'Name', 'Designation', 'Email', 'Phone / Mobile', 'Linkedin Address',
      'Project Type (New Installation/Expansion/Upgrade/Retrofitting/Maintenance Contract)',
      'Project Name ', 'Project Location ',
      'Project Status (Planning/Tender Released/Awarded/Under Construction/Operational)',
      'Project Value (US$) ',
      'Fencing Requirement Type (High-Security Fencing/Anti-Climb Systems/Smart Perimeter Security/Integrated Surveillance Fencing/Anti-Drone Security Systems) ',
      'Product Category Procured ', 'Tentative Procurement Quantity (Tons / Units) ',
      'Procurement Timeline ', 'Current Security Technology Used ',
      'Supplier Switching Probability ', 'Price Sensitivity (High / Medium / Low) ',
      'Procurement Decision Stage '
    ]]
  },
  proposition3: {
    group: 'Competitive Mapping & Upcoming Tender Intelligence',
    columns: ['S.No.', ...[
      'Current Fencing Provider ', 'Product Portfolio Used ', 'Estimated Contract Value ',
      'Key Competitive Advantage', 'Renewal Opportunity Timeline (Best Effort Basis)',
      'Tender Name ', 'Release Date ', 'Qualification Criteria ',
      'Estimated Procurement Budget ', 'Bid Participants (Best Effort Basis) '
    ]]
  }
};

const rawRows = data.slice(7).filter(r => r[0] !== '' && r[0] !== 'xx');
const records = [];

rawRows.forEach((row, idx) => {
  let rec = rowToRecord(row);
  if (idx === 0 && rec.customerName.includes('Fraport')) {
    if (rec.procurementQuantity === 'XX' || rec.procurementQuantity === 'xx') rec.procurementQuantity = '850 Units / 320 Tons (Estimated)';
    if (rec.procurementTimeline === 'XX' || rec.procurementTimeline === 'xx') rec.procurementTimeline = '2026–2030 (Terminal 2 modernization program)';
    if (isPlaceholder(rec.currentFencingProvider)) rec.currentFencingProvider = 'Regional aviation security EPC / access control integrators';
    if (isPlaceholder(rec.bidParticipants)) rec.bidParticipants = 'Aviation security EPC firms, perimeter specialists (Best Effort Basis)';
    records.push(rec);
  } else {
    const demo = DEMO_CUSTOMERS[(idx - 1) % DEMO_CUSTOMERS.length];
    rec.sNo = idx + 1;
    rec = fillDemo(rec, demo, idx);
    records.push(rec);
  }
});

// Ensure we have at least 10 rows for demo
while (records.length < 10) {
  const i = records.length;
  const demo = DEMO_CUSTOMERS[i % DEMO_CUSTOMERS.length];
  records.push(fillDemo({ sNo: i + 1 }, demo, i));
}

const output = { headers, records };
fs.writeFileSync(OUT, JSON.stringify(output, null, 2), 'utf8');
console.log('Wrote', records.length, 'records to', OUT);
