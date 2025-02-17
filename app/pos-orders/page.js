"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaSearch, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "sonner"; // Import Sonner's toast function
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const POSPage = () => {
  const [products, setProducts] = useState([]); // Product catalog
  const [cart, setCart] = useState([]); // Cart items
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost/harah-api/products.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            operation: "get",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        if (data.status === "success") {
          setProducts(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.prod_id === product.prod_id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.prod_id === product.prod_id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    toast.success(`${product.prod_name} has been added to the cart.`); // Use Sonner's toast
  };

  // Update quantity
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart(
      cart.map((item) => (item.prod_id === id ? { ...item, qty: qty } : item))
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.prod_id !== id));
    toast.error("The item has been removed from the cart."); // Use Sonner's toast
  };

  // Calculate totals
  const total = cart.reduce((sum, item) => sum + item.prod_price * item.qty, 0);
  const tax = total * 0.098;
  const net = total - tax;

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.prod_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

        <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* Navbar */}
        <Navbar />
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button>
          <FaSearch className="mr-2" />
          Search
        </Button>
      </div>

      {/* Product Catalog */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.prod_id} className="p-4">
                <h3 className="font-semibold">{product.prod_name}</h3>
                <p className="text-sm text-gray-600">{product.prod_description}</p>
                <p className="font-bold">${product.prod_price.toFixed(2)}</p>
                <Button onClick={() => addToCart(product)} className="mt-2">
                  <FaPlus className="mr-2" />
                  Add to Cart
                </Button>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cart Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.prod_id}>
                  <TableCell>{item.prod_name}</TableCell>
                  <TableCell>{item.prod_code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.prod_id, item.qty - 1)}
                      >
                        <FaMinus />
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.prod_id, item.qty + 1)}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>${item.prod_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.prod_id)}
                    >
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Total: ${total.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Net: ${net.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="warning">Pending Sales</Button>
        <Button variant="info">Pickup Orders</Button>
        <Button variant="secondary">Coupons</Button>
        <Button variant="success">PAY</Button>
        <Button variant="destructive">SALE</Button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default POSPage;