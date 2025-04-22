"use client"
import React from "react";
import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";

const QuickActions = () => {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-3">
      <h3 className="font-bold">Quick Actions</h3>
      <div className="flex flex-col space-y-2">
        <Button label="Start Chat" onClick={() => router.push("/Chat")} />
        <Button label="Settings" onClick={() => router.push("/Settings")} />
        <Button label="Logout" className="bg-red-500 hover:bg-red-600" onClick={() => router.push("/Login")} />
      </div>
    </div>
  );
};

export default QuickActions;
