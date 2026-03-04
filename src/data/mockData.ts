import { WelfareScheme, VerifiableCredential } from '../types';

export const MOCK_SCHEMES: WelfareScheme[] = [
  {
    id: 'scheme-1',
    title: 'pmKisanSamman',
    description: 'pmKisanDesc',
    category: 'Agriculture',
    benefits: ['₹6,000 annual support', 'Direct Bank Transfer', 'Quarterly installments'],
    eligibility: ['Small and marginal farmers', 'Valid land records', 'Aadhar linked bank account'],
    status: 'eligible'
  },
  {
    id: 'scheme-2',
    title: 'jananiSuraksha',
    description: 'Direct Benefit Transfer for various central and state government schemes.',
    category: 'Employment',
    benefits: ['Guaranteed wage employment', 'Unemployment allowance', 'Work within 5km radius'],
    eligibility: ['Rural household members', 'Willingness to do unskilled manual work', 'Adult members'],
    status: 'eligible'
  },
  {
    id: 'scheme-3',
    title: 'laxmiBhandar',
    description: 'Direct Benefit Transfer for various central and state government schemes.',
    category: 'Financial',
    benefits: ['Elimination of middleman', 'Real-time tracking', 'Direct credit to Aadhar linked account'],
    eligibility: ['Registered beneficiaries', 'Valid Aadhar', 'Active bank account'],
    status: 'eligible'
  }
];


export const MOCK_CREDENTIALS: VerifiableCredential[] = [
  {
    id: 'vc-001',
    type: ['IdentityCredential', 'AadhaarVC'],
    issuer: 'did:gov:uidai',
    issuanceDate: '2023-10-15T10:00:00Z',
    credentialSubject: {
      name: 'Rajesh Kumar',
      dob: '1985-05-12',
      gender: 'Male',
      pincode: '841201'
    },
    status: 'active',
    icon: 'id-card'
  },
  {
    id: 'vc-002',
    type: ['FarmerCredential', 'KisanCreditVC'],
    issuer: 'did:gov:agriculture',
    issuanceDate: '2024-01-20T14:30:00Z',
    credentialSubject: {
      landSize: '2.5 Acres',
      cropType: 'Wheat/Rice',
      location: 'Saran, Bihar'
    },
    status: 'active',
    icon: 'wheat'
  }
];
