/**
 * Generate customer intelligence JSON from Excel template.
 * Row 1: real data from Excel (Fraport). Remaining rows: "xx" placeholders.
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
  return v === 'xx' || v === 'x';
}

function createPlaceholderRecord(sNo) {
  const rec = { sNo };
  for (const k of [...PROP1_KEYS, ...PROP2_KEYS, ...PROP3_KEYS]) {
    rec[k] = 'xx';
  }
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
    columns: ['S.No.', 'Customer Name', 'Year of Establishment', 'Headquarters', 'Industry Vertical', 'Company Revenue', 'Existing Suppliers  (on Best Effort basis)']
  },
  proposition2: {
    group: 'Decision-Maker Contact Details & Project & Product Details',
    columns: ['S.No.', 'Name', 'Designation', 'Email', 'Phone / Mobile', 'Linkedin Address', 'Project Type', 'Project Name', 'Project Location', 'Project Status', 'Project Value (US$)', 'Fencing Requirement Type', 'Product Category Procured', 'Tentative Procurement Quantity', 'Procurement Timeline', 'Current Security Technology Used', 'Supplier Switching Probability', 'Price Sensitivity', 'Procurement Decision Stage']
  },
  proposition3: {
    group: 'Competitive Mapping & Upcoming Tender Intelligence',
    columns: ['S.No.', 'Current Fencing Provider', 'Product Portfolio Used', 'Estimated Contract Value', 'Key Competitive Advantage', 'Renewal Opportunity Timeline', 'Tender Name', 'Release Date', 'Qualification Criteria', 'Estimated Procurement Budget', 'Bid Participants']
  }
};

const rawRows = data.slice(7).filter(r => r[0] !== '' && r[0] !== 'xx');
const records = [];

rawRows.forEach((row, idx) => {
  if (idx === 0) {
    const rec = rowToRecord(row);
    if (rec.procurementQuantity === 'XX' || rec.procurementQuantity === 'xx') {
      rec.procurementQuantity = '850 Units / 320 Tons (Estimated)';
    }
    if (rec.procurementTimeline === 'XX' || rec.procurementTimeline === 'xx') {
      rec.procurementTimeline = '2026–2030 (Terminal 2 modernization program)';
    }
    if (isPlaceholder(rec.currentFencingProvider)) {
      rec.currentFencingProvider = 'Regional aviation security EPC / access control integrators';
    }
    if (isPlaceholder(rec.bidParticipants)) {
      rec.bidParticipants = 'Aviation security EPC firms, perimeter specialists (Best Effort Basis)';
    }
    records.push(rec);
  } else {
    records.push(createPlaceholderRecord(idx + 1));
  }
});

fs.writeFileSync(OUT, JSON.stringify({ headers, records }, null, 2), 'utf8');
console.log('Wrote', records.length, 'records (1 populated,', records.length - 1, 'placeholders) to', OUT);
