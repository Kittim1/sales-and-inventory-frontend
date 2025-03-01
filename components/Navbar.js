'use client';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CustomNavbar = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const router = useRouter();
    const dropdownRef = useRef(null);
    let lastScrollY = 0;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false); // Hide navbar when scrolling down
            } else {
                setIsVisible(true); // Show navbar when scrolling up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/");
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white shadow-md z-50 flex items-center justify-between px-4 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="flex items-center space-x-2">
                <Image
                    src="/bg-harah.jpg"
                    alt="Harah Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <h1 className="text-lg font-bold">HARAH RUBINA DEL DIOS SIS</h1>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setShowDropdown((prev) => !prev)}
                >
                    <span className="text-sm">Welcome, {user ? user.user_username : "Guest"}!</span>
                    <Image
                        src="/iring.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover border-none"
                    />
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                        <ul className="py-2 text-sm text-gray-700">
                            <li>
                                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                            </li>
                            <li>
                                <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                            </li>
                            <li>
                                <hr className="my-1" />
                            </li>
                            <li>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default CustomNavbar;
