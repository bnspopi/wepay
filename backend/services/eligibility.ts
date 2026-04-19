export interface EligibilityResult {
  status: 'Eligible' | 'Not Eligible';
  amount?: number;
}

export const checkEligibility = (state: string, schemeName: string): EligibilityResult => {
  const universalSchemes: Record<string, number> = {
    'PM-KISAN': 2000,
    'MGNREGA': 3000,
    'PM-AWAS-YOJANA': 120000,
    'PM-UJJWALA': 1600,
    'AYUSHMAN-BHARAT': 500000
  };

  if (universalSchemes[schemeName]) {
    return { status: 'Eligible', amount: universalSchemes[schemeName] };
  }

  const stateSchemes: Record<string, Record<string, number>> = {
    'Odisha': { 'KALIA': 4000, 'Biju Swasthya Kalyan': 500000 },
    'West Bengal': { 'Lakshmir Bhandar': 1000, 'Kanyashree': 25000 },
    'Telangana': { 'Rythu Bandhu': 5000, 'Dalit Bandhu': 1000000 },
    'Andhra Pradesh': { 'YSR Rythu Bharosa': 13500, 'Amma Vodi': 15000 },
    'Tamil Nadu': { 'Kalaignar Magalir Urimai': 1000 },
    'Maharashtra': { 'Majhi Ladki Bahin': 1500 },
    'Madhya Pradesh': { 'Ladli Behna': 1250 },
    'Uttar Pradesh': { 'Kanya Sumangala': 15000 },
    'Bihar': { 'Mukhyamantri Kanya Utthan': 50000 },
    'Karnataka': { 'Gruha Lakshmi': 2000, 'Yuva Nidhi': 3000 }
  };

  if (state && stateSchemes[state]?.[schemeName]) {
    return { status: 'Eligible', amount: stateSchemes[state][schemeName] };
  }

  if (state && (schemeName.toLowerCase().includes('welfare') || schemeName.toLowerCase().includes('yojana'))) {
    return { status: 'Eligible', amount: 1500 };
  }

  return { status: 'Not Eligible' };
};

