"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../shared/Button";
import { getUserProfile, logoutUser } from "../../services/internal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        console.log(res,'respomce')
        setUser(res.data.user);
      } catch (err) {
        setUser(null); // Not logged in
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out");
      setUser(null);
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo or App name */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MyApp
      </Link>

      {/* Links */}
      <div className="space-x-4 flex items-center">
        {!user ? (
          <>
            <Link href="/Login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link href="/Register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-600 text-sm">Hi, {user.username}</span>
            <Button
              label="Logout"
              onClick={handleLogout}
              className="!py-1 !px-3 text-sm bg-red-500 hover:bg-red-600"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
