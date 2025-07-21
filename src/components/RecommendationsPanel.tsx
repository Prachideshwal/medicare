import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Activity, Brain, Heart, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RecommendationsPanel = () => {
  const [recommendations, setRecommendations] = useState({
    nutrition: [
      {
        category: "Anti-inflammatory Foods",
        items: ["Leafy greens (spinach, kale)", "Fatty fish (salmon, mackerel)", "Berries (blueberries, strawberries)", "Nuts and seeds"],
        reason: "To help reduce inflammation and support cardiovascular health"
      },
      {
        category: "Foods to Limit",
        items: ["Processed foods", "High sodium snacks", "Sugary beverages", "Red meat"],
        reason: "To maintain healthy blood pressure and glucose levels"
      },
      {
        category: "Hydration",
        items: ["8-10 glasses of water daily", "Herbal teas", "Low-sodium broths"],
        reason: "Proper hydration supports kidney function and blood pressure regulation"
      }
    ],
    exercise: [
      {
        type: "Cardiovascular Exercise",
        activities: ["Brisk walking (30 min daily)", "Swimming", "Cycling", "Dancing"],
        frequency: "5 days per week",
        benefits: "Improves heart health and helps manage blood pressure"
      },
      {
        type: "Strength Training",
        activities: ["Light weights", "Resistance bands", "Bodyweight exercises"],
        frequency: "2-3 days per week",
        benefits: "Maintains muscle mass and bone density"
      },
      {
        type: "Flexibility & Balance",
        activities: ["Yoga", "Tai Chi", "Stretching", "Balance exercises"],
        frequency: "Daily",
        benefits: "Reduces fall risk and improves mobility"
      }
    ],
    lifestyle: [
      {
        area: "Stress Management",
        recommendations: ["Deep breathing exercises", "Meditation (10-15 min daily)", "Regular sleep schedule", "Social connections"],
        impact: "Reduces cortisol levels and supports overall health"
      },
      {
        area: "Sleep Hygiene",
        recommendations: ["7-9 hours nightly", "Cool, dark room", "No screens 1hr before bed", "Consistent sleep schedule"],
        impact: "Improves immune function and mental clarity"
      },
      {
        area: "Monitoring",
        recommendations: ["Daily blood pressure checks", "Weekly weight monitoring", "Monthly doctor visits", "Medication adherence"],
        impact: "Early detection of changes and better health outcomes"
      }
    ]
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const mealPlan = {
    breakfast: {
      title: "Heart-Healthy Breakfast",
      meals: [
        "Oatmeal with berries and nuts",
        "Greek yogurt with granola",
        "Whole grain toast with avocado",
        "Smoothie with spinach and fruits"
      ]
    },
    lunch: {
      title: "Balanced Lunch",
      meals: [
        "Grilled salmon with quinoa",
        "Lentil soup with vegetables",
        "Chicken salad with olive oil dressing",
        "Vegetable stir-fry with brown rice"
      ]
    },
    snack: {
      title: "Healthy Snacks",
      meals: [
        "Apple slices with almond butter",
        "Carrot sticks with hummus",
        "Mixed nuts and seeds",
        "Greek yogurt with cucumber"
      ]
    },
    dinner: {
      title: "Light Dinner",
      meals: [
        "Baked fish with roasted vegetables",
        "Turkey and vegetable soup",
        "Grilled chicken with sweet potato",
        "Vegetable curry with chickpeas"
      ]
    }
  };

  const updateRecommendations = async () => {
    setIsUpdating(true);
    
    // Simulate API call to get updated recommendations
    setTimeout(() => {
      // Add some new recommendations to show the update worked
      const updatedNutrition = [
        ...recommendations.nutrition,
        {
          category: "Seasonal Foods",
          items: ["Fresh citrus fruits", "Winter squash", "Root vegetables", "Pomegranates"],
          reason: "Seasonal foods provide optimal nutrients and support immune system"
        }
      ];

      setRecommendations({
        ...recommendations,
        nutrition: updatedNutrition
      });

      setIsUpdating(false);
      toast({
        title: "Recommendations Updated",
        description: "Your personalized health recommendations have been refreshed based on your latest data.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Personalized Health Recommendations</h2>
        <p className="text-gray-600">AI-generated suggestions based on your medical profile</p>
      </div>

      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Exercise
          </TabsTrigger>
          <TabsTrigger value="lifestyle" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Lifestyle
          </TabsTrigger>
          <TabsTrigger value="meals" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Meal Plans
          </TabsTrigger>
        </TabsList>

        {/* Nutrition Recommendations */}
        <TabsContent value="nutrition">
          <div className="space-y-4">
            {recommendations.nutrition.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <CardDescription>{category.reason}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {category.items.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="outline" className="justify-start p-2">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Exercise Recommendations */}
        <TabsContent value="exercise">
          <div className="space-y-4">
            {recommendations.exercise.map((exercise, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{exercise.type}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="mr-2">{exercise.frequency}</Badge>
                    {exercise.benefits}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {exercise.activities.map((activity, actIndex) => (
                      <Badge key={actIndex} variant="outline" className="justify-start p-2">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Lifestyle Recommendations */}
        <TabsContent value="lifestyle">
          <div className="space-y-4">
            {recommendations.lifestyle.map((lifestyle, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{lifestyle.area}</CardTitle>
                  <CardDescription>{lifestyle.impact}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {lifestyle.recommendations.map((rec, recIndex) => (
                      <Badge key={recIndex} variant="outline" className="justify-start p-2">
                        {rec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Meal Plans */}
        <TabsContent value="meals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(mealPlan).map(([mealType, meal], index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{mealType}</CardTitle>
                  <CardDescription>{meal.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {meal.meals.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Get Updated Recommendations</h3>
              <p className="text-gray-600 text-sm">Refresh your personalized suggestions based on latest health data</p>
            </div>
            <Button onClick={updateRecommendations} disabled={isUpdating}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Updating...' : 'Update Recommendations'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsPanel;
