'use client'

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, Form } from "react-bootstrap";
import { Plus } from "lucide-react";
import CustomNavbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { toast } from "sonner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    product_cost: "",
    category_id: "",
    supplier_id: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost/harah-api/products.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: "get" }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setProducts(data.data);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`http://localhost/harah-api/category.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: "getCategories" }),
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  async function fetchSuppliers() {
    try {
        const response = await fetch("http://localhost/harah-api/supplier.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operation: "get" })
        });

        const text = await response.text(); // Read response as text first
        console.log("Raw Response:", text); // Debugging: Print raw response

        const data = JSON.parse(text); // Try parsing JSON
        console.log("Parsed Data:", data);
        
        if (!response.ok) throw new Error(data.message || "Failed to fetch suppliers");

        return data;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
    }
}

fetchSuppliers();


  const handleAddProduct = async () => {
    try {
      const res = await fetch(`http://localhost/harah-api/products.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: "add", ...newProduct }),
      });
      const data = await res.json();
      
      if (data.status === "success") {
        toast.success("Product added successfully!");
        fetchProducts();
        setShowModal(false);
        setNewProduct({
          product_name: "",
          product_description: "",
          product_price: "",
          product_cost: "",
          category_id: "",
          supplier_id: "",
        });
      } else {
        toast.error(`Failed to add product: ${data.message}`);
      }
    } catch (error) {
      toast.error("Error adding product. Please check your connection or API.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <CustomNavbar />
      <div className="flex flex-1">
        <Sidebar className="w-64" />
        <div className="flex-1 p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="flex justify-between items-center mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-1/2 p-2 border rounded-md"
              />
              <Button
                onClick={() => setShowModal(true)}
                className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md"
              >
                <Plus size={18} className="mr-2" /> Add Product
              </Button>
            </div>
            <Card>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Supplier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.product_id}>
                          <TableCell>{product.product_id}</TableCell>
                          <TableCell>{product.product_name}</TableCell>
                          <TableCell>{product.product_description}</TableCell>
                          <TableCell>{product.product_price}</TableCell>
                          <TableCell>{product.product_cost}</TableCell>
                          <TableCell>
                            {categories.find(c => c.category_id === product.category_id)?.category_name || "Unknown"}
                          </TableCell>
                          <TableCell>
                            {suppliers.find(s => s.supplier_id === product.supplier_id)?.supplier_name || "Unknown"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.product_name}
                  onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={newProduct.product_description}
                  onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={newProduct.product_price}
                  onChange={(e) => setNewProduct({ ...newProduct, product_price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cost"
                  value={newProduct.product_cost}
                  onChange={(e) => setNewProduct({ ...newProduct, product_cost: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newProduct.category_id}
                onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Supplier</Form.Label>
              <Form.Select
                value={newProduct.supplier_id}
                onChange={(e) => setNewProduct({ ...newProduct, supplier_id: e.target.value })}
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.supplier_id} value={supplier.supplier_id}>
                    {supplier.supplier_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>


          </div>
        </div>
      </div>
    </div>
  );
}
