'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('operation', 'login');
    formData.append('json', JSON.stringify({ username: email, password }));

    try {
      const response = await axios.post('http://localhost/harah-api/users.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        toast.success(`Welcome, ${response.data.user.user_username || 'User'}! 🎉`);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('user',response.data)


        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        toast.error(response.data.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#547282' }}>
      <Card className="w-96 p-6 shadow-lg" style={{ backgroundColor: '#9CABD6' }}>
        <CardHeader className="flex justify-center items-center">
          <Image src="/bg-harah.jpg" alt="Logo" width={105} height={105} />
          <h2 className="text-xl font-bold text-center">Login</h2>
        </CardHeader>
        <CardContent>
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
