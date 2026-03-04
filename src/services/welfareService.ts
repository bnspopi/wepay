const welfareService = {
  sendMoney: (amount: number) => {
    console.log("Transaction processed:", amount);
    return { status: "success", amount };
  },

  getBalance: () => {
    return 10000;
  },

  getTransactionHistory: () => {
    return [];
  }
};

export default welfareService;
