import React from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { EnhancedGenieDashboard } from '@/components/admin/EnhancedGenieDashboard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <EnhancedGenieDashboard />
    </div>
  );
};

export default AdminDashboard;