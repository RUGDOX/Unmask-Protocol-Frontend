
import React, { useState } from "react";
import { toast } from "sonner";
import { 
  AlertCircle, 
  FileText, 
  Link as LinkIcon, 
  Plus, 
  ExternalLink,
  Search
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { reportsService } from "../services/reportsService";
import { investigationsService } from "../services/investigationsService";

const ReportsList = ({ onInvestigationCreated }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newInvestigation, setNewInvestigation] = useState({
    title: "",
    description: "",
    priority: "normal",
    assignedTo: "",
  });
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  React.useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would call the API
        // const data = await reportsService.getUnlinkedReports();
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockReports = [
            {
              id: 'REP-001',
              projectName: 'MetaSwap Finance',
              rugId: 'MS-0x1234',
              reporterEmail: 'user1@example.com',
              dateSubmitted: '2023-05-15',
              status: 'pending',
              description: 'Project suddenly disappeared after raising 500 ETH.',
              walletAddresses: '0x123...abc\n0x456...def',
            },
            {
              id: 'REP-002',
              projectName: 'DeFi Yield Optimizer',
              rugId: 'DYO-0x5678',
              reporterEmail: 'user2@example.com',
              dateSubmitted: '2023-05-17',
              status: 'review',
              description: 'Funds were drained from protocol, team vanished.',
              walletAddresses: '0x789...ghi\n0xabc...jkl',
            },
            {
              id: 'REP-003',
              projectName: 'NFT Collector Society',
              rugId: 'NCS-0x91011',
              reporterEmail: 'user3@example.com',
              dateSubmitted: '2023-05-18',
              status: 'pending',
              description: 'Promised utility never came, team deleted Discord.',
              walletAddresses: '0xdef...mno',
            },
          ];
          setReports(mockReports);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching reports:", error);
        toast.error("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleCreateInvestigation = async () => {
    if (!newInvestigation.title) {
      toast.error("Please provide a title for the investigation");
      return;
    }

    try {
      // In a real implementation, this would call the API
      // const data = await investigationsService.createInvestigationFromReport(
      //   selectedReportId,
      //   newInvestigation
      // );

      // Mock success for demonstration
      toast.success("Investigation created successfully");
      
      // Refresh the reports list or remove the linked report
      setReports(reports.filter(report => report.id !== selectedReportId));
      
      // Reset the form
      setNewInvestigation({
        title: "",
        description: "",
        priority: "normal",
        assignedTo: "",
      });
      
      setDialogOpen(false);
      
      // Notify parent component
      if (onInvestigationCreated) {
        onInvestigationCreated();
      }
    } catch (error) {
      console.error("Error creating investigation:", error);
      toast.error("Failed to create investigation");
    }
  };

  const handleViewDetails = (reportId) => {
    toast.info(`Viewing details for report ${reportId}`);
    // In a real implementation, this would navigate to a detailed view
  };

  const filteredReports = reports.filter(report => 
    report.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.rugId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading reports...</div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm ? "No reports match your search criteria" : "No pending reports to display"}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{report.projectName}</CardTitle>
                    <CardDescription>ID: {report.rugId} • Reported on {report.dateSubmitted}</CardDescription>
                  </div>
                  <Badge variant={report.status === 'review' ? "secondary" : "outline"}>
                    {report.status === 'review' ? 'Under Review' : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-2 mb-2">{report.description}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  Reported by: {report.reporterEmail}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 flex justify-between pt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewDetails(report.id)}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Dialog open={dialogOpen && selectedReportId === report.id} onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (!open) setSelectedReportId(null);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        setSelectedReportId(report.id);
                        setNewInvestigation({
                          ...newInvestigation,
                          title: `Investigation of ${report.projectName}`,
                        });
                        setDialogOpen(true);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Investigation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Investigation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="investigation-title">Investigation Title</Label>
                        <Input
                          id="investigation-title"
                          value={newInvestigation.title}
                          onChange={(e) => setNewInvestigation({ ...newInvestigation, title: e.target.value })}
                          placeholder="Enter investigation title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investigation-description">Description</Label>
                        <Textarea
                          id="investigation-description"
                          value={newInvestigation.description}
                          onChange={(e) => setNewInvestigation({ ...newInvestigation, description: e.target.value })}
                          placeholder="Enter investigation details"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investigation-priority">Priority</Label>
                        <select
                          id="investigation-priority"
                          value={newInvestigation.priority}
                          onChange={(e) => setNewInvestigation({ ...newInvestigation, priority: e.target.value })}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investigation-assignee">Assigned To</Label>
                        <Input
                          id="investigation-assignee"
                          value={newInvestigation.assignedTo}
                          onChange={(e) => setNewInvestigation({ ...newInvestigation, assignedTo: e.target.value })}
                          placeholder="Username of assignee"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateInvestigation}>
                        Create Investigation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsList;
