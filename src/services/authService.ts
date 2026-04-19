const authService = {
  login: async (email: string, password: string) => {
    console.log("Login attempt:", email);
    return { success: true };
  },

  register: async (data: { email: string; password: string; name?: string }) => {
    console.log("Register user:", data);
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("User logged out");
  },

  getCurrentUser: () => {
    return null;
  }
};

export { authService };
