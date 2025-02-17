"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { FaUsers, FaTruck, FaUserTie, FaShoppingCart, FaExchangeAlt, FaBoxOpen } from "react-icons/fa";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const stats = [
  { title: "Customers", value: "6 Records", icon: <FaUsers className="text-blue-500 text-3xl" /> },
  { title: "Supplier", value: "5 Records", icon: <FaTruck className="text-orange-500 text-3xl" /> },
  { title: "Employees", value: "4 Records", icon: <FaUserTie className="text-green-500 text-3xl" /> },
  { title: "Registered Account", value: "2 Records", icon: <FaBoxOpen className="text-red-500 text-3xl" /> },
  { title: "Products", value: "125 Records", icon: <FaShoppingCart className="text-teal-500 text-3xl" /> },
  { title: "Transaction", value: "15 Records", icon: <FaExchangeAlt className="text-yellow-500 text-3xl" /> },
];

export default function Dashboard() {
  const [user, setUser] = useState({ name: "Loading...", email: "Loading..." });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    } else {
      router.push("/"); 
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    router.push("/"); 
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 p-6 bg-gray-100 relative">
        {/* Navbar moved to top-right */}
        <Navbar className="absolute top-0 right-0 p-4">
          <Nav>
            <Dropdown show={dropdownOpen}>
              <button
                className="flex items-center border-0 bg-transparent focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src="/me.jpg" alt="Profile" className="rounded-full w-10 h-10 cursor-pointer" />
              </button>
              <Dropdown.Menu align="end" show={dropdownOpen}>
                <Dropdown.Item disabled>{user.name}</Dropdown.Item>
                <Dropdown.Item disabled>{user.email}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-md border rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-700 flex items-center gap-2">
                  {stat.icon} {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
