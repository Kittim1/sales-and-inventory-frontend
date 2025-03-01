"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ShoppingCart, Users, BarChart3, Settings, Package, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white flex flex-col p-4 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      


      {/* Navigation Menu */}
      <nav className="space-y-2">
              {/* Toggle Button */}
      <Button
        variant="ghost"
        className="mb-4 text-gray-300 hover:bg-gray-700 flex items-center"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Home className="mr-2 h-5 w-5" />
            {!isCollapsed && "Dashboard"}
          </Button>
        </Link>
        <Link href="/pos-orders">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {!isCollapsed && "POS & Orders"}
          </Button>
        </Link>
        <Link href="/customers">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Users className="mr-2 h-5 w-5" />
            {!isCollapsed && "Customers"}
          </Button>
        </Link>
        <Link href="/employees">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Users className="mr-2 h-5 w-5" />
            {!isCollapsed && "Employees"}
          </Button>
        </Link>
        <Link href="/sales">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <BarChart3 className="mr-2 h-5 w-5" />
            {!isCollapsed && "Sales"}
          </Button>
        </Link>
        <Link href="/transactions">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <BarChart3 className="mr-2 h-5 w-5" />
            {!isCollapsed && "Transactions"}
          </Button>
          </Link>
        <Link href="/products">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Package className="mr-2 h-5 w-5" />
            {!isCollapsed && "Products"}
          </Button>
        </Link>
      </nav>

      {/* Settings */}
      <div className="mt-auto">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Settings className="mr-2 h-5 w-5" />
            {!isCollapsed && "Settings"}
          </Button>
        </Link>
      </div>
      
    </div>
  );
};

export default Sidebar;
