const schemes = [
  { id: 1, title: 'PM Kisan Samman Nidhi', description: '₹6,000/year direct income support for farmers.', category: 'Agriculture', benefits: ['₹6,000 annual support', 'Direct Bank Transfer', 'Quarterly installments'], eligibility: ['Small and marginal farmers', 'Valid land records', 'Aadhar linked bank account'] },
  { id: 2, title: 'MGNREGA', description: '100 days guaranteed wage employment per year.', category: 'Employment', benefits: ['Guaranteed wage employment', 'Unemployment allowance', 'Work within 5km radius'], eligibility: ['Rural household members', 'Adult members'] },
  { id: 3, title: 'Ayushman Bharat', description: 'Health coverage up to ₹5 lakh per family per year.', category: 'Health', benefits: ['₹5,00,000 health coverage', 'Cashless treatment', 'Pan India valid'], eligibility: ['BPL families', 'Valid Aadhar'] },
  { id: 4, title: 'PM Awas Yojana', description: 'Financial assistance for pucca house construction.', category: 'Housing', benefits: ['₹1,20,000 assistance', 'Direct bank transfer'], eligibility: ['BPL families', 'No pucca house'] },
];

export const getSchemes = async () => schemes;

export const getSchemeById = async (id: string) => {
  const numId = parseInt(id);
  return isNaN(numId) ? null : schemes.find(s => s.id === numId) || null;
};

export const getUserWelfarePayments = async (userId: string) => [];

export const checkEligibility = async (data: { schemeName: string; state: string }) => {
  return { status: 'Eligible', amount: 1000 };
};

