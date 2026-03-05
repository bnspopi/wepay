const welfareService = {
  getSchemes: async () => {
    return [
      {
        id: 1,
        name: "Food Security Scheme",
        description: "Provides subsidized food grains to eligible citizens"
      },
      {
        id: 2,
        name: "Health Support Scheme",
        description: "Free healthcare for low-income families"
      }
    ];
  },

  checkEligibility: async (user: any) => {
    console.log("Checking eligibility for:", user);
    return { eligible: true };
  }
};

export { welfareService };
