"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, ShoppingCart, Users, BarChart3, Settings, Package } from "lucide-react"; // Added Package icon

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      {/* Brand Name with Image */}
      <div className="flex items-center justify-center mb-6">
        <Image
          src="/bg-harah.jpg"
          alt="Harah Logo"
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
        <h2 className="text-lg font-bold">HARAH RUBINA DEL DIOS SIS</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
        </Link>
        <Link href="/pos-orders">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <ShoppingCart className="mr-2 h-5 w-5" />
            POS & Orders
          </Button>
        </Link>
        <Link href="/customers-employees">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Users className="mr-2 h-5 w-5" />
            Customers & Employees
          </Button>
        </Link>
        <Link href="/sales-transactions">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <BarChart3 className="mr-2 h-5 w-5" />
            Sales & Transactions
          </Button>
        </Link>
        <Link href="/inventory"> {/* <-- Added Inventory page */}
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Package className="mr-2 h-5 w-5" />
            Inventory
          </Button>
        </Link>
      </nav>

      {/* Settings */}
      <div className="mt-auto">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
