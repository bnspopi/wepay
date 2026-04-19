const welfareService = {
  getSchemes: async () => {
    return [
      { id: 1, name: "PM Kisan Samman Nidhi", description: "₹6,000/year direct income support for farmers." },
      { id: 2, name: "MGNREGA", description: "100 days guaranteed wage employment per year." },
      { id: 3, name: "Ayushman Bharat", description: "Health coverage up to ₹5 lakh per family." },
      { id: 4, name: "PM Awas Yojana", description: "Financial assistance for housing construction." },
    ];
  },

  checkEligibility: async (user: { state: string; income: number; age: number }) => {
    console.log("Checking eligibility for:", user);
    return { eligible: user.income < 300000 };
  }
};

export { welfareService };
