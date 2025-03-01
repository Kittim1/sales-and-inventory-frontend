"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUsers, FaTruck, FaUserTie, FaShoppingCart, FaExchangeAlt, FaBoxOpen } from "react-icons/fa";
import CustomNavbar from "@/components/Navbar";
import CustomSidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "Loading...", email: "Loading..." });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("http://localhost/harah-api/dashboard.php");
        const data = await response.json();
        
        if (response.ok) {
          setStats([
            { title: "Customers", value: `${data.customers} Records`, icon: <FaUsers className="text-blue-500 text-3xl" />, link: "/customer" },
            { title: "Supplier", value: `${data.suppliers} Records`, icon: <FaTruck className="text-orange-500 text-3xl" />, link: "/supplier" },
            { title: "Employees", value: `${data.employees} Records`, icon: <FaUserTie className="text-green-500 text-3xl" />, link: "/employees" },
            { title: "Registered Account", value: `${data.accounts} Records`, icon: <FaBoxOpen className="text-red-500 text-3xl" />, link: "/accounts" },
            { title: "Products", value: `${data.products} Records`, icon: <FaShoppingCart className="text-teal-500 text-3xl" />, link: "/products" },
            { title: "Transaction", value: `${data.transactions} Records`, icon: <FaExchangeAlt className="text-yellow-500 text-3xl" />, link: "/transactions" },
          ]);
          console.log("response", response.data)
        } else {
          setError("Failed to fetch data.");
        }
      } catch (err) {
        setError("Error fetching data. Make sure your backend is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="flex h-screen">
      <CustomNavbar />
      <div className="flex flex-1">
        <div className="mt-16">
          <CustomSidebar />
        </div>
        <div className="flex-1 p-6 pt-16" style={{ backgroundColor: '#9CABD6' }}>
          {loading ? (
            <p className="text-center text-xl font-semibold">Loading...</p>
          ) : error ? (
            <p className="text-center text-xl font-semibold text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="cursor-pointer" onClick={() => router.push(stat.link)}>
                  <Card className="shadow-md border rounded-lg transition duration-300 hover:shadow-lg hover:scale-105" style={{ backgroundColor: '#547282' }}>
                    <CardHeader>
                      <CardTitle className="text-gray-700 flex items-center gap-2">
                        {stat.icon} {stat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold">{stat.value}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
