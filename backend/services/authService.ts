const authService = {
  login: async (email: string, password: string) => {
    console.log("Logging in:", email);
    return { success: true, token: "demo-token" };
  },

  logout: () => {
    console.log("User logged out");
  },

  getCurrentUser: () => {
    return {
      id: "1",
      name: "Demo User",
      email: "demo@wepay.com"
    };
  }
};

export default authService;
