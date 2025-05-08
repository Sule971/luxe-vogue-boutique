
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import PasswordStrengthMeter from "@/components/auth/PasswordStrength";
import Layout from "@/components/layout/Layout";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, checkPasswordStrength, generatePassword } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(checkPasswordStrength(""));
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };
  
  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    setConfirmPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (passwordStrength === 'weak') {
      setError("Please use a stronger password");
      return;
    }
    
    try {
      setIsLoading(true);
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-playfair font-bold mb-2">Create an Account</h1>
              <p className="text-gray-600">Join our exclusive community of fashion enthusiasts</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="password">Password</Label>
                  <button 
                    type="button" 
                    onClick={handleGeneratePassword}
                    className="text-sm text-luxury-purple hover:underline flex items-center"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {password && (
                  <div className="mt-3">
                    <PasswordStrengthMeter strength={passwordStrength} />
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-luxury-purple hover:bg-luxury-purple-light btn-hover-effect"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-luxury-purple hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
