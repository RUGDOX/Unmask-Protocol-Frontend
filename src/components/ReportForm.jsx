
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertTriangle, Send, Shield, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { reportsService } from "../services/reportsService";

const ReportForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    websiteUrl: "",
    walletAddresses: "",
    description: "",
    evidenceLinks: "",
    reporterEmail: "",
    rugId: "", // Added field to identify specific project by ID
    associatedProjects: "", // Added field to connect to other known projects
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.projectName || !formData.description || !formData.reporterEmail) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call the API
      await reportsService.submitReport(formData);
      
      toast.success("Report submitted successfully", {
        description: "Your report will be reviewed by our investigation team."
      });
      setFormData({
        projectName: "",
        websiteUrl: "",
        walletAddresses: "",
        description: "",
        evidenceLinks: "",
        reporterEmail: "",
        rugId: "",
        associatedProjects: "",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report", {
        description: "Please try again later or contact support."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center gap-2 mb-2 text-red-600">
          <AlertTriangle className="h-6 w-6" />
          <CardTitle>Report a Web3 Scam</CardTitle>
        </div>
        <CardDescription>
          Help us identify and stop fraudulent activities in the Web3 space. All reports are confidential.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">
              Project/Entity Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Name of the project or entity"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rugId">Project Identifier (if known)</Label>
            <Input
              id="rugId"
              name="rugId" 
              value={formData.rugId}
              onChange={handleChange}
              placeholder="Unique identifier for this project (e.g., contract address, ENS, etc.)"
            />
            <p className="text-xs text-muted-foreground">
              If you know the project's unique identifier, please provide it to help us link related reports
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              name="websiteUrl" 
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              type="url"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="walletAddresses">Associated Wallet Addresses</Label>
            <Textarea
              id="walletAddresses"
              name="walletAddresses"
              value={formData.walletAddresses}
              onChange={handleChange}
              placeholder="List any wallet addresses connected to this scam (one per line)"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="associatedProjects">Known Associated Projects</Label>
            <Textarea
              id="associatedProjects"
              name="associatedProjects"
              value={formData.associatedProjects}
              onChange={handleChange}
              placeholder="List any other projects or entities you believe are connected to this scam"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">
              Description of the Scam <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the fraudulent activity in detail"
              required
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="evidenceLinks">Evidence Links</Label>
            <Textarea
              id="evidenceLinks"
              name="evidenceLinks"
              value={formData.evidenceLinks}
              onChange={handleChange}
              placeholder="Links to screenshots, transactions, or other evidence (one per line)"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reporterEmail">
              Your Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reporterEmail"
              name="reporterEmail"
              value={formData.reporterEmail}
              onChange={handleChange}
              placeholder="email@example.com"
              type="email"
              required
            />
            <p className="text-sm text-muted-foreground">
              We may contact you for additional information
            </p>
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit Report
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-muted/50 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Shield className="mr-2 h-4 w-4" />
          Your report is confidential and secure
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportForm;
