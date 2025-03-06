
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle, RefreshCw, CheckCircle2, XCircle, BadgeCheck } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const ProjectsTab = ({ projects, setProjects }) => {
  const { toast } = useToast();
  
  const handleVerifyProject = async (projectId) => {
    try {
      // In a real implementation, this would call the API
      // await projectsService.updateProjectStatus(projectId, 'verified');
      
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, status: 'verified' } : project
      ));
      
      toast({
        title: "Project Verified",
        description: `Project with ID ${projectId} has been verified and RugID issued.`,
      });
    } catch (err) {
      toast({
        title: "Error Verifying Project",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleRejectProject = async (projectId) => {
    try {
      // In a real implementation, this would call the API
      // await projectsService.updateProjectStatus(projectId, 'rejected');
      
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, status: 'rejected' } : project
      ));
      
      toast({
        title: "Project Rejected",
        description: `Project with ID ${projectId} has been rejected.`,
      });
    } catch (err) {
      toast({
        title: "Error Rejecting Project",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-primary" />
          RugID Project Management
        </CardTitle>
        <CardDescription>
          Review and manage project registrations for RugID verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Project Registrations</h3>
              <p className="text-sm text-muted-foreground">Verify project owner identities and issue RugIDs</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setProjects([...projects])}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          
          {projects && projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      <p className="text-sm">RugID: {project.id}</p>
                    </div>
                    <div className="flex items-center">
                      {project.status === 'verified' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Verified
                        </span>
                      ) : project.status === 'rejected' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="mr-1 h-3 w-3" />
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Owner:</p>
                      <p className="text-sm">{project.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Registered:</p>
                      <p className="text-sm">{project.dateRegistered}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Website:</p>
                      <p className="text-sm">
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {project.website}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Wallet:</p>
                      <p className="text-sm font-mono">{project.wallet}</p>
                    </div>
                  </div>
                  
                  {project.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleVerifyProject(project.id)} 
                        className="flex-1"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve & Issue RugID
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleRejectProject(project.id)}
                        className="flex-1"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Project Registrations</AlertTitle>
              <AlertDescription>There are currently no project registrations to review.</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsTab;
