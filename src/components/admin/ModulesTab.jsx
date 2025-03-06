
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const ModulesTab = ({ modules, setModules }) => {
  const { toast } = useToast();

  const handleToggleModule = async (moduleId, enabled) => {
    try {
      setModules(modules.map(module => 
        module.id === moduleId ? { ...module, enabled } : module
      ));
      
      const module = modules.find(m => m.id === moduleId);
      toast({
        title: `Module ${enabled ? 'Enabled' : 'Disabled'}`,
        description: `${module.name} has been ${enabled ? 'enabled' : 'disabled'}.`,
      });
    } catch (err) {
      toast({
        title: "Error Updating Module",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Module Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modules && modules.length > 0 ? (
            modules.map((module) => (
              <div key={module.id} className="flex justify-between items-center border p-3 rounded">
                <span>{module.name}</span>
                <Switch
                  checked={module.enabled}
                  onCheckedChange={(enabled) => handleToggleModule(module.id, enabled)}
                />
              </div>
            ))
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Modules Found</AlertTitle>
              <AlertDescription>There are currently no modules available.</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulesTab;
