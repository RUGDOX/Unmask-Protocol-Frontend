
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { 
  Shield, 
  FileText, 
  User, 
  Clock, 
  Check, 
  XCircle, 
  SendHorizontal, 
  ArrowRight, 
  AlertTriangle,
  Search,
  Lock,
  Activity
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { investigationsService } from '../services/investigationsService';
import { agentsService } from '../services/agentsService';

const AgentInvestigationPage = () => {
  const [assignedCases, setAssignedCases] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [agentId, setAgentId] = useState("AGT-123456"); // In a real app, would come from auth
  const [auditLogs, setAuditLogs] = useState([]);
  const [showAuditLogDialog, setShowAuditLogDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would call the API
        // const assignedData = await agentsService.getAssignedInvestigations(agentId);
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockAssignedCases = [
            {
              id: 'INV-2023-001',
              caseNumber: 'CS-78921',
              title: 'Suspicious activity from RID-AA11BB22CC33',
              status: 'assigned',
              rugId: 'RID-AA11BB22CC33',
              dateAssigned: '2023-06-05',
              reportDetails: 'Multiple reports of unexpected fund withdrawals',
              evidence: [
                'Transaction hash: 0x123456...',
                'Discord screenshots showing team admitting issues'
              ],
              relatedReports: 3,
            },
            {
              id: 'INV-2023-002',
              caseNumber: 'CS-78945',
              title: 'Potential impersonation of RID-XX00XX00XX00',
              status: 'in_progress',
              rugId: 'RID-XX00XX00XX00',
              dateAssigned: '2023-06-10',
              reportDetails: 'Multiple sites claiming to be the official project',
              evidence: [
                'Fake website: defi-swap-finance.com',
                'Twitter reports from community members'
              ],
              relatedReports: 5,
            },
          ];
          
          const mockVerifications = [
            {
              id: 'INV-2023-003',
              caseNumber: 'CS-78901',
              title: 'Final verification for RID-DD44EE55FF66',
              status: 'pending_final_verification',
              rugId: 'RID-DD44EE55FF66',
              dateSubmitted: '2023-06-15',
              investigatorNotes: 'Confirmed multiple instances of fraudulent activity. Recommend blacklisting.',
              evidence: [
                'Transaction hashes showing fund drain',
                'Proof of fake team identities',
                'Multiple victim statements'
              ],
              investigatorId: 'AGT-654321',
              packageReady: true,
            },
          ];
          
          setAssignedCases(mockAssignedCases);
          setPendingVerifications(mockVerifications);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching assigned cases:", error);
        toast.error("Failed to fetch assigned cases");
        setLoading(false);
      }
    };

    fetchData();
  }, [agentId]);

  const handleCaseSelect = (caseData) => {
    setSelectedCase(caseData);
  };

  const handleUpdateStatus = async (caseId, newStatus) => {
    try {
      // In a real implementation, this would call the API
      // await investigationsService.updateInvestigationStatus(caseId, newStatus);
      
      toast.success(`Case status updated to ${newStatus.replace(/_/g, ' ')}`);
      
      // Update the case status in the UI
      setAssignedCases(assignedCases.map(c => 
        c.id === caseId ? { ...c, status: newStatus } : c
      ));
    } catch (error) {
      console.error("Error updating case status:", error);
      toast.error("Failed to update case status");
    }
  };

  const handleVerifyCase = async (caseId) => {
    if (!verificationNotes.trim()) {
      toast.error("Please provide verification notes");
      return;
    }
    
    try {
      // In a real implementation, this would call the API
      // await agentsService.signOffInvestigation(
      //   agentId, 
      //   caseId, 
      //   { notes: verificationNotes, verified: true }
      // );
      
      toast.success("Case verified and submitted for final review");
      
      // Remove from assigned cases and reset form
      setAssignedCases(assignedCases.filter(c => c.id !== caseId));
      setSelectedCase(null);
      setVerificationNotes("");
    } catch (error) {
      console.error("Error verifying case:", error);
      toast.error("Failed to verify case");
    }
  };

  const handleFinalVerification = async (caseId, approved) => {
    try {
      // In a real implementation, this would call the API
      // await agentsService.finalVerification(
      //   agentId,
      //   caseId,
      //   { approved, notes: "Final verification completed" }
      // );
      
      toast.success(`Case ${approved ? 'approved' : 'rejected'} for final processing`);
      
      // Remove from pending verifications
      setPendingVerifications(pendingVerifications.filter(c => c.id !== caseId));
    } catch (error) {
      console.error("Error during final verification:", error);
      toast.error("Failed to process final verification");
    }
  };

  const handleSendPackage = async (caseId) => {
    if (!destinationEmail.trim()) {
      toast.error("Please provide a destination email");
      return;
    }
    
    try {
      // In a real implementation, this would call the API
      // await investigationsService.sendInvestigationPackage(
      //   caseId,
      //   { destination: destinationEmail, method: "secure_email" }
      // );
      
      toast.success("Investigation package sent successfully");
      
      // Remove from pending verifications and reset form
      setPendingVerifications(pendingVerifications.filter(c => c.id !== caseId));
      setDestinationEmail("");
    } catch (error) {
      console.error("Error sending package:", error);
      toast.error("Failed to send investigation package");
    }
  };

  const fetchAuditLogs = async (caseId) => {
    try {
      // In a real implementation, this would call the API
      // const logs = await investigationsService.getInvestigationAuditLogs(caseId);
      
      // Mock audit logs
      const mockLogs = [
        { timestamp: '2023-06-05 09:15:23', action: 'Case created', agent: 'System', details: 'Case automatically created from report #REP-2023-456' },
        { timestamp: '2023-06-05 10:30:45', action: 'Case assigned', agent: 'Admin (ADM-001)', details: 'Assigned to Agent AGT-123456' },
        { timestamp: '2023-06-07 14:22:11', action: 'Status updated', agent: 'Agent (AGT-123456)', details: 'Status changed from "assigned" to "in_progress"' },
        { timestamp: '2023-06-10 16:45:30', action: 'Evidence added', agent: 'Agent (AGT-123456)', details: 'Added 2 new evidence items' },
      ];
      
      setAuditLogs(mockLogs);
      setShowAuditLogDialog(true);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      toast.error("Failed to fetch audit logs");
    }
  };

  const filteredAssignedCases = assignedCases.filter(
    case_ => case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
             case_.rugId.toLowerCase().includes(searchTerm.toLowerCase()) ||
             case_.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agent Investigation Portal</h1>
          <p className="text-muted-foreground">
            Agent ID: {agentId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-medium">Unmask Protocol</span>
        </div>
      </div>
      
      <Tabs defaultValue="assigned" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assigned">Assigned Cases ({assignedCases.length})</TabsTrigger>
          <TabsTrigger value="verifications">Pending Verifications ({pendingVerifications.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assigned">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Assigned Cases</CardTitle>
              <CardDescription>
                Manage and investigate cases assigned to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by case number or RugID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-8">Loading assigned cases...</div>
              ) : filteredAssignedCases.length === 0 ? (
                <Alert>
                  <AlertTitle>No cases found</AlertTitle>
                  <AlertDescription>
                    {searchTerm ? "No cases match your search criteria" : "You currently have no assigned cases"}
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {filteredAssignedCases.map((case_) => (
                    <Card key={case_.id} className={`border ${selectedCase?.id === case_.id ? 'border-primary' : 'border-border'}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-base">{case_.title}</CardTitle>
                            <CardDescription>
                              Case #{case_.caseNumber} • RugID: {case_.rugId}
                            </CardDescription>
                          </div>
                          <Badge variant={case_.status === 'assigned' ? 'outline' : 'secondary'}>
                            {formatStatus(case_.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 text-sm">
                        <p>Assigned: {case_.dateAssigned} • {case_.relatedReports} related reports</p>
                      </CardContent>
                      <CardFooter className="border-t pt-2 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => fetchAuditLogs(case_.id)}
                        >
                          <Activity className="mr-2 h-4 w-4" />
                          View Logs
                        </Button>
                        <div className="space-x-2">
                          {case_.status === 'assigned' && (
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleUpdateStatus(case_.id, 'in_progress')}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              Start Investigation
                            </Button>
                          )}
                          <Button 
                            variant={selectedCase?.id === case_.id ? "secondary" : "default"} 
                            size="sm"
                            onClick={() => handleCaseSelect(case_)}
                          >
                            {selectedCase?.id === case_.id ? "Hide Details" : "View Details"}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {selectedCase && (
            <Card>
              <CardHeader>
                <CardTitle>Case #{selectedCase.caseNumber} Details</CardTitle>
                <CardDescription>
                  Investigation details for {selectedCase.rugId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Report Details</h3>
                    <p className="text-sm">{selectedCase.reportDetails}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Evidence</h3>
                    <ul className="text-sm list-disc pl-5">
                      {selectedCase.evidence.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedCase.status === 'in_progress' && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Verification Notes</h3>
                      <Textarea
                        value={verificationNotes}
                        onChange={(e) => setVerificationNotes(e.target.value)}
                        placeholder="Enter your verification notes and findings"
                        rows={5}
                      />
                      <p className="text-xs text-muted-foreground">
                        Your agent ID will be recorded with this verification
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end space-x-2">
                {selectedCase.status === 'in_progress' ? (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedCase(null);
                        setVerificationNotes("");
                      }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => handleVerifyCase(selectedCase.id)}
                      disabled={!verificationNotes.trim()}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Submit Verification
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedCase(null)}
                  >
                    Close Details
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="verifications">
          <Card>
            <CardHeader>
              <CardTitle>Pending Final Verifications</CardTitle>
              <CardDescription>
                Review and process final verifications before sending to external parties
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading pending verifications...</div>
              ) : pendingVerifications.length === 0 ? (
                <Alert>
                  <AlertTitle>No pending verifications</AlertTitle>
                  <AlertDescription>
                    There are currently no cases waiting for final verification
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {pendingVerifications.map((verification) => (
                    <Card key={verification.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{verification.title}</CardTitle>
                        <CardDescription>
                          Case #{verification.caseNumber} • RugID: {verification.rugId}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-1">Investigator Notes</h3>
                          <p className="text-sm">{verification.investigatorNotes}</p>
                          <p className="text-xs mt-1 text-muted-foreground">
                            Submitted by: Agent {verification.investigatorId}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-1">Evidence Summary</h3>
                          <ul className="text-sm list-disc pl-5">
                            {verification.evidence.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Send Verified Data Package</h3>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Destination email (secure government or law enforcement)"
                              value={destinationEmail}
                              onChange={(e) => setDestinationEmail(e.target.value)}
                              className="flex-grow"
                            />
                            <Button
                              onClick={() => handleSendPackage(verification.id)}
                              disabled={!destinationEmail.trim()}
                            >
                              <SendHorizontal className="mr-2 h-4 w-4" />
                              Send Package
                            </Button>
                          </div>
                          <p className="text-xs mt-1 text-muted-foreground">
                            <Lock className="inline h-3 w-3 mr-1" />
                            Data package will be encrypted and securely transmitted
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button 
                          variant="destructive"
                          onClick={() => handleFinalVerification(verification.id, false)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Verification
                        </Button>
                        <Button 
                          variant="default"
                          onClick={() => handleFinalVerification(verification.id, true)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Approve Verification
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAuditLogDialog} onOpenChange={setShowAuditLogDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Case Audit Logs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {auditLogs.map((log, index) => (
              <div key={index} className="border-b pb-2 last:border-b-0">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{log.action}</span>
                  <span className="text-muted-foreground">{log.timestamp}</span>
                </div>
                <p className="text-sm">{log.details}</p>
                <p className="text-xs text-muted-foreground">By: {log.agent}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentInvestigationPage;
