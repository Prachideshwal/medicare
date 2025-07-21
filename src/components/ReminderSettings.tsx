import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplets, Moon, Utensils, Bell, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';
import { useReminderScheduler } from '@/hooks/useReminderScheduler';

const ReminderSettings = () => {
  const [waterSettings, setWaterSettings] = useState({
    enabled: true,
    interval: 2, // hours
    startTime: '07:00',
    endTime: '22:00',
    goal: 8 // glasses
  });

  const [sleepSettings, setSleepSettings] = useState({
    enabled: true,
    bedtime: '22:30',
    wakeup: '07:00',
    reminder: 30 // minutes before bedtime
  });

  const [mealSettings, setMealSettings] = useState({
    enabled: true,
    breakfast: '07:00',
    lunch: '12:00',
    snack: '15:30',
    dinner: '19:00'
  });

  const { toast } = useToast();
  const { showNotification, requestPermission, isSupported, permission } = useNotifications();

  // Initialize the reminder scheduler
  useReminderScheduler({
    water: waterSettings,
    sleep: sleepSettings,
    meals: mealSettings
  });

  const saveSettings = async () => {
    if (isSupported && permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        toast({
          title: "Notification Permission Required",
          description: "Please enable notifications to receive reminders",
          variant: "destructive"
        });
        return;
      }
    }

    toast({
      title: "Settings saved successfully",
      description: "Your reminder preferences have been updated",
    });

    // Show a test notification
    if (waterSettings.enabled || sleepSettings.enabled || mealSettings.enabled) {
      showNotification({
        title: "🎯 Reminders Active!",
        body: "Your health reminders are now set up and will notify you at the scheduled times.",
        tag: "settings-saved"
      });
    }
  };

  const testNotification = () => {
    showNotification({
      title: "🔔 Test Notification",
      body: "This is how your reminders will look!",
      tag: "test"
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Reminder Settings</h2>
        <p className="text-gray-600">Customize your health reminders and schedules</p>
        
        {!isSupported && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Browser notifications are not supported</span>
            </div>
          </div>
        )}
        
        {isSupported && permission !== 'granted' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <Bell className="w-4 h-4" />
              <span className="text-sm">Enable notifications to receive reminders</span>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="water" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="water" className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            Water
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Sleep
          </TabsTrigger>
          <TabsTrigger value="meals" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Meals
          </TabsTrigger>
        </TabsList>

        {/* Water Reminders */}
        <TabsContent value="water">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-600" />
                Water Intake Reminders
              </CardTitle>
              <CardDescription>
                Set up reminders to stay hydrated throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="water-enabled" className="text-base font-medium">
                    Enable Water Reminders
                  </Label>
                  <p className="text-sm text-gray-600">Get notified to drink water regularly</p>
                </div>
                <Switch
                  id="water-enabled"
                  checked={waterSettings.enabled}
                  onCheckedChange={(checked) => setWaterSettings({...waterSettings, enabled: checked})}
                />
              </div>

              {waterSettings.enabled && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Reminder Interval: {waterSettings.interval} hours
                      </Label>
                      <Slider
                        value={[waterSettings.interval]}
                        onValueChange={(value) => setWaterSettings({...waterSettings, interval: value[0]})}
                        max={4}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>1 hour</span>
                        <span>4 hours</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="water-start">Start Time</Label>
                        <Input
                          id="water-start"
                          type="time"
                          value={waterSettings.startTime}
                          onChange={(e) => setWaterSettings({...waterSettings, startTime: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="water-end">End Time</Label>
                        <Input
                          id="water-end"
                          type="time"
                          value={waterSettings.endTime}
                          onChange={(e) => setWaterSettings({...waterSettings, endTime: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Daily Goal: {waterSettings.goal} glasses
                      </Label>
                      <Slider
                        value={[waterSettings.goal]}
                        onValueChange={(value) => setWaterSettings({...waterSettings, goal: value[0]})}
                        max={12}
                        min={4}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>4 glasses</span>
                        <span>12 glasses</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sleep Reminders */}
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-purple-600" />
                Sleep Schedule
              </CardTitle>
              <CardDescription>
                Set your sleep schedule and bedtime reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sleep-enabled" className="text-base font-medium">
                    Enable Sleep Reminders
                  </Label>
                  <p className="text-sm text-gray-600">Get reminded when it's time to sleep</p>
                </div>
                <Switch
                  id="sleep-enabled"
                  checked={sleepSettings.enabled}
                  onCheckedChange={(checked) => setSleepSettings({...sleepSettings, enabled: checked})}
                />
              </div>

              {sleepSettings.enabled && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedtime">Bedtime</Label>
                      <Input
                        id="bedtime"
                        type="time"
                        value={sleepSettings.bedtime}
                        onChange={(e) => setSleepSettings({...sleepSettings, bedtime: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="wakeup">Wake Up Time</Label>
                      <Input
                        id="wakeup"
                        type="time"
                        value={sleepSettings.wakeup}
                        onChange={(e) => setSleepSettings({...sleepSettings, wakeup: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Bedtime Reminder: {sleepSettings.reminder} minutes before
                    </Label>
                    <Slider
                      value={[sleepSettings.reminder]}
                      onValueChange={(value) => setSleepSettings({...sleepSettings, reminder: value[0]})}
                      max={60}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>10 min</span>
                      <span>60 min</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Sleep Schedule Summary</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      You'll get a reminder at {new Date(`2000-01-01 ${sleepSettings.bedtime}`).getTime() - (sleepSettings.reminder * 60000) > 0 ? 
                        new Date(new Date(`2000-01-01 ${sleepSettings.bedtime}`).getTime() - (sleepSettings.reminder * 60000)).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) : 
                        'Invalid time'} 
                      to prepare for bed at {sleepSettings.bedtime}, aiming for {
                        Math.round((new Date(`2000-01-02 ${sleepSettings.wakeup}`).getTime() - new Date(`2000-01-01 ${sleepSettings.bedtime}`).getTime()) / (1000 * 60 * 60))
                      } hours of sleep.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal Reminders */}
        <TabsContent value="meals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-green-600" />
                Meal Schedule
              </CardTitle>
              <CardDescription>
                Set reminders for your daily meals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="meal-enabled" className="text-base font-medium">
                    Enable Meal Reminders
                  </Label>
                  <p className="text-sm text-gray-600">Get reminded for your meal times</p>
                </div>
                <Switch
                  id="meal-enabled"
                  checked={mealSettings.enabled}
                  onCheckedChange={(checked) => setMealSettings({...mealSettings, enabled: checked})}
                />
              </div>

              {mealSettings.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="breakfast">Breakfast</Label>
                    <Input
                      id="breakfast"
                      type="time"
                      value={mealSettings.breakfast}
                      onChange={(e) => setMealSettings({...mealSettings, breakfast: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lunch">Lunch</Label>
                    <Input
                      id="lunch"
                      type="time"
                      value={mealSettings.lunch}
                      onChange={(e) => setMealSettings({...mealSettings, lunch: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="snack">Afternoon Snack</Label>
                    <Input
                      id="snack"
                      type="time"
                      value={mealSettings.snack}
                      onChange={(e) => setMealSettings({...mealSettings, snack: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dinner">Dinner</Label>
                    <Input
                      id="dinner"
                      type="time"
                      value={mealSettings.dinner}
                      onChange={(e) => setMealSettings({...mealSettings, dinner: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-6 space-y-4">
          <Button onClick={testNotification} variant="outline" className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Test Notification
          </Button>
          
          <Button onClick={saveSettings} className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Save All Reminder Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReminderSettings;
