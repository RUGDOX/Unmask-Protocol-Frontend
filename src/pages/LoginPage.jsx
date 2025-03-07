
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from '../contexts/AuthContext';
import { Lock, User, Shield, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from "../components/ui/alert";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to homepage
  const from = location.state?.from?.pathname || '/';
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
    
    // Check for session expired parameter
    const params = new URLSearchParams(location.search);
    if (params.get('session') === 'expired') {
      setError('Your session has expired. Please log in again.');
    }
  }, [isAuthenticated, navigate, from, location]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Implement rate limiting on client side
      if (loginAttempts >= 5) {
        setError('Too many login attempts. Please try again later.');
        setTimeout(() => {
          setLoginAttempts(0);
        }, 60000); // Reset after 1 minute
        return;
      }
      
      // Basic validation
      if (!username.trim() || !password.trim()) {
        setError('Username and password are required');
        return;
      }
      
      const success = await login({ username, password });
      
      if (success) {
        // Successful login
        setLoginAttempts(0);
        // Navigate will be handled in the login function
      } else {
        // Login failed - increment attempt counter
        setLoginAttempts(prev => prev + 1);
        setError('Invalid username or password');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      setLoginAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="flex justify-center mb-8">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login to Unmask Protocol</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the secure area
            </CardDescription>
          </CardHeader>
          
          {error && (
            <div className="px-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    disabled={isLoading || loginAttempts >= 5}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    disabled={isLoading || loginAttempts >= 5}
                  />
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>For demo purposes:</p>
                <p>- Username: <strong>admin</strong> (for admin access)</p>
                <p>- Username: <strong>agent</strong> (for agent access)</p>
                <p>- Any password will work</p>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || loginAttempts >= 5}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
