"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Button from "../shared/Button";
import { getUserProfile, logoutUser } from "../../services/internal"; // API call for user profile
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  logoutUser as logoutAction,
} from "../../store/auth/userSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await getUserProfile(); 
        if (res.data.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      toast.success("Logged out");
      dispatch(logoutAction())
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
            <Link
              href="/Dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link href="/Chat" className="text-gray-700 hover:text-blue-600">
              Chat
            </Link>
            <Link
              href="/Settings"
              className="text-gray-700 hover:text-blue-600"
            >
              Settings
            </Link>
            <span className="text-gray-600 text-sm">Hi, {user.username}</span>
            <Button
              label="Logout"
              onClick={handleLogout}
              className="!py-1 !px-3 text-sm bg-red-500 hover:bg-blue-600"
            />
          </>
        ) : (
          <>
            <Link href="/Login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/Register"
              className="text-gray-700 hover:text-blue-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
