import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pill, Plus, Edit, Trash2, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  schedule: string[];
  instructions: string;
}

const initialMedicines: Medicine[] = [
  {
    id: 1,
    name: 'Vitamin D',
    dosage: '5000 IU',
    frequency: 'Daily',
    purpose: 'Supplement',
    schedule: ['08:00'],
    instructions: 'Take with food'
  },
  {
    id: 2,
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Daily',
    purpose: 'Blood Pressure',
    schedule: ['09:00'],
    instructions: 'Take in the morning'
  },
  {
    id: 3,
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    purpose: 'Diabetes',
    schedule: ['10:00', '20:00'],
    instructions: 'Take with meals'
  }
];

const MedicineManager = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [newMedicine, setNewMedicine] = useState<Omit<Medicine, 'id'>>({
    name: '',
    dosage: '',
    frequency: '',
    purpose: '',
    schedule: [],
    instructions: ''
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const { toast } = useToast();

  const addMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.frequency) {
      const medicine = {
        ...newMedicine,
        id: Date.now(), // Generate unique ID
        schedule: newMedicine.schedule.filter(time => time.trim() !== '')
      };
      setMedicines([...medicines, medicine]);
      setNewMedicine({
        name: '',
        dosage: '',
        frequency: '',
        purpose: '',
        schedule: [],
        instructions: ''
      });
      setIsAddDialogOpen(false);
      toast({
        title: "Medicine added successfully",
        description: `${medicine.name} has been added to your medication list`,
      });
    }
  };

  const updateMedicine = () => {
    if (editingMedicine) {
      const updatedMedicines = medicines.map(med => 
        med.id === editingMedicine.id 
          ? { ...editingMedicine, schedule: editingMedicine.schedule.filter(time => time.trim() !== '') }
          : med
      );
      setMedicines(updatedMedicines);
      setEditingMedicine(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Medicine updated successfully",
        description: "Your medication has been updated",
      });
    }
  };

  const deleteMedicine = (id: number) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
    toast({
      title: "Medicine deleted successfully",
      description: "Your medication has been removed from the list",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Manage Your Medicines</h2>
        <p className="text-gray-600">Keep track of your medications and schedule</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Medicines</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>View and manage your medications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {medicines.length > 0 ? (
                <div className="grid gap-4">
                  {medicines.map(medicine => (
                    <Card key={medicine.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{medicine.name}</CardTitle>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setEditingMedicine(medicine);
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteMedicine(medicine.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Dosage</Label>
                            <Badge variant="secondary">{medicine.dosage}</Badge>
                          </div>
                          <div>
                            <Label>Frequency</Label>
                            <Badge variant="secondary">{medicine.frequency}</Badge>
                          </div>
                          <div>
                            <Label>Purpose</Label>
                            <Badge variant="secondary">{medicine.purpose}</Badge>
                          </div>
                          <div>
                            <Label>Schedule</Label>
                            <div>
                              {medicine.schedule.map((time, index) => (
                                <Badge key={index} className="mr-1">{time}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Instructions</Label>
                          <p className="text-sm text-gray-600">{medicine.instructions}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No medicines added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Medicines</CardTitle>
              <CardDescription>View medicines with scheduled times</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {medicines.filter(medicine => medicine.schedule.length > 0).length > 0 ? (
                <div className="grid gap-4">
                  {medicines.filter(medicine => medicine.schedule.length > 0).map(medicine => (
                    <Card key={medicine.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{medicine.name}</CardTitle>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setEditingMedicine(medicine);
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteMedicine(medicine.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Dosage</Label>
                            <Badge variant="secondary">{medicine.dosage}</Badge>
                          </div>
                          <div>
                            <Label>Frequency</Label>
                            <Badge variant="secondary">{medicine.frequency}</Badge>
                          </div>
                          <div>
                            <Label>Purpose</Label>
                            <Badge variant="secondary">{medicine.purpose}</Badge>
                          </div>
                          <div>
                            <Label>Schedule</Label>
                            <div>
                              {medicine.schedule.map((time, index) => (
                                <Badge key={index} className="mr-1">{time}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Instructions</Label>
                          <p className="text-sm text-gray-600">{medicine.instructions}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No medicines scheduled yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
            <DialogDescription>
              Add a new medicine to your list. Set the dosage, frequency, and schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={newMedicine.name} onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dosage" className="text-right">
                Dosage
              </Label>
              <Input id="dosage" value={newMedicine.dosage} onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Input id="frequency" value={newMedicine.frequency} onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purpose" className="text-right">
                Purpose
              </Label>
              <Input id="purpose" value={newMedicine.purpose} onChange={(e) => setNewMedicine({ ...newMedicine, purpose: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule" className="text-right">
                Schedule
              </Label>
              <div className="col-span-3 space-y-2">
                {new Array(3).fill(null).map((_, index) => (
                  <Input
                    key={index}
                    type="time"
                    value={newMedicine.schedule[index] || ''}
                    onChange={(e) => {
                      const newSchedule = [...newMedicine.schedule];
                      newSchedule[index] = e.target.value;
                      setNewMedicine({ ...newMedicine, schedule: newSchedule });
                    }}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructions" className="text-right">
                Instructions
              </Label>
              <Input id="instructions" value={newMedicine.instructions} onChange={(e) => setNewMedicine({ ...newMedicine, instructions: e.target.value })} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={addMedicine}>
              Add Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
            <DialogDescription>
              Edit the details of your medicine.
            </DialogDescription>
          </DialogHeader>
          {editingMedicine && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={editingMedicine.name} onChange={(e) => setEditingMedicine({ ...editingMedicine, name: e.target.value })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosage" className="text-right">
                  Dosage
                </Label>
                <Input id="dosage" value={editingMedicine.dosage} onChange={(e) => setEditingMedicine({ ...editingMedicine, dosage: e.target.value })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="frequency" className="text-right">
                  Frequency
                </Label>
                <Input id="frequency" value={editingMedicine.frequency} onChange={(e) => setEditingMedicine({ ...editingMedicine, frequency: e.target.value })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purpose" className="text-right">
                  Purpose
                </Label>
                <Input id="purpose" value={editingMedicine.purpose} onChange={(e) => setEditingMedicine({ ...editingMedicine, purpose: e.target.value })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule" className="text-right">
                  Schedule
                </Label>
                <div className="col-span-3 space-y-2">
                  {new Array(3).fill(null).map((_, index) => (
                    <Input
                      key={index}
                      type="time"
                      value={editingMedicine.schedule[index] || ''}
                      onChange={(e) => {
                        const newSchedule = [...editingMedicine.schedule];
                        newSchedule[index] = e.target.value;
                        setEditingMedicine({ ...editingMedicine, schedule: newSchedule });
                      }}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructions" className="text-right">
                  Instructions
                </Label>
                <Input id="instructions" value={editingMedicine.instructions} onChange={(e) => setEditingMedicine({ ...editingMedicine, instructions: e.target.value })} className="col-span-3" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={updateMedicine}>
              Update Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicineManager;
