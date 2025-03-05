
import React, { useState } from "react";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2, Upload, FileText, ArrowRight, Fingerprint } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { projectsService } from "../services/projectsService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useNavigate } from "react-router-dom";

const ProjectRegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isEligible, setIsEligible] = useState(null);
  const [formData, setFormData] = useState({
    // Project Details
    projectName: "",
    projectWebsite: "",
    projectDescription: "",
    projectSocials: "",
    tokenContract: "",
    // Owner Details
    ownerName: "",
    ownerEmail: "",
    ownerWallet: "",
    // ID Verification
    idType: "passport", // Default value
    idNumber: "",
    idImage: null,
    proofOfAddress: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleVerifyIdentity = async () => {
    if (!formData.idNumber || !formData.idImage || !formData.proofOfAddress) {
      toast.error("Please complete all identity verification fields");
      return;
    }

    setIsVerifying(true);

    try {
      // In a real implementation, this would check identity and eligibility
      setTimeout(async () => {
        try {
          // Check if the person is already registered or blacklisted
          const eligibilityData = {
            idType: formData.idType,
            idNumber: formData.idNumber,
            ownerName: formData.ownerName,
          };
          
          // This would be an actual API call in production
          // const eligibilityResponse = await projectsService.checkOwnerEligibility(eligibilityData);
          
          // Mock eligibility result
          const isOwnerEligible = formData.idNumber !== "123456789"; // Mock - 123456789 is blacklisted
          
          setIsEligible(isOwnerEligible);
          
          if (isOwnerEligible) {
            toast.success("Identity verification successful", {
              description: "You are eligible to register for a RugID"
            });
          } else {
            toast.error("Identity verification failed", {
              description: "You are not eligible for a RugID. This may be due to an existing registration or blacklist record."
            });
          }
          
          setIsVerifying(false);
        } catch (error) {
          console.error("Verification error:", error);
          toast.error("Verification error", {
            description: error.message || "Please try again later"
          });
          setIsVerifying(false);
        }
      }, 2000);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification error", {
        description: error.message || "Please try again later"
      });
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEligible) {
      toast.error("Cannot proceed without identity verification");
      return;
    }
    
    try {
      toast.loading("Submitting registration...");
      
      // In a real implementation, this would submit the form data
      setTimeout(async () => {
        try {
          // const response = await projectsService.registerProject(formData);
          
          toast.dismiss();
          toast.success("Registration submitted successfully", {
            description: "Your RugID application is being processed. You will be notified once approved."
          });
          
          // Reset form and navigate back to home
          setFormData({
            projectName: "",
            projectWebsite: "",
            projectDescription: "",
            projectSocials: "",
            tokenContract: "",
            ownerName: "",
            ownerEmail: "",
            ownerWallet: "",
            idType: "passport",
            idNumber: "",
            idImage: null,
            proofOfAddress: null,
          });
          
          navigate("/");
        } catch (error) {
          toast.dismiss();
          toast.error("Registration failed", {
            description: error.message || "Please try again later"
          });
        }
      }, 2000);
    } catch (error) {
      toast.dismiss();
      toast.error("Registration failed", {
        description: error.message || "Please try again later"
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="h-6 w-6 text-primary" />
          Register for a RugID
        </CardTitle>
        <CardDescription>
          Secure your project's reputation with a verified RugID. This requires identity verification and project details.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={`step-${currentStep}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step-1" disabled={currentStep !== 1}>Project Details</TabsTrigger>
            <TabsTrigger value="step-2" disabled={currentStep !== 2}>Owner Information</TabsTrigger>
            <TabsTrigger value="step-3" disabled={currentStep !== 3}>Identity Verification</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="step-1" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Your Web3 project name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectWebsite">
                  Project Website <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="projectWebsite"
                  name="projectWebsite"
                  value={formData.projectWebsite}
                  onChange={handleChange}
                  placeholder="https://yourproject.com"
                  type="url"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription">
                  Project Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Describe your project, its purpose and goals"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectSocials">Social Media Links</Label>
                <Textarea
                  id="projectSocials"
                  name="projectSocials"
                  value={formData.projectSocials}
                  onChange={handleChange}
                  placeholder="Twitter: https://twitter.com/...\nDiscord: https://discord.gg/..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tokenContract">Token Contract Address (if applicable)</Label>
                <Input
                  id="tokenContract"
                  name="tokenContract"
                  value={formData.tokenContract}
                  onChange={handleChange}
                  placeholder="0x..."
                />
                <p className="text-xs text-muted-foreground">
                  If your project has a token, please provide the contract address
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={nextStep}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="step-2" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">
                  Owner Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Your legal full name"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Must match your identification documents
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerEmail">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ownerEmail"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  type="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerWallet">
                  Wallet Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ownerWallet"
                  name="ownerWallet"
                  value={formData.ownerWallet}
                  onChange={handleChange}
                  placeholder="0x..."
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This wallet will be linked to your RugID
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button type="button" onClick={nextStep}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="step-3" className="space-y-4 mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Identity Verification Required</AlertTitle>
                <AlertDescription>
                  To prevent fraud and protect the Unmask Protocol ecosystem, all project owners must complete identity verification.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="idType">
                  ID Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="idType"
                  name="idType"
                  value={formData.idType}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="passport">Passport</option>
                  <option value="driverLicense">Driver's License</option>
                  <option value="nationalId">National ID Card</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">
                  ID Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="Enter your ID number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idImage">
                  Upload ID Document <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground mb-2">
                    Drag & drop or click to upload your ID document
                  </p>
                  <Input
                    id="idImage"
                    name="idImage"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('idImage').click()}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                  {formData.idImage && (
                    <p className="text-xs text-green-600 mt-2">
                      <CheckCircle2 className="inline-block h-3 w-3 mr-1" />
                      {formData.idImage.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofOfAddress">
                  Proof of Address <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground mb-2">
                    Upload a utility bill or bank statement (less than 3 months old)
                  </p>
                  <Input
                    id="proofOfAddress"
                    name="proofOfAddress"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('proofOfAddress').click()}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                  {formData.proofOfAddress && (
                    <p className="text-xs text-green-600 mt-2">
                      <CheckCircle2 className="inline-block h-3 w-3 mr-1" />
                      {formData.proofOfAddress.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  className="w-full"
                  variant={isEligible ? "outline" : "default"}
                  onClick={handleVerifyIdentity}
                  disabled={isVerifying || isEligible === true}
                >
                  {isVerifying ? (
                    "Verifying..."
                  ) : isEligible === true ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Verified
                    </>
                  ) : (
                    "Verify Identity"
                  )}
                </Button>
              </div>

              {isEligible === false && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    You are not eligible for a RugID. This may be due to an existing registration or blacklist record.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button type="submit" disabled={!isEligible}>
                  Submit Registration
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-muted/50 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          All information is securely encrypted
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectRegistrationForm;
