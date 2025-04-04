
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, AlertTriangle, Wrench, Check, CalendarRange, SquarePen, Cog, Settings, Trash2, Edit, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MaintenanceRecord {
  id: number;
  vehicleId: string;
  vehicleName: string;
  type: string;
  status: string;
  date: string;
  notes: string;
  nextDate: string;
}

interface MaintenanceTrackingProps {
  vehicles: any[];
  language: string;
  formatDate: (dateString: string) => string;
}

export const MaintenanceTracking = ({ vehicles, language, formatDate }: MaintenanceTrackingProps) => {
  const { toast } = useToast();
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([
    {
      id: 1,
      vehicleId: vehicles[0]?.id || '',
      vehicleName: vehicles[0]?.name || 'Tesla Model S',
      type: 'routine',
      status: 'completed',
      date: '2025-05-10',
      notes: 'Routine oil change and tire rotation completed.',
      nextDate: '2025-08-10',
    },
    {
      id: 2,
      vehicleId: vehicles[1]?.id || '',
      vehicleName: vehicles[1]?.name || 'BMW M5',
      type: 'repair',
      status: 'pending',
      date: '2025-05-15',
      notes: 'Brake pads replacement and brake fluid flush.',
      nextDate: '2025-07-15',
    },
    {
      id: 3,
      vehicleId: vehicles[2]?.id || '',
      vehicleName: vehicles[2]?.name || 'Audi R8',
      type: 'inspection',
      status: 'scheduled',
      date: '2025-05-22',
      notes: 'Annual inspection and diagnostic check.',
      nextDate: '2026-05-22',
    },
    {
      id: 4,
      vehicleId: vehicles[3]?.id || '',
      vehicleName: vehicles[3]?.name || 'Mercedes S-Class',
      type: 'emergency',
      status: 'inProgress',
      date: '2025-05-08',
      notes: 'Engine check light on. Diagnostic testing needed.',
      nextDate: '',
    },
  ]);
  
  const [newRecord, setNewRecord] = useState({
    vehicleId: '',
    type: 'routine',
    date: '',
    notes: '',
    nextDate: '',
    status: 'scheduled',
  });

  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none">
            <Check className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'Terminé' : 'Completed'}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-none">
            <CalendarRange className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'En attente' : 'Pending'}
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-none">
            <CalendarRange className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'Planifié' : 'Scheduled'}
          </Badge>
        );
      case 'inProgress':
        return (
          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-none">
            <Settings className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'En cours' : 'In Progress'}
          </Badge>
        );
      default:
        return (
          <Badge>
            {status}
          </Badge>
        );
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'routine':
        return (
          <Badge variant="outline" className="border-blue-400 text-blue-400">
            <Cog className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'Routine' : 'Routine'}
          </Badge>
        );
      case 'repair':
        return (
          <Badge variant="outline" className="border-orange-400 text-orange-400">
            <Wrench className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'Réparation' : 'Repair'}
          </Badge>
        );
      case 'inspection':
        return (
          <Badge variant="outline" className="border-green-400 text-green-400">
            <SquarePen className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'Inspection' : 'Inspection'}
          </Badge>
        );
      case 'emergency':
        return (
          <Badge variant="outline" className="border-red-400 text-red-400">
            <AlertTriangle className="mr-1 h-4 w-4" />
            {language === 'fr' ? 'Urgence' : 'Emergency'}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {type}
          </Badge>
        );
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (editingRecord) {
      setEditingRecord({ ...editingRecord, [name]: value });
    } else {
      setNewRecord(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    if (editingRecord) {
      setEditingRecord({ ...editingRecord, [name]: value });
    } else {
      setNewRecord(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    const vehicle = vehicles.find(v => v.id === newRecord.vehicleId);
    const vehicleName = vehicle ? vehicle.name : 'Unknown Vehicle';
    
    const record = {
      id: maintenanceRecords.length + 1,
      vehicleId: newRecord.vehicleId,
      vehicleName,
      type: newRecord.type,
      status: newRecord.status,
      date: newRecord.date,
      notes: newRecord.notes,
      nextDate: newRecord.nextDate,
    };
    
    setMaintenanceRecords([...maintenanceRecords, record]);
    
    setNewRecord({
      vehicleId: '',
      type: 'routine',
      date: '',
      notes: '',
      nextDate: '',
      status: 'scheduled',
    });
    
    toast({
      title: language === 'fr' ? 'Enregistrement ajouté' : 'Record Added',
      description: language === 'fr' 
        ? 'Nouvel enregistrement de maintenance ajouté avec succès' 
        : 'New maintenance record added successfully',
    });
    
    setAddDialogOpen(false);
  };

  const handleEditClick = (record: MaintenanceRecord) => {
    setEditingRecord(record);
    setEditDialogOpen(true);
  };

  const handleUpdateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingRecord) return;
    
    const updatedRecords = maintenanceRecords.map(record => 
      record.id === editingRecord.id ? editingRecord : record
    );
    
    setMaintenanceRecords(updatedRecords);
    
    toast({
      title: language === 'fr' ? 'Enregistrement mis à jour' : 'Record Updated',
      description: language === 'fr' 
        ? 'L\'enregistrement de maintenance a été mis à jour avec succès' 
        : 'Maintenance record has been updated successfully',
    });
    
    setEditDialogOpen(false);
    setEditingRecord(null);
  };

  const openDeleteDialog = (id: number) => {
    setRecordToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteRecord = () => {
    if (recordToDelete === null) return;
    
    const updatedRecords = maintenanceRecords.filter(record => record.id !== recordToDelete);
    setMaintenanceRecords(updatedRecords);
    
    toast({
      title: language === 'fr' ? 'Enregistrement supprimé' : 'Record Deleted',
      description: language === 'fr' 
        ? 'L\'enregistrement de maintenance a été supprimé avec succès' 
        : 'Maintenance record has been deleted successfully',
    });
    
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const renderMaintenanceForm = (isEdit: boolean) => {
    const record = isEdit ? editingRecord : newRecord;
    if (!record) return null;
    
    return (
      <form onSubmit={isEdit ? handleUpdateRecord : handleAddRecord}>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="vehicleId" className="text-nova-white">
              {language === 'fr' ? 'Véhicule' : 'Vehicle'}
            </Label>
            <Select 
              value={record.vehicleId} 
              onValueChange={(value) => handleSelectChange('vehicleId', value)}
              disabled={isEdit}
              required
            >
              <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                <SelectValue placeholder={language === 'fr' ? 'Sélectionner un véhicule' : 'Select vehicle'} />
              </SelectTrigger>
              <SelectContent className="bg-nova-gray border-nova-gold/30">
                {vehicles.map((vehicle) => (
                  <SelectItem 
                    key={vehicle.id} 
                    value={vehicle.id}
                    className="text-nova-white hover:bg-nova-gold/20"
                  >
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="type" className="text-nova-white">
              {language === 'fr' ? 'Type' : 'Type'}
            </Label>
            <Select 
              value={record.type} 
              onValueChange={(value) => handleSelectChange('type', value)}
              required
            >
              <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-nova-gray border-nova-gold/30">
                <SelectItem value="routine" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'Routine' : 'Routine'}
                </SelectItem>
                <SelectItem value="repair" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'Réparation' : 'Repair'}
                </SelectItem>
                <SelectItem value="inspection" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'Inspection' : 'Inspection'}
                </SelectItem>
                <SelectItem value="emergency" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'Urgence' : 'Emergency'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status" className="text-nova-white">
              {language === 'fr' ? 'Statut' : 'Status'}
            </Label>
            <Select 
              value={record.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
              required
            >
              <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-nova-gray border-nova-gold/30">
                <SelectItem value="scheduled" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'Planifié' : 'Scheduled'}
                </SelectItem>
                <SelectItem value="pending" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'En attente' : 'Pending'}
                </SelectItem>
                <SelectItem value="inProgress" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'En cours' : 'In Progress'}
                </SelectItem>
                <SelectItem value="completed" className="text-nova-white hover:bg-nova-gold/20">
                  {language === 'fr' ? 'Terminé' : 'Completed'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="date" className="text-nova-white">
              {language === 'fr' ? 'Date' : 'Date'}
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={record.date}
              onChange={handleInputChange}
              className="bg-nova-black border-nova-gold/30 text-nova-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="nextDate" className="text-nova-white">
              {language === 'fr' ? 'Prochaine Date' : 'Next Date'}
            </Label>
            <Input
              id="nextDate"
              name="nextDate"
              type="date"
              value={record.nextDate}
              onChange={handleInputChange}
              className="bg-nova-black border-nova-gold/30 text-nova-white"
            />
          </div>
          
          <div>
            <Label htmlFor="notes" className="text-nova-white">
              {language === 'fr' ? 'Notes' : 'Notes'}
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={record.notes}
              onChange={handleInputChange}
              className="bg-nova-black border-nova-gold/30 text-nova-white min-h-[80px]"
            />
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button type="submit" className="gold-btn">
            {isEdit 
              ? (language === 'fr' ? 'Mettre à jour' : 'Update')
              : (language === 'fr' ? 'Enregistrer' : 'Save')
            }
          </Button>
        </DialogFooter>
      </form>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-nova-white flex items-center">
          <Settings className="mr-2 h-6 w-6 text-nova-gold" />
          {language === 'fr' ? 'Suivi de Maintenance' : 'Maintenance Tracking'}
        </h2>
        
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gold-btn">
              <PlusCircle className="mr-2 h-4 w-4" />
              {language === 'fr' ? 'Ajouter' : 'Add Record'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-md">
            <DialogHeader>
              <DialogTitle>
                {language === 'fr' ? 'Ajouter un Enregistrement de Maintenance' : 'Add Maintenance Record'}
              </DialogTitle>
              <DialogDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Complétez le formulaire pour ajouter un nouvel enregistrement' 
                  : 'Complete the form to add a new maintenance record'}
              </DialogDescription>
            </DialogHeader>
            
            {renderMaintenanceForm(false)}
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="bg-nova-gray/10 border-nova-gold/20">
        <CardHeader>
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Historique et Planification' : 'Maintenance History & Planning'}
          </CardTitle>
          <CardDescription className="text-nova-white/60">
            {language === 'fr' 
              ? 'Suivez l\'historique de maintenance et les entretiens planifiés'
              : 'Track maintenance history and scheduled services'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-nova-gold/20">
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Véhicule' : 'Vehicle'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Type' : 'Type'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Statut' : 'Status'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Date' : 'Date'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Prochaine Date' : 'Next Date'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Notes' : 'Notes'}
                </TableHead>
                <TableHead className="text-nova-white text-right">
                  {language === 'fr' ? 'Actions' : 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceRecords.map((record) => (
                <TableRow key={record.id} className="border-nova-gold/10">
                  <TableCell className="font-medium text-nova-white">
                    {record.vehicleName}
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(record.type)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(record.status)}
                  </TableCell>
                  <TableCell className="text-nova-white/80">
                    {formatDate(record.date)}
                  </TableCell>
                  <TableCell className="text-nova-white/80">
                    {record.nextDate ? formatDate(record.nextDate) : '—'}
                  </TableCell>
                  <TableCell className="text-nova-white/80 max-w-[200px] truncate">
                    {record.notes}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-nova-gold hover:bg-nova-gold/10"
                        onClick={() => handleEditClick(record)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-400 hover:bg-red-500/10"
                        onClick={() => openDeleteDialog(record.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Modifier l\'Enregistrement' : 'Edit Maintenance Record'}
            </DialogTitle>
            <DialogDescription className="text-nova-white/60">
              {language === 'fr' 
                ? 'Mettez à jour les informations de maintenance' 
                : 'Update the maintenance information'}
            </DialogDescription>
          </DialogHeader>
          
          {renderMaintenanceForm(true)}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-nova-gray text-nova-white border-nova-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'fr' ? 'Confirmer la suppression' : 'Confirm Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-nova-white/60">
              {language === 'fr' 
                ? 'Êtes-vous sûr de vouloir supprimer cet enregistrement de maintenance ? Cette action ne peut pas être annulée.'
                : 'Are you sure you want to delete this maintenance record? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-nova-gold/30 text-nova-white hover:bg-nova-gold/10">
              {language === 'fr' ? 'Annuler' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteRecord}
            >
              {language === 'fr' ? 'Supprimer' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
