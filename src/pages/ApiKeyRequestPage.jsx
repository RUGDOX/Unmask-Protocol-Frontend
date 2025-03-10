import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Shield, Info, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';

const ApiKeyRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organization: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    useCase: '',
    usageVolume: 'low',
    requestedEndpoints: [],
    security: '',
    agreeTerms: false,
    agreePrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }
    
    if (!formData.website.trim()) {
      newErrors.website = 'Website URL is required';
    } else if (!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/i.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    if (!formData.useCase.trim()) {
      newErrors.useCase = 'Please describe your use case';
    }
    
    if (!formData.security.trim()) {
      newErrors.security = 'Please describe your security measures';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms of service';
    }
    
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to the privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('API key request submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting API key request:', error);
      toast.error('Failed to submit request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold">API Access Request</h1>
          <p className="mt-2 text-muted-foreground">
            Request access to the Unmask Protocol threat intelligence API
          </p>
          <div className="mt-4">
            <Link to="/api-info" className="inline-flex items-center text-primary hover:underline">
              <Info className="h-4 w-4 mr-1" />
              Learn more about our API
            </Link>
          </div>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>
                Tell us about your company or project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="organization">
                      Organization Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      placeholder="Your company or project name"
                      value={formData.organization}
                      onChange={handleChange}
                      error={errors.organization}
                      className={errors.organization ? "border-destructive" : ""}
                    />
                    {errors.organization && (
                      <p className="text-sm text-destructive">{errors.organization}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">
                      Website URL <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleChange}
                      className={errors.website ? "border-destructive" : ""}
                    />
                    {errors.website && (
                      <p className="text-sm text-destructive">{errors.website}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">
                      Contact Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={errors.contactName ? "border-destructive" : ""}
                    />
                    {errors.contactName && (
                      <p className="text-sm text-destructive">{errors.contactName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className={errors.contactEmail ? "border-destructive" : ""}
                    />
                    {errors.contactEmail && (
                      <p className="text-sm text-destructive">{errors.contactEmail}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">
                      Phone Number
                    </Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="useCase">
                  Use Case Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="useCase"
                  name="useCase"
                  placeholder="Describe how you plan to use our API in your application or service"
                  value={formData.useCase}
                  onChange={handleChange}
                  className={`min-h-[100px] ${errors.useCase ? "border-destructive" : ""}`}
                />
                {errors.useCase && (
                  <p className="text-sm text-destructive">{errors.useCase}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="usageVolume">
                    Estimated Usage Volume
                  </Label>
                  <Select 
                    value={formData.usageVolume} 
                    onValueChange={(value) => handleSelectChange('usageVolume', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select usage volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (&lt; 1,000 requests/day)</SelectItem>
                      <SelectItem value="medium">Medium (1,000 - 10,000 requests/day)</SelectItem>
                      <SelectItem value="high">High (10,000 - 100,000 requests/day)</SelectItem>
                      <SelectItem value="veryHigh">Very High (&gt; 100,000 requests/day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="security">
                  Security Measures <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="security"
                  name="security"
                  placeholder="Describe how you will secure the API key and handle any sensitive data"
                  value={formData.security}
                  onChange={handleChange}
                  className={`min-h-[100px] ${errors.security ? "border-destructive" : ""}`}
                />
                {errors.security && (
                  <p className="text-sm text-destructive">{errors.security}</p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="agreeTerms" 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => {
                      setFormData(prev => ({
                        ...prev,
                        agreeTerms: checked
                      }));
                      if (errors.agreeTerms) {
                        setErrors(prev => ({
                          ...prev,
                          agreeTerms: null
                        }));
                      }
                    }}
                  />
                  <Label 
                    htmlFor="agreeTerms" 
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
                  </Label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-sm text-destructive">{errors.agreeTerms}</p>
                )}
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="agreePrivacy" 
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onCheckedChange={(checked) => {
                      setFormData(prev => ({
                        ...prev,
                        agreePrivacy: checked
                      }));
                      if (errors.agreePrivacy) {
                        setErrors(prev => ({
                          ...prev,
                          agreePrivacy: null
                        }));
                      }
                    }}
                  />
                  <Label 
                    htmlFor="agreePrivacy" 
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
                {errors.agreePrivacy && (
                  <p className="text-sm text-destructive">{errors.agreePrivacy}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApiKeyRequestPage;
