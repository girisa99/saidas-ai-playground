import React from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { GenieConversationDashboard } from '@/components/admin/GenieConversationDashboard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <GenieConversationDashboard />
    </div>
  );
};

export default AdminDashboard;