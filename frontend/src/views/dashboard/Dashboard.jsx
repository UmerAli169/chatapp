import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import UserStats from "./UserStats";
import RecentMessages from "./RecentMessages";
import QuickActions from "./QuickActions";
import Notification from "@/components/shared/Notification";

const Dashboard = () => {
  return (
    <section className="p-6 space-y-6 max-w-6xl mx-auto">
      <Notification />
      <WelcomeBanner />
      <UserStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentMessages />
        <QuickActions />
      </div>
    </section>
  );
};

export default Dashboard;
