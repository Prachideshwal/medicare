
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Pill, Droplets, Moon, Utensils, Activity } from 'lucide-react';

const DashboardOverview = () => {
  const upcomingReminders = [
    { type: 'medicine', name: 'Vitamin D3', time: '2:00 PM', status: 'pending' },
    { type: 'water', name: 'Hydration Check', time: '3:00 PM', status: 'pending' },
    { type: 'meal', name: 'Afternoon Snack', time: '4:00 PM', status: 'pending' },
    { type: 'medicine', name: 'Blood Pressure Medication', time: '6:00 PM', status: 'pending' },
  ];

  const todayStats = {
    medicinesTaken: 2,
    totalMedicines: 4,
    waterIntake: 6,
    waterGoal: 8,
    mealsCompleted: 2,
    totalMeals: 4,
    sleepGoal: '10:30 PM'
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'medicine': return <Pill className="w-4 h-4" />;
      case 'water': return <Droplets className="w-4 h-4" />;
      case 'meal': return <Utensils className="w-4 h-4" />;
      case 'sleep': return <Moon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Medicines</p>
                <p className="text-2xl font-bold">{todayStats.medicinesTaken}/{todayStats.totalMedicines}</p>
              </div>
              <Pill className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100">Water (glasses)</p>
                <p className="text-2xl font-bold">{todayStats.waterIntake}/{todayStats.waterGoal}</p>
              </div>
              <Droplets className="w-8 h-8 text-cyan-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Meals</p>
                <p className="text-2xl font-bold">{todayStats.mealsCompleted}/{todayStats.totalMeals}</p>
              </div>
              <Utensils className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Sleep Goal</p>
                <p className="text-2xl font-bold">{todayStats.sleepGoal}</p>
              </div>
              <Moon className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Reminders
          </CardTitle>
          <CardDescription>
            Your scheduled activities for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingReminders.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {getIcon(reminder.type)}
                  </div>
                  <div>
                    <p className="font-medium">{reminder.name}</p>
                    <p className="text-sm text-gray-600">{reminder.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{reminder.status}</Badge>
                  <Button size="sm" variant="outline">
                    Mark Done
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Medicine Compliance</span>
                <span className="text-sm text-gray-600">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Hydration Goal</span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-600 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Meal Schedule</span>
                <span className="text-sm text-gray-600">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
