import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle, Users, Shield, Trash2, Moon, Sun } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

const UsersTab = ({ users, setUsers }) => {
  const { toast } = useToast();
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });
  const [userToDelete, setUserToDelete] = useState(null);

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all user fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const userToAdd = { ...newUser, id: newId };
      
      setUsers([...users, userToAdd]);
      setNewUser({ username: '', email: '', role: '' });
      
      toast({
        title: "User Created",
        description: `User ${newUser.username} has been created successfully.`,
      });
    } catch (err) {
      toast({
        title: "Error Creating User",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleVerifyUser = async (username, id) => {
    try {
      toast({
        title: "User Verification",
        description: `Verifying user: ${username}`,
      });
    } catch (err) {
      toast({
        title: "Error Verifying User",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setUsers(users.filter(user => user.id !== userId));
      setUserToDelete(null);
      
      toast({
        title: "User Deleted",
        description: "User has been removed from the system",
      });
    } catch (err) {
      toast({
        title: "Error Deleting User",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
          </div>
          <Button
            onClick={handleCreateUser}
            className="w-full"
          >
            <Users className="mr-2 h-4 w-4" />
            Create User
          </Button>
          <div className="space-y-2">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div key={user.id} className="flex justify-between items-center border p-3 rounded">
                  <div>
                    <div className="font-semibold">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email} - {user.role}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleVerifyUser(user.username, user.id)}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Verify
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete User</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete {user.username}? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setUserToDelete(null)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Users Found</AlertTitle>
                <AlertDescription>There are currently no users in the system.</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersTab;
