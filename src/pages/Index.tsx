
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Pill, Clock, Utensils, Bell } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ReportUpload from '@/components/ReportUpload';
import MedicineManager from '@/components/MedicineManager';
import ReminderSettings from '@/components/ReminderSettings';
import DashboardOverview from '@/components/DashboardOverview';
import RecommendationsPanel from '@/components/RecommendationsPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to MediCare Assistant
            </h1>
            <p className="text-lg text-muted-foreground">
              Your AI-powered health management companion
            </p>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="medicines" className="flex items-center gap-2">
                <Pill className="w-4 h-4" />
                Medicines
              </TabsTrigger>
              <TabsTrigger value="reminders" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Reminders
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Health Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <DashboardOverview />
            </TabsContent>

            <TabsContent value="reports">
              <ReportUpload />
            </TabsContent>

            <TabsContent value="medicines">
              <MedicineManager />
            </TabsContent>

            <TabsContent value="reminders">
              <ReminderSettings />
            </TabsContent>

            <TabsContent value="recommendations">
              <RecommendationsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
