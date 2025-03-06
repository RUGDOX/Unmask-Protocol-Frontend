
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Database } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const BlockchainTab = () => {
  const { toast } = useToast();

  const handleSyncBlockchain = async () => {
    try {
      toast({
        title: "Blockchain Sync Initiated",
        description: "Syncing blockchain data. This may take a few minutes.",
      });
      
      setTimeout(() => {
        toast({
          title: "Blockchain Sync Complete",
          description: "Blockchain data has been synchronized successfully.",
        });
      }, 3000);
    } catch (err) {
      toast({
        title: "Error Syncing Blockchain",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ethereumNode">Ethereum Node URL</Label>
            <Input
              id="ethereumNode"
              defaultValue="https://mainnet.infura.io/v3/your-project-id"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="oasisSapphireNode">Oasis Sapphire Node URL</Label>
            <Input
              id="oasisSapphireNode"
              defaultValue="https://sapphire.oasis.io"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smartContractAddress">Smart Contract Address</Label>
            <Input
              id="smartContractAddress"
              defaultValue="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            />
          </div>
          <Button 
            className="w-full"
            onClick={handleSyncBlockchain}
          >
            <Database className="mr-2 h-4 w-4" />
            Sync Blockchain Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainTab;
