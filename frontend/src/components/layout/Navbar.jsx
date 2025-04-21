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
        console.log(res,'omer')
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out");
      setUser(null);
      router.push("/Login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MyApp
      </Link>

      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <Link href="/(screen)/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/(screen)/chat" className="text-gray-700 hover:text-blue-600">
              Chat
            </Link>
            <Link href="/(screen)/settings" className="text-gray-700 hover:text-blue-600">
              Settings
            </Link>
            <span className="text-gray-600 text-sm">Hi, {user.username}</span>
            <Button
              label="Logout"
              onClick={handleLogout}
              className="!py-1 !px-3 text-sm bg-red-500 hover:bg-red-600"
            />
          </>
        ) : (
          <>
            <Link href="/Login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link href="/Register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
