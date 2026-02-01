import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  isVerified: boolean;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  resendOTP: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<void>;
  pendingVerification: { email: string; password: string; name: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (in production, this would be in a real database)
const MOCK_USERS_KEY = "mock_users_db";
const CURRENT_USER_KEY = "current_user";

const getMockUsers = (): User[] => {
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  if (!stored) {
    // Initialize with admin user
    const adminUser: User = {
      id: "admin-1",
      email: "admin@microjobs.ph",
      name: "Admin User",
      role: "admin",
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([adminUser]));
    return [adminUser];
  }
  return JSON.parse(stored);
};

const saveMockUsers = (users: User[]) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVerification, setPendingVerification] = useState<{
    email: string;
    password: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    // Check for existing session
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getMockUsers();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      setIsLoading(false);
      throw new Error("User already exists");
    }

    // Store pending verification
    setPendingVerification({ email, password, name });
    
    // In production, this would send a real OTP via email
    const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔐 Your OTP is:", mockOTP);
    localStorage.setItem("pending_otp", mockOTP);
    
    setIsLoading(false);
    toast.success("OTP sent to your email!");
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedOTP = localStorage.getItem("pending_otp");
    
    if (otp !== storedOTP) {
      setIsLoading(false);
      toast.error("Invalid OTP");
      return false;
    }

    if (!pendingVerification) {
      setIsLoading(false);
      toast.error("No pending verification");
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: pendingVerification.email,
      name: pendingVerification.name,
      role: "user",
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    const users = getMockUsers();
    users.push(newUser);
    saveMockUsers(users);

    // Store password (in production, this would be hashed)
    const passwords = JSON.parse(localStorage.getItem("mock_passwords") || "{}");
    passwords[pendingVerification.email] = pendingVerification.password;
    localStorage.setItem("mock_passwords", JSON.stringify(passwords));

    // Log user in
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    localStorage.removeItem("pending_otp");
    setPendingVerification(null);

    setIsLoading(false);
    toast.success("Registration successful!");
    return true;
  };

  const resendOTP = async () => {
    if (!pendingVerification) {
      toast.error("No pending verification");
      return;
    }

    // Generate new OTP
    const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔐 Your new OTP is:", mockOTP);
    localStorage.setItem("pending_otp", mockOTP);
    
    toast.success("New OTP sent!");
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const trimmedEmail = email.trim();
    const users = getMockUsers();
    let foundUser = users.find(u => u.email === trimmedEmail);

    // Check password
    const passwords = JSON.parse(localStorage.getItem("mock_passwords") || "{}");
    const storedPassword = passwords[trimmedEmail];

    if (!foundUser) {
      setIsLoading(false);
      throw new Error("Account not found. Please create an account and verify your email first.");
    }

    // Admin default password
    if (trimmedEmail === "admin@microjobs.ph" && password === "admin123") {
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      setIsLoading(false);
      toast.success("Welcome back, Admin!");
      return;
    }

    if (storedPassword !== password) {
      setIsLoading(false);
      throw new Error("Invalid password");
    }

    setUser(foundUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    setIsLoading(false);
    toast.success(`Welcome back, ${foundUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.success("Logged out successfully");
  };

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getMockUsers();
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      setIsLoading(false);
      throw new Error("User not found");
    }

    // Store email for later use in reset
    localStorage.setItem("pending_reset_email", email);

    // In production, this would send a real password reset link via email
    const mockResetCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔑 Your password reset code is:", mockResetCode);
    localStorage.setItem("pending_reset_code", mockResetCode);
    
    setIsLoading(false);
    toast.success("Password reset link sent to your email!");
  };

  const resetPassword = async (code: string, newPassword: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedCode = localStorage.getItem("pending_reset_code");
    
    if (code !== storedCode) {
      setIsLoading(false);
      toast.error("Invalid reset code");
      return;
    }

    const users = getMockUsers();
    const foundUser = users.find(u => u.email === localStorage.getItem("pending_reset_email"));

    if (!foundUser) {
      setIsLoading(false);
      throw new Error("User not found");
    }

    // Update password
    const passwords = JSON.parse(localStorage.getItem("mock_passwords") || "{}");
    passwords[foundUser.email] = newPassword;
    localStorage.setItem("mock_passwords", JSON.stringify(passwords));

    // Log user in
    setUser(foundUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    localStorage.removeItem("pending_reset_code");
    localStorage.removeItem("pending_reset_email");

    setIsLoading(false);
    toast.success("Password reset successful!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        verifyOTP,
        resendOTP,
        requestPasswordReset,
        resetPassword,
        pendingVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
