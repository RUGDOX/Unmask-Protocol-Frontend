
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Textarea } from "../../components/ui/textarea";
import { Lock } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const SecurityTab = () => {
  const { toast } = useToast();

  const handleSecuritySettings = async () => {
    try {
      toast({
        title: "Security Settings Updated",
        description: "The security settings have been updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Error Updating Security Settings",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="encryptionAlgorithm">Encryption Algorithm</Label>
            <Input
              id="encryptionAlgorithm"
              placeholder="e.g., AES-256"
              defaultValue="AES-256-GCM"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataVaultAccess">Data Vault Access Policy</Label>
            <Textarea
              id="dataVaultAccess"
              placeholder="Define access policy for data vaults"
              defaultValue="Only admin users can access level 3 data. Investigators can access level 1-2 data with proper authorization."
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="deadManSwitch" defaultChecked={true} />
            <Label htmlFor="deadManSwitch">Enable Dead Man's Switch</Label>
          </div>
          <Button 
            className="w-full"
            onClick={handleSecuritySettings}
          >
            <Lock className="mr-2 h-4 w-4" />
            Update Security Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
