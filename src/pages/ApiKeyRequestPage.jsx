
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Header from '../components/layout/Header';

const ApiKeyRequestPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    website: '',
    projectType: '',
    useCase: '',
    estimatedRequests: '',
    securityMeasures: '',
    termsAgreed: false
  });
  const [errors, setErrors] = useState({});

  const formSchema = z.object({
    organizationName: z.string().min(2, { message: "Organization name is required" }),
    contactName: z.string().min(2, { message: "Contact name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    website: z.string().url({ message: "Valid website URL is required" }),
    projectType: z.string().min(2, { message: "Project type is required" }),
    useCase: z.string().min(20, { message: "Please provide more details about your use case" }),
    estimatedRequests: z.string().min(1, { message: "Estimated requests is required" }),
    securityMeasures: z.string().min(20, { message: "Please describe your security measures" }),
    termsAgreed: z.boolean().refine(val => val === true, { message: "You must agree to the terms" })
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      return true;
    } catch (error) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        if (err.path) {
          formattedErrors[err.path[0]] = err.message;
        }
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("API key request submitted successfully! We'll review your request and get back to you soon.");
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container max-w-4xl py-12">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Key className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-gradient">API Key Request</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Request access to the Unmask Protocol Threat Database API. Submit your details below, and our team will review your request.
          </p>
        </div>

        <Card className="border border-blue-500/20 shadow-glow">
          <CardHeader>
            <CardTitle>Request Form</CardTitle>
            <CardDescription>
              Please provide accurate information to help us process your request quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className={errors.organizationName ? "border-red-500" : ""}
                    placeholder="Your company or project name"
                  />
                  {errors.organizationName && <p className="text-red-500 text-sm">{errors.organizationName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={errors.contactName ? "border-red-500" : ""}
                    placeholder="Full name of primary contact"
                  />
                  {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="contact@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={errors.website ? "border-red-500" : ""}
                    placeholder="https://example.com"
                  />
                  {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Input
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={errors.projectType ? "border-red-500" : ""}
                    placeholder="Web3 Security, DApp, Exchange, etc."
                  />
                  {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedRequests">Estimated API Requests</Label>
                  <Input
                    id="estimatedRequests"
                    name="estimatedRequests"
                    value={formData.estimatedRequests}
                    onChange={handleChange}
                    className={errors.estimatedRequests ? "border-red-500" : ""}
                    placeholder="Requests per day/month"
                  />
                  {errors.estimatedRequests && <p className="text-red-500 text-sm">{errors.estimatedRequests}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Intended Use Case</Label>
                <Textarea
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  className={`min-h-[100px] ${errors.useCase ? "border-red-500" : ""}`}
                  placeholder="Please describe how you plan to use the API data"
                />
                {errors.useCase && <p className="text-red-500 text-sm">{errors.useCase}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityMeasures">Security Measures</Label>
                <Textarea
                  id="securityMeasures"
                  name="securityMeasures"
                  value={formData.securityMeasures}
                  onChange={handleChange}
                  className={`min-h-[100px] ${errors.securityMeasures ? "border-red-500" : ""}`}
                  placeholder="Describe how you'll secure and protect the API key and data"
                />
                {errors.securityMeasures && <p className="text-red-500 text-sm">{errors.securityMeasures}</p>}
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/30">
                <Shield className="h-4 w-4 text-blue-500" />
                <AlertTitle>API Usage Terms</AlertTitle>
                <AlertDescription>
                  By requesting an API key, you agree to our data usage policies, rate limits, and security requirements. 
                  The API key provided is for your use only and should not be shared. Misuse may result in revocation of access.
                </AlertDescription>
              </Alert>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="termsAgreed"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                  className="mt-1"
                />
                <Label htmlFor="termsAgreed" className="flex-1">
                  I agree to the API usage terms and conditions, and I confirm that the information provided is accurate.
                  {errors.termsAgreed && <span className="block text-red-500 text-sm">{errors.termsAgreed}</span>}
                </Label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => navigate('/')} variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Submit Request <Check className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ApiKeyRequestPage;
