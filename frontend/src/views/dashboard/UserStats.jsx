
"use client"
import React from "react";
import { useSelector } from "react-redux";
import Card from "@/components/shared/Card";

const UserStats = () => {
  const stats = useSelector((state) => state?.dashboard?.stats);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
     {stats &&
  Object.entries(stats).map(([label, value]) => (
    <Card key={label}>
      <h3 className="text-sm text-gray-500 capitalize">{label}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </Card>
))}
    </div>
  );
};

export default UserStats;
