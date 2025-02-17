'use client';
import React, { useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";

const CustomNavbar = () => {
    const [user] = useState({ name: "John Clemz", email: "john.clemz@example.com" });
    const router = useRouter();

    const handleLogout = () => {
        alert("Logging out...");
        router.push("/login");
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
            <Navbar.Brand>HARAH RUBINA DEL DIOS SIS</Navbar.Brand>
            <Nav className="ml-auto">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <img src="/profile-icon.png" alt="Profile" className="rounded-circle" width="30" /> {user.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item disabled>{user.name}</Dropdown.Item>
                        <Dropdown.Item disabled>{user.email}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    );
};

export default CustomNavbar;
