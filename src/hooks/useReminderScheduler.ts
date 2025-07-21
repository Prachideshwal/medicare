
import { useEffect, useRef } from 'react';
import { useNotifications } from './useNotifications';

interface WaterSettings {
  enabled: boolean;
  interval: number;
  startTime: string;
  endTime: string;
  goal: number;
}

interface SleepSettings {
  enabled: boolean;
  bedtime: string;
  wakeup: string;
  reminder: number;
}

interface MealSettings {
  enabled: boolean;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

interface ReminderSettings {
  water: WaterSettings;
  sleep: SleepSettings;
  meals: MealSettings;
}

export const useReminderScheduler = (settings: ReminderSettings) => {
  const { showNotification } = useNotifications();
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(interval => clearInterval(interval));
    intervalsRef.current = [];
  };

  const scheduleWaterReminders = () => {
    if (!settings.water.enabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const startTime = parseInt(settings.water.startTime.split(':')[0]) * 60 + parseInt(settings.water.startTime.split(':')[1]);
      const endTime = parseInt(settings.water.endTime.split(':')[0]) * 60 + parseInt(settings.water.endTime.split(':')[1]);

      if (currentTime >= startTime && currentTime <= endTime) {
        showNotification({
          title: '💧 Time to Hydrate!',
          body: `Don't forget to drink a glass of water. Goal: ${settings.water.goal} glasses today.`,
          tag: 'water-reminder'
        });
      }
    }, settings.water.interval * 60 * 60 * 1000); // Convert hours to milliseconds

    intervalsRef.current.push(interval);
  };

  const scheduleSleepReminders = () => {
    if (!settings.sleep.enabled) return;

    const checkSleepTime = () => {
      const now = new Date();
      const bedtimeHour = parseInt(settings.sleep.bedtime.split(':')[0]);
      const bedtimeMinute = parseInt(settings.sleep.bedtime.split(':')[1]);
      
      const reminderTime = new Date();
      reminderTime.setHours(bedtimeHour, bedtimeMinute - settings.sleep.reminder, 0, 0);

      const currentTime = now.getHours() * 60 + now.getMinutes();
      const targetTime = reminderTime.getHours() * 60 + reminderTime.getMinutes();

      if (Math.abs(currentTime - targetTime) < 1) {
        showNotification({
          title: '🌙 Bedtime Reminder',
          body: `Time to start winding down! Bedtime in ${settings.sleep.reminder} minutes.`,
          tag: 'sleep-reminder'
        });
      }
    };

    const interval = setInterval(checkSleepTime, 60000); // Check every minute
    intervalsRef.current.push(interval);
  };

  const scheduleMealReminders = () => {
    if (!settings.meals.enabled) return;

    const mealTimes = [
      { name: 'Breakfast', time: settings.meals.breakfast, emoji: '🍳' },
      { name: 'Lunch', time: settings.meals.lunch, emoji: '🥗' },
      { name: 'Snack', time: settings.meals.snack, emoji: '🍎' },
      { name: 'Dinner', time: settings.meals.dinner, emoji: '🍽️' }
    ];

    const checkMealTimes = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      mealTimes.forEach(meal => {
        const mealHour = parseInt(meal.time.split(':')[0]);
        const mealMinute = parseInt(meal.time.split(':')[1]);
        const mealTime = mealHour * 60 + mealMinute;

        if (Math.abs(currentTime - mealTime) < 1) {
          showNotification({
            title: `${meal.emoji} ${meal.name} Time!`,
            body: `It's time for your ${meal.name.toLowerCase()}. Don't forget to eat healthy!`,
            tag: `meal-${meal.name.toLowerCase()}`
          });
        }
      });
    };

    const interval = setInterval(checkMealTimes, 60000); // Check every minute
    intervalsRef.current.push(interval);
  };

  useEffect(() => {
    clearAllIntervals();
    
    scheduleWaterReminders();
    scheduleSleepReminders();
    scheduleMealReminders();

    return () => {
      clearAllIntervals();
    };
  }, [settings]);

  return {
    clearAllIntervals
  };
};
