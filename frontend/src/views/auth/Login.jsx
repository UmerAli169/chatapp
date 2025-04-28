"use client"
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { loginUser, getUserProfile } from "@/services/internal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux"; // import dispatch
import { setUser } from "../../store/auth/userSlice";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch(); 
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(formData);
      const res = await getUserProfile();
      dispatch(setUser(res.data.user));
      toast.success("Logged in successfully!");
      router.push("/"); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <Button type="submit" label="Login" isLoading={loading} className="w-full mt-4" />
        </form>
        <p className="text-sm mt-5 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
