'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('1'); // Default role (can be changed)
  const [message, setMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData();
    formData.append('operation', 'register');
    formData.append('json', JSON.stringify({ username, password, role }));

    try {
      const response = await axios.post('http://localhost/harah-api/users.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        setAlertType("success");
        setMessage("Signup successful! Redirecting to login...");
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setAlertType("error");
        setMessage(response.data.message || "Signup failed");
      }
    } catch (err) {
      setAlertType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-bold text-center">Sign Up</h2>
        </CardHeader>
        <CardContent>
          {/* ✅ Alert Component for Success/Error Messages */}
          {message && (
            <Alert variant={alertType === "error" ? "destructive" : "success"} className="mb-4">
              {alertType === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
              <AlertTitle>{alertType === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full p-2 border rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="1">User</option>
                <option value="2">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </CardFooter>
      </Card>
    </div>
  );
}
