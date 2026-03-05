const authService = {
  login: async (email: string, password: string) => {
    console.log("Login attempt:", email);
    return { success: true };
  },

  register: async (data: any) => {
    console.log("Register user:", data);
    return { success: true };
  },

  logout: () => {
    console.log("User logged out");
  },

  getCurrentUser: () => {
    return null;
  }
};

export { authService };
