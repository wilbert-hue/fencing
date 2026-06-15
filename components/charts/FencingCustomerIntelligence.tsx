'use client'

import { useEffect, useState } from 'react'

interface CustomerRecord {
  sNo: number | string
  customerName: string
  yearOfEstablishment: string
  headquarters: string
  industryVertical: string
  companyRevenue: string
  existingSuppliers: string
  contactName: string
  designation: string
  email: string
  phone: string
  linkedin: string
  projectType: string
  projectName: string
  projectLocation: string
  projectStatus: string
  projectValue: string
  fencingRequirementType: string
  productCategoryProcured: string
  procurementQuantity: string
  procurementTimeline: string
  currentSecurityTechnology: string
  supplierSwitchingProbability: string
  priceSensitivity: string
  procurementDecisionStage: string
  currentFencingProvider: string
  productPortfolioUsed: string
  estimatedContractValue: string
  keyCompetitiveAdvantage: string
  renewalOpportunityTimeline: string
  tenderName: string
  releaseDate: string
  qualificationCriteria: string
  estimatedProcurementBudget: string
  bidParticipants: string
}

interface CustomerIntelligenceData {
  headers: { title: string }
  records: CustomerRecord[]
}

const thBase = 'border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black'
const tdBase = 'border border-gray-300 px-3 py-2 text-sm text-black align-top'

function LinkCell({ value, type }: { value: string; type: 'email' | 'linkedin' }) {
  if (!value || value === 'XX' || value === 'xx') return <span>{value}</span>
  if (type === 'email') {
    return (
      <a href={`mailto:${value}`} className="text-blue-600 hover:underline break-all">
        {value}
      </a>
    )
  }
  const href = value.startsWith('http') ? value : `https://${value}`
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
      {value}
    </a>
  )
}

export default function FencingCustomerIntelligence() {
  const [data, setData] = useState<CustomerIntelligenceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/customer-intelligence.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!data) {
    return <p className="text-black p-6">Unable to load customer intelligence data.</p>
  }

  const { records } = data

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-2">
        {data.headers.title}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Europe Fencing Market — {records.length} customer records
      </p>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th rowSpan={2} className={`bg-[#FFF8DC] ${thBase} min-w-[60px] text-center`}>S.No.</th>
              <th colSpan={6} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                Company &amp; Facility Identification
              </th>
              <th colSpan={5} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                Decision-Maker Contact Details
              </th>
              <th colSpan={13} className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                Project &amp; Product Details
              </th>
              <th colSpan={5} className="bg-[#DDA0DD] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                Competitive Mapping
              </th>
              <th colSpan={5} className="bg-[#DEB887] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                Upcoming Tender Intelligence
              </th>
            </tr>
            <tr className="bg-gray-100">
              {/* Company Overview */}
              <th className={`bg-[#FFF8DC] ${thBase} min-w-[220px]`}>Customer Name</th>
              <th className={`bg-[#FFF8DC] ${thBase} min-w-[120px]`}>Year of Establishment</th>
              <th className={`bg-[#FFF8DC] ${thBase} min-w-[120px]`}>Headquarters</th>
              <th className={`bg-[#FFF8DC] ${thBase} min-w-[200px]`}>Industry Vertical</th>
              <th className={`bg-[#FFF8DC] ${thBase} min-w-[130px]`}>Company Revenue</th>
              <th className={`bg-[#FFF8DC] ${thBase} min-w-[250px]`}>Existing Suppliers (on Best Effort basis)</th>
              {/* Contact */}
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[130px]`}>Name</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[150px]`}>Designation</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[180px]`}>Email</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[140px]`}>Phone / Mobile</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[180px]`}>Linkedin Address</th>
              {/* Project & Product */}
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[180px]`}>Project Type</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[200px]`}>Project Name</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[180px]`}>Project Location</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[200px]`}>Project Status</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[130px]`}>Project Value (US$)</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[220px]`}>Fencing Requirement Type</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[200px]`}>Product Category Procured</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[160px]`}>Tentative Procurement Quantity</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[140px]`}>Procurement Timeline</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[200px]`}>Current Security Technology Used</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[180px]`}>Supplier Switching Probability</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[140px]`}>Price Sensitivity</th>
              <th className={`bg-[#B0E0E6] ${thBase} min-w-[180px]`}>Procurement Decision Stage</th>
              {/* Competitive */}
              <th className={`bg-[#DDA0DD] ${thBase} min-w-[160px]`}>Current Fencing Provider</th>
              <th className={`bg-[#DDA0DD] ${thBase} min-w-[200px]`}>Product Portfolio Used</th>
              <th className={`bg-[#DDA0DD] ${thBase} min-w-[150px]`}>Estimated Contract Value</th>
              <th className={`bg-[#DDA0DD] ${thBase} min-w-[200px]`}>Key Competitive Advantage</th>
              <th className={`bg-[#DDA0DD] ${thBase} min-w-[180px]`}>Renewal Opportunity Timeline</th>
              {/* Tender */}
              <th className={`bg-[#DEB887] ${thBase} min-w-[200px]`}>Tender Name</th>
              <th className={`bg-[#DEB887] ${thBase} min-w-[120px]`}>Release Date</th>
              <th className={`bg-[#DEB887] ${thBase} min-w-[200px]`}>Qualification Criteria</th>
              <th className={`bg-[#DEB887] ${thBase} min-w-[160px]`}>Estimated Procurement Budget</th>
              <th className={`bg-[#DEB887] ${thBase} min-w-[200px]`}>Bid Participants</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className={`${tdBase} text-center`}>{r.sNo}</td>
                <td className={tdBase}>{r.customerName}</td>
                <td className={tdBase}>{r.yearOfEstablishment}</td>
                <td className={tdBase}>{r.headquarters}</td>
                <td className={tdBase}>{r.industryVertical}</td>
                <td className={tdBase}>{r.companyRevenue}</td>
                <td className={tdBase}>{r.existingSuppliers}</td>
                <td className={tdBase}>{r.contactName}</td>
                <td className={tdBase}>{r.designation}</td>
                <td className={tdBase}><LinkCell value={r.email} type="email" /></td>
                <td className={tdBase}>{r.phone}</td>
                <td className={tdBase}><LinkCell value={r.linkedin} type="linkedin" /></td>
                <td className={tdBase}>{r.projectType}</td>
                <td className={tdBase}>{r.projectName}</td>
                <td className={tdBase}>{r.projectLocation}</td>
                <td className={tdBase}>{r.projectStatus}</td>
                <td className={tdBase}>{r.projectValue}</td>
                <td className={tdBase}>{r.fencingRequirementType}</td>
                <td className={tdBase}>{r.productCategoryProcured}</td>
                <td className={tdBase}>{r.procurementQuantity}</td>
                <td className={tdBase}>{r.procurementTimeline}</td>
                <td className={tdBase}>{r.currentSecurityTechnology}</td>
                <td className={tdBase}>{r.supplierSwitchingProbability}</td>
                <td className={tdBase}>{r.priceSensitivity}</td>
                <td className={tdBase}>{r.procurementDecisionStage}</td>
                <td className={tdBase}>{r.currentFencingProvider}</td>
                <td className={tdBase}>{r.productPortfolioUsed}</td>
                <td className={tdBase}>{r.estimatedContractValue}</td>
                <td className={tdBase}>{r.keyCompetitiveAdvantage}</td>
                <td className={tdBase}>{r.renewalOpportunityTimeline}</td>
                <td className={tdBase}>{r.tenderName}</td>
                <td className={tdBase}>{r.releaseDate}</td>
                <td className={tdBase}>{r.qualificationCriteria}</td>
                <td className={tdBase}>{r.estimatedProcurementBudget}</td>
                <td className={tdBase}>{r.bidParticipants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
