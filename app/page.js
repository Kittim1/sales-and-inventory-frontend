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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // Holds success or error message
  const [alertType, setAlertType] = useState(null); // "success" or "error"
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData();
    formData.append('operation', 'login');
    formData.append('json', JSON.stringify({ username: email, password }));

    try {
      const response = await axios.post('http://localhost/harah-api/users.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        setAlertType("success");
        setMessage("Login successful! Redirecting...");
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setAlertType("error");
        setMessage(response.data.message || "Invalid email or password");
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
          <h2 className="text-xl font-bold text-center">Login</h2>
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

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email">Email or Phone</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm">Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>
        </CardFooter>
      </Card>
    </div>
  );
}
