
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const SettingsTab = ({ config, setConfig }) => {
  const { toast } = useToast();

  const handleUpdateConfig = async () => {
    try {
      toast({
        title: "Configuration Updated",
        description: "System configuration has been updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Error Updating Configuration",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="encryptionKey">Encryption Key</Label>
              <Input
                id="encryptionKey"
                value={config.encryptionKey}
                onChange={(e) => setConfig({ ...config, encryptionKey: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idVerificationService">ID Verification Service</Label>
              <Input
                id="idVerificationService"
                value={config.idVerificationService}
                onChange={(e) => setConfig({ ...config, idVerificationService: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="blockchainEndpoint">Ethereum Blockchain Endpoint</Label>
            <Input
              id="blockchainEndpoint"
              value={config.blockchainEndpoint}
              onChange={(e) => setConfig({ ...config, blockchainEndpoint: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="oasisSapphireEndpoint">Oasis Sapphire Endpoint</Label>
            <Input
              id="oasisSapphireEndpoint"
              value={config.oasisSapphireEndpoint}
              onChange={(e) => setConfig({ ...config, oasisSapphireEndpoint: e.target.value })}
            />
          </div>
          <Button
            onClick={handleUpdateConfig}
            className="w-full"
          >
            <Settings className="mr-2 h-4 w-4" />
            Update Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
