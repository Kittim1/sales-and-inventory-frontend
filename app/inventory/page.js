"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

        // Fetch inventory data from the PHP backend
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost/harah-api/inventory.php', {
                    method: 'POST', // Use POST instead of GET
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Use this content type
                    },
                    body: new URLSearchParams({
                        operation: 'get', // Specify the operation
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch inventory data');
                }

                const data = await response.json();

                if (data.status === 'success') {
                    setInventory(data.data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                
                <Card className="shadow-md border rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-gray-700">Inventory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Inventory List</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Product ID</TableHead>
                                    <TableHead>Stock In</TableHead>
                                    <TableHead>Stock Out</TableHead>
                                    <TableHead>Current Stock</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventory.map((item) => (
                                    <TableRow key={item.inv_id}>
                                        <TableCell>{item.inv_id}</TableCell>
                                        <TableCell>{item.prod_id}</TableCell>
                                        <TableCell>{item.stock_in}</TableCell>
                                        <TableCell>{item.stock_out}</TableCell>
                                        <TableCell>{item.current_stock}</TableCell>
                                        <TableCell>{item.last_updated}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default InventoryPage;