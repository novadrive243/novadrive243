
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Users, Mail, Phone, CalendarClock, Pencil, Star, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StaffManagementProps {
  language: string;
  formatDate: (dateString: string) => string;
  refreshData?: () => void;
}

export const StaffManagement = ({ language, formatDate, refreshData }: StaffManagementProps) => {
  const { toast } = useToast();
  
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: 'Emma Richardson',
      email: 'emma.r@novadrive.com',
      phone: '+1 (514) 555-1234',
      role: 'manager',
      joinDate: '2025-04-15',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 4.9
    },
    {
      id: 2,
      name: 'James Wilson',
      email: 'james.w@novadrive.com',
      phone: '+1 (514) 555-2345',
      role: 'assistant',
      joinDate: '2025-06-22',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Sophia Chen',
      email: 'sophia.c@novadrive.com',
      phone: '+1 (514) 555-3456',
      role: 'driver',
      joinDate: '2025-01-10',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      rating: 4.8
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      email: 'michael.r@novadrive.com',
      phone: '+1 (514) 555-4567',
      role: 'mechanic',
      joinDate: '2025-03-05',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Olivia Johnson',
      email: 'olivia.j@novadrive.com',
      phone: '+1 (514) 555-5678',
      role: 'driver',
      joinDate: '2025-07-18',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      rating: 4.5
    }
  ]);
  
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'driver',
    joinDate: new Date().toISOString().split('T')[0],
  });
  
  const [editStaff, setEditStaff] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'manager':
        return (
          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-none capitalize">
            {language === 'fr' ? 'Gestionnaire' : 'Manager'}
          </Badge>
        );
      case 'assistant':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-none capitalize">
            {language === 'fr' ? 'Assistant(e)' : 'Assistant'}
          </Badge>
        );
      case 'driver':
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none capitalize">
            {language === 'fr' ? 'Chauffeur' : 'Driver'}
          </Badge>
        );
      case 'mechanic':
        return (
          <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-none capitalize">
            {language === 'fr' ? 'Mécanicien' : 'Mechanic'}
          </Badge>
        );
      default:
        return (
          <Badge className="capitalize">
            {role}
          </Badge>
        );
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, form: 'new' | 'edit') => {
    const { name, value } = e.target;
    if (form === 'new') {
      setNewStaff(prev => ({ ...prev, [name]: value }));
    } else {
      setEditStaff(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name: string, value: string, form: 'new' | 'edit') => {
    if (form === 'new') {
      setNewStaff(prev => ({ ...prev, [name]: value }));
    } else {
      setEditStaff(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    
    const staff = {
      id: staffMembers.length + 1,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      joinDate: newStaff.joinDate,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 60) + 1}.jpg`,
      rating: 4.0
    };
    
    setStaffMembers([...staffMembers, staff]);
    
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'driver',
      joinDate: new Date().toISOString().split('T')[0],
    });
    
    toast({
      title: language === 'fr' ? 'Membre du personnel ajouté' : 'Staff Member Added',
      description: language === 'fr' 
        ? `${staff.name} a été ajouté avec succès à l'équipe` 
        : `${staff.name} has been successfully added to the team`,
    });
    
    if (refreshData) refreshData();
    setOpen(false);
  };

  const handleEditStaff = (e: React.FormEvent) => {
    e.preventDefault();
    
    setStaffMembers(staffMembers.map(staff => 
      staff.id === editStaff.id ? editStaff : staff
    ));
    
    toast({
      title: language === 'fr' ? 'Membre du personnel modifié' : 'Staff Member Updated',
      description: language === 'fr' 
        ? `${editStaff.name} a été modifié avec succès` 
        : `${editStaff.name} has been successfully updated`,
    });
    
    if (refreshData) refreshData();
    setEditOpen(false);
  };

  const openEditDialog = (staff: any) => {
    setEditStaff(staff);
    setEditOpen(true);
  };

  const confirmDelete = (id: number) => {
    setStaffToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteStaff = () => {
    if (staffToDelete) {
      const staffName = staffMembers.find(staff => staff.id === staffToDelete)?.name;
      setStaffMembers(staffMembers.filter(staff => staff.id !== staffToDelete));
      
      toast({
        title: language === 'fr' ? 'Membre du personnel supprimé' : 'Staff Member Deleted',
        description: language === 'fr' 
          ? `${staffName} a été supprimé de l'équipe` 
          : `${staffName} has been removed from the team`,
      });
      
      if (refreshData) refreshData();
      setDeleteConfirmOpen(false);
      setStaffToDelete(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gold-gradient-text flex items-center">
          <Users className="mr-2 h-6 w-6 text-nova-gold" />
          {language === 'fr' ? 'Gestion du Personnel' : 'Staff Management'}
        </h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gold-btn">
              <UserPlus className="mr-2 h-4 w-4" />
              {language === 'fr' ? 'Ajouter du Personnel' : 'Add Staff'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-md">
            <DialogHeader>
              <DialogTitle>
                {language === 'fr' ? 'Ajouter un Membre du Personnel' : 'Add Staff Member'}
              </DialogTitle>
              <DialogDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Complétez le formulaire pour ajouter un nouveau membre' 
                  : 'Complete the form to add a new staff member'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddStaff}>
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="name" className="text-nova-white">
                    {language === 'fr' ? 'Nom Complet' : 'Full Name'}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newStaff.name}
                    onChange={(e) => handleInputChange(e, 'new')}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-nova-white">
                    {language === 'fr' ? 'Email' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => handleInputChange(e, 'new')}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-nova-white">
                    {language === 'fr' ? 'Téléphone' : 'Phone'}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newStaff.phone}
                    onChange={(e) => handleInputChange(e, 'new')}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="role" className="text-nova-white">
                    {language === 'fr' ? 'Rôle' : 'Role'}
                  </Label>
                  <Select 
                    value={newStaff.role} 
                    onValueChange={(value) => handleSelectChange('role', value, 'new')}
                    required
                  >
                    <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-nova-gray border-nova-gold/30">
                      <SelectItem value="manager" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'Gestionnaire' : 'Manager'}
                      </SelectItem>
                      <SelectItem value="assistant" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'Assistant(e)' : 'Assistant'}
                      </SelectItem>
                      <SelectItem value="driver" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'Chauffeur' : 'Driver'}
                      </SelectItem>
                      <SelectItem value="mechanic" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'Mécanicien' : 'Mechanic'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="joinDate" className="text-nova-white">
                    {language === 'fr' ? 'Date d\'Embauche' : 'Join Date'}
                  </Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    type="date"
                    value={newStaff.joinDate}
                    onChange={(e) => handleInputChange(e, 'new')}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-4">
                <Button type="submit" className="gold-btn">
                  {language === 'fr' ? 'Enregistrer' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Staff Dialog */}
        {editStaff && (
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {language === 'fr' ? 'Modifier un Membre du Personnel' : 'Edit Staff Member'}
                </DialogTitle>
                <DialogDescription className="text-nova-white/60">
                  {language === 'fr' 
                    ? 'Modifiez les informations du membre du personnel' 
                    : 'Update the staff member information'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleEditStaff}>
                <div className="space-y-4 py-2">
                  <div>
                    <Label htmlFor="edit-name" className="text-nova-white">
                      {language === 'fr' ? 'Nom Complet' : 'Full Name'}
                    </Label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={editStaff.name}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-email" className="text-nova-white">
                      {language === 'fr' ? 'Email' : 'Email'}
                    </Label>
                    <Input
                      id="edit-email"
                      name="email"
                      type="email"
                      value={editStaff.email}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-phone" className="text-nova-white">
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </Label>
                    <Input
                      id="edit-phone"
                      name="phone"
                      value={editStaff.phone}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-role" className="text-nova-white">
                      {language === 'fr' ? 'Rôle' : 'Role'}
                    </Label>
                    <Select 
                      value={editStaff.role} 
                      onValueChange={(value) => handleSelectChange('role', value, 'edit')}
                      required
                    >
                      <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-nova-gray border-nova-gold/30">
                        <SelectItem value="manager" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Gestionnaire' : 'Manager'}
                        </SelectItem>
                        <SelectItem value="assistant" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Assistant(e)' : 'Assistant'}
                        </SelectItem>
                        <SelectItem value="driver" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Chauffeur' : 'Driver'}
                        </SelectItem>
                        <SelectItem value="mechanic" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Mécanicien' : 'Mechanic'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-joinDate" className="text-nova-white">
                      {language === 'fr' ? 'Date d\'Embauche' : 'Join Date'}
                    </Label>
                    <Input
                      id="edit-joinDate"
                      name="joinDate"
                      type="date"
                      value={editStaff.joinDate}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                </div>
                
                <DialogFooter className="mt-4">
                  <Button type="submit" className="gold-btn">
                    {language === 'fr' ? 'Mettre à jour' : 'Update'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-md">
            <DialogHeader>
              <DialogTitle>
                {language === 'fr' ? 'Confirmer la suppression' : 'Confirm Deletion'}
              </DialogTitle>
              <DialogDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Êtes-vous sûr de vouloir supprimer ce membre du personnel ? Cette action ne peut pas être annulée.' 
                  : 'Are you sure you want to delete this staff member? This action cannot be undone.'}
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirmOpen(false)}
                className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
              >
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteStaff}
              >
                {language === 'fr' ? 'Supprimer' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="bg-nova-gray/10 border-nova-gold/20">
        <CardHeader>
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Équipe NovaDrive' : 'NovaDrive Team'}
          </CardTitle>
          <CardDescription className="text-nova-white/60">
            {language === 'fr' 
              ? 'Gérez votre équipe et suivez les performances'
              : 'Manage your team and track performance'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-nova-gold/20">
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Membre du Personnel' : 'Staff Member'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Contact' : 'Contact'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Rôle' : 'Role'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Date d\'Embauche' : 'Join Date'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Évaluation' : 'Rating'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Actions' : 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map((staff) => (
                <TableRow key={staff.id} className="border-nova-gold/10">
                  <TableCell className="font-medium text-nova-white">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-nova-white/80">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-nova-gold" />
                        {staff.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-nova-gold" />
                        {staff.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(staff.role)}
                  </TableCell>
                  <TableCell className="text-nova-white/80">
                    <div className="flex items-center">
                      <CalendarClock className="h-4 w-4 mr-2 text-nova-gold" />
                      {formatDate(staff.joinDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-nova-gold font-semibold mr-2">{staff.rating}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(staff.rating) ? 'text-nova-gold' : 'text-nova-white/30'}`}
                            fill={i < Math.floor(staff.rating) ? '#D4AF37' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-nova-gold hover:bg-nova-gold/10"
                        onClick={() => openEditDialog(staff)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:bg-red-500/10"
                        onClick={() => confirmDelete(staff.id)}
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
    </div>
  );
};
