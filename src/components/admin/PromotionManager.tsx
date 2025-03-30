import React, { useState } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Ticket, Clock, Calendar, Trash2, Edit, Copy, BadgePercent, InfoIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface PromotionManagerProps {
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
}

interface Promotion {
  id: number;
  code: string;
  type: string;
  value: number;
  description: string;
  descriptionFr: string;
  startDate: string;
  endDate: string;
  minRental: number;
  maxDiscount: number | null;
  usageLimit: number;
  usageCount: number;
  active: boolean;
  categories: string[];
  createdAt: string;
}

export const PromotionManager = ({ language, formatDate, formatCurrency }: PromotionManagerProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 1,
      code: 'WELCOME25',
      type: 'percentage',
      value: 25,
      description: 'Welcome discount for new customers',
      descriptionFr: 'Remise de bienvenue pour les nouveaux clients',
      startDate: '2024-05-01',
      endDate: '2024-06-30',
      minRental: 2,
      maxDiscount: 500,
      usageLimit: 100,
      usageCount: 42,
      active: true,
      categories: ['SUV', 'Sedan'],
      createdAt: '2024-04-15'
    },
    {
      id: 2,
      code: 'SUMMER2024',
      type: 'percentage',
      value: 15,
      description: 'Summer season special offer',
      descriptionFr: 'Offre spéciale pour la saison estivale',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      minRental: 3,
      maxDiscount: 300,
      usageLimit: 200,
      usageCount: 0,
      active: true,
      categories: ['All'],
      createdAt: '2024-04-20'
    },
    {
      id: 3,
      code: 'LUXE100',
      type: 'fixed',
      value: 100,
      description: 'Discount on luxury vehicle rentals',
      descriptionFr: 'Remise sur la location de véhicules de luxe',
      startDate: '2024-05-15',
      endDate: '2024-07-15',
      minRental: 1,
      maxDiscount: null,
      usageLimit: 50,
      usageCount: 12,
      active: true,
      categories: ['Sports', 'Luxury'],
      createdAt: '2024-04-25'
    },
    {
      id: 4,
      code: 'WEEKEND50',
      type: 'percentage',
      value: 10,
      description: 'Special discount for weekend rentals',
      descriptionFr: 'Remise spéciale pour les locations de week-end',
      startDate: '2024-05-01',
      endDate: '2024-12-31',
      minRental: 2,
      maxDiscount: 200,
      usageLimit: 500,
      usageCount: 87,
      active: true,
      categories: ['All'],
      createdAt: '2024-04-10'
    },
    {
      id: 5,
      code: 'SPRING2024',
      type: 'percentage',
      value: 20,
      description: 'Spring promotion - Limited time offer',
      descriptionFr: 'Promotion de printemps - Offre à durée limitée',
      startDate: '2024-04-01',
      endDate: '2024-05-15',
      minRental: 3,
      maxDiscount: 350,
      usageLimit: 150,
      usageCount: 124,
      active: false,
      categories: ['SUV', 'Electric'],
      createdAt: '2024-03-15'
    }
  ]);
  
  const [newPromotion, setNewPromotion] = useState({
    code: '',
    type: 'percentage',
    value: 0,
    description: '',
    descriptionFr: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    minRental: 1,
    maxDiscount: null as number | null,
    usageLimit: 100,
    active: true,
    categories: ['All']
  });

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [editPromotion, setEditPromotion] = useState<Promotion | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPromotion(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editPromotion) return;
    const { name, value } = e.target;
    setEditPromotion(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPromotion(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleEditNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editPromotion) return;
    const { name, value } = e.target;
    setEditPromotion(prev => prev ? { ...prev, [name]: parseFloat(value) || 0 } : null);
  };
  
  const handleSelectChange = (name: string, value: string | string[]) => {
    setNewPromotion(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditSelectChange = (name: string, value: string | string[]) => {
    if (!editPromotion) return;
    setEditPromotion(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setNewPromotion(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleEditSwitchChange = (name: string, checked: boolean) => {
    if (!editPromotion) return;
    setEditPromotion(prev => prev ? { ...prev, [name]: checked } : null);
  };
  
  const handleAddPromotion = (e: React.FormEvent) => {
    e.preventDefault();
    
    const promotion: Promotion = {
      id: promotions.length + 1,
      code: newPromotion.code,
      type: newPromotion.type,
      value: newPromotion.value,
      description: newPromotion.description,
      descriptionFr: newPromotion.descriptionFr,
      startDate: newPromotion.startDate,
      endDate: newPromotion.endDate,
      minRental: newPromotion.minRental,
      maxDiscount: newPromotion.maxDiscount,
      usageLimit: newPromotion.usageLimit,
      usageCount: 0,
      active: newPromotion.active,
      categories: newPromotion.categories,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setPromotions([...promotions, promotion]);
    
    setNewPromotion({
      code: '',
      type: 'percentage',
      value: 0,
      description: '',
      descriptionFr: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      minRental: 1,
      maxDiscount: null,
      usageLimit: 100,
      active: true,
      categories: ['All']
    });
    
    toast({
      title: language === 'fr' ? 'Promotion ajoutée' : 'Promotion Added',
      description: language === 'fr' 
        ? `La promotion ${promotion.code} a été créée avec succès` 
        : `Promotion ${promotion.code} has been successfully created`,
    });
    
    setOpen(false);
  };
  
  const handleUpdatePromotion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editPromotion) return;
    
    setPromotions(promotions.map(promo => 
      promo.id === editPromotion.id ? editPromotion : promo
    ));
    
    toast({
      title: language === 'fr' ? 'Promotion mise à jour' : 'Promotion Updated',
      description: language === 'fr' 
        ? `La promotion ${editPromotion.code} a été mise à jour avec succès` 
        : `Promotion ${editPromotion.code} has been successfully updated`,
    });
    
    setEditOpen(false);
  };
  
  const handleDeletePromotion = () => {
    if (!selectedPromotion) return;
    
    setPromotions(promotions.filter(promo => promo.id !== selectedPromotion.id));
    
    toast({
      title: language === 'fr' ? 'Promotion supprimée' : 'Promotion Deleted',
      description: language === 'fr' 
        ? `La promotion ${selectedPromotion.code} a été supprimée` 
        : `Promotion ${selectedPromotion.code} has been deleted`,
    });
    
    setDeleteConfirmOpen(false);
  };
  
  const togglePromotionStatus = (id: number) => {
    setPromotions(promotions.map(promo => 
      promo.id === id ? { ...promo, active: !promo.active } : promo
    ));
    
    const promotion = promotions.find(p => p.id === id);
    
    toast({
      title: language === 'fr' 
        ? `Promotion ${promotion?.active ? 'désactivée' : 'activée'}` 
        : `Promotion ${promotion?.active ? 'Deactivated' : 'Activated'}`,
      description: language === 'fr' 
        ? `La promotion ${promotion?.code} a été ${promotion?.active ? 'désactivée' : 'activée'}` 
        : `Promotion ${promotion?.code} has been ${promotion?.active ? 'deactivated' : 'activated'}`,
    });
  };
  
  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    
    toast({
      title: language === 'fr' ? 'Code copié' : 'Code Copied',
      description: language === 'fr' 
        ? `Le code ${code} a été copié dans le presse-papiers` 
        : `Code ${code} has been copied to clipboard`,
    });
  };
  
  const handleEdit = (promotion: Promotion) => {
    setEditPromotion(promotion);
    setEditOpen(true);
  };
  
  const handleDelete = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setDeleteConfirmOpen(true);
  };
  
  const handleShowDetails = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setDetailsOpen(true);
  };
  
  const handleReturn = () => {
    navigate('/admin');
  };
  
  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gold-gradient-text flex items-center">
          <Ticket className="mr-2 h-6 w-6 text-nova-gold" />
          {language === 'fr' ? 'Gestion des Promotions' : 'Promotion Management'}
        </h2>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
            onClick={handleReturn}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'fr' ? 'Retour' : 'Return'}
          </Button>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gold-btn">
                <PlusCircle className="mr-2 h-4 w-4" />
                {language === 'fr' ? 'Nouvelle Promotion' : 'New Promotion'}
              </Button>
            </DialogTrigger>
            
            <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {language === 'fr' ? 'Créer une Nouvelle Promotion' : 'Create New Promotion'}
                </DialogTitle>
                <DialogDescription className="text-nova-white/60">
                  {language === 'fr' 
                    ? 'Définissez les détails de votre nouvelle promotion ou code de réduction' 
                    : 'Define the details of your new promotion or discount code'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddPromotion}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                  <div>
                    <Label htmlFor="code" className="text-nova-white">
                      {language === 'fr' ? 'Code Promo' : 'Promo Code'}
                    </Label>
                    <Input
                      id="code"
                      name="code"
                      value={newPromotion.code}
                      onChange={handleInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white uppercase"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type" className="text-nova-white">
                        {language === 'fr' ? 'Type' : 'Type'}
                      </Label>
                      <Select 
                        value={newPromotion.type} 
                        onValueChange={(value) => handleSelectChange('type', value)}
                        required
                      >
                        <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-nova-gray border-nova-gold/30">
                          <SelectItem value="percentage" className="text-nova-white hover:bg-nova-gold/20">
                            {language === 'fr' ? 'Pourcentage' : 'Percentage'}
                          </SelectItem>
                          <SelectItem value="fixed" className="text-nova-white hover:bg-nova-gold/20">
                            {language === 'fr' ? 'Montant Fixe' : 'Fixed Amount'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="value" className="text-nova-white">
                        {language === 'fr' ? 'Valeur' : 'Value'}
                      </Label>
                      <div className="relative">
                        <Input
                          id="value"
                          name="value"
                          type="number"
                          value={newPromotion.value}
                          onChange={handleNumberChange}
                          className="bg-nova-black border-nova-gold/30 text-nova-white pl-8"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          {newPromotion.type === 'percentage' ? '%' : '$'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-nova-white">
                      {language === 'fr' ? 'Description (Anglais)' : 'Description (English)'}
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newPromotion.description}
                      onChange={handleInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white min-h-[80px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descriptionFr" className="text-nova-white">
                      {language === 'fr' ? 'Description (Français)' : 'Description (French)'}
                    </Label>
                    <Textarea
                      id="descriptionFr"
                      name="descriptionFr"
                      value={newPromotion.descriptionFr}
                      onChange={handleInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white min-h-[80px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="startDate" className="text-nova-white">
                      {language === 'fr' ? 'Date de Début' : 'Start Date'}
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={newPromotion.startDate}
                      onChange={handleInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate" className="text-nova-white">
                      {language === 'fr' ? 'Date de Fin' : 'End Date'}
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={newPromotion.endDate}
                      onChange={handleInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="categories" className="text-nova-white">
                      {language === 'fr' ? 'Catégories de Véhicules' : 'Vehicle Categories'}
                    </Label>
                    <Select 
                      value={newPromotion.categories[0]} 
                      onValueChange={(value) => handleSelectChange('categories', [value])}
                      required
                    >
                      <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-nova-gray border-nova-gold/30">
                        <SelectItem value="All" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Toutes les catégories' : 'All categories'}
                        </SelectItem>
                        <SelectItem value="SUV" className="text-nova-white hover:bg-nova-gold/20">SUV</SelectItem>
                        <SelectItem value="Sedan" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Berline' : 'Sedan'}
                        </SelectItem>
                        <SelectItem value="Sports" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Sport' : 'Sports'}
                        </SelectItem>
                        <SelectItem value="Electric" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Électrique' : 'Electric'}
                        </SelectItem>
                        <SelectItem value="Luxury" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Luxe' : 'Luxury'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minRental" className="text-nova-white">
                        {language === 'fr' ? 'Durée Min. (jours)' : 'Min. Duration (days)'}
                      </Label>
                      <Input
                        id="minRental"
                        name="minRental"
                        type="number"
                        value={newPromotion.minRental}
                        onChange={handleNumberChange}
                        className="bg-nova-black border-nova-gold/30 text-nova-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="usageLimit" className="text-nova-white">
                        {language === 'fr' ? 'Limite d\'Utilisation' : 'Usage Limit'}
                      </Label>
                      <Input
                        id="usageLimit"
                        name="usageLimit"
                        type="number"
                        value={newPromotion.usageLimit}
                        onChange={handleNumberChange}
                        className="bg-nova-black border-nova-gold/30 text-nova-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="maxDiscount" className="text-nova-white">
                      {language === 'fr' ? 'Réduction Max. ($)' : 'Max. Discount ($)'}
                    </Label>
                    <Input
                      id="maxDiscount"
                      name="maxDiscount"
                      type="number"
                      value={newPromotion.maxDiscount || ''}
                      onChange={handleNumberChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      placeholder={language === 'fr' ? 'Aucune limite' : 'No limit'}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch
                      id="active"
                      checked={newPromotion.active}
                      onCheckedChange={(checked) => handleSwitchChange('active', checked)}
                    />
                    <Label htmlFor="active" className="text-nova-white">
                      {language === 'fr' ? 'Activer immédiatement' : 'Activate immediately'}
                    </Label>
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="submit" className="gold-btn">
                    {language === 'fr' ? 'Créer Promotion' : 'Create Promotion'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Modifier la Promotion' : 'Edit Promotion'}
            </DialogTitle>
            <DialogDescription className="text-nova-white/60">
              {language === 'fr' 
                ? 'Modifiez les détails de la promotion' 
                : 'Modify the promotion details'}
            </DialogDescription>
          </DialogHeader>
          
          {editPromotion && (
            <form onSubmit={handleUpdatePromotion}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div>
                  <Label htmlFor="code" className="text-nova-white">
                    {language === 'fr' ? 'Code Promo' : 'Promo Code'}
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    value={editPromotion.code}
                    onChange={handleEditInputChange}
                    className="bg-nova-black border-nova-gold/30 text-nova-white uppercase"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="text-nova-white">
                      {language === 'fr' ? 'Type' : 'Type'}
                    </Label>
                    <Select 
                      value={editPromotion.type} 
                      onValueChange={(value) => handleEditSelectChange('type', value)}
                      required
                    >
                      <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-nova-gray border-nova-gold/30">
                        <SelectItem value="percentage" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Pourcentage' : 'Percentage'}
                        </SelectItem>
                        <SelectItem value="fixed" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Montant Fixe' : 'Fixed Amount'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="value" className="text-nova-white">
                      {language === 'fr' ? 'Valeur' : 'Value'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="value"
                        name="value"
                        type="number"
                        value={editPromotion.value}
                        onChange={handleEditNumberChange}
                        className="bg-nova-black border-nova-gold/30 text-nova-white pl-8"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {editPromotion.type === 'percentage' ? '%' : '$'}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-nova-white">
                      {language === 'fr' ? 'Description (Anglais)' : 'Description (English)'}
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={editPromotion.description}
                      onChange={handleEditInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white min-h-[80px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descriptionFr" className="text-nova-white">
                      {language === 'fr' ? 'Description (Français)' : 'Description (French)'}
                    </Label>
                    <Textarea
                      id="descriptionFr"
                      name="descriptionFr"
                      value={editPromotion.descriptionFr}
                      onChange={handleEditInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white min-h-[80px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="startDate" className="text-nova-white">
                      {language === 'fr' ? 'Date de Début' : 'Start Date'}
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={editPromotion.startDate}
                      onChange={handleEditInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate" className="text-nova-white">
                      {language === 'fr' ? 'Date de Fin' : 'End Date'}
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={editPromotion.endDate}
                      onChange={handleEditInputChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="categories" className="text-nova-white">
                      {language === 'fr' ? 'Catégories de Véhicules' : 'Vehicle Categories'}
                    </Label>
                    <Select 
                      value={editPromotion.categories[0]} 
                      onValueChange={(value) => handleEditSelectChange('categories', [value])}
                      required
                    >
                      <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-nova-gray border-nova-gold/30">
                        <SelectItem value="All" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Toutes les catégories' : 'All categories'}
                        </SelectItem>
                        <SelectItem value="SUV" className="text-nova-white hover:bg-nova-gold/20">SUV</SelectItem>
                        <SelectItem value="Sedan" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Berline' : 'Sedan'}
                        </SelectItem>
                        <SelectItem value="Sports" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Sport' : 'Sports'}
                        </SelectItem>
                        <SelectItem value="Electric" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Électrique' : 'Electric'}
                        </SelectItem>
                        <SelectItem value="Luxury" className="text-nova-white hover:bg-nova-gold/20">
                          {language === 'fr' ? 'Luxe' : 'Luxury'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minRental" className="text-nova-white">
                        {language === 'fr' ? 'Durée Min. (jours)' : 'Min. Duration (days)'}
                      </Label>
                      <Input
                        id="minRental"
                        name="minRental"
                        type="number"
                        value={editPromotion.minRental}
                        onChange={handleEditNumberChange}
                        className="bg-nova-black border-nova-gold/30 text-nova-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="usageLimit" className="text-nova-white">
                        {language === 'fr' ? 'Limite d\'Utilisation' : 'Usage Limit'}
                      </Label>
                      <Input
                        id="usageLimit"
                        name="usageLimit"
                        type="number"
                        value={editPromotion.usageLimit}
                        onChange={handleEditNumberChange}
                        className="bg-nova-black border-nova-gold/30 text-nova-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="maxDiscount" className="text-nova-white">
                      {language === 'fr' ? 'Réduction Max. ($)' : 'Max. Discount ($)'}
                    </Label>
                    <Input
                      id="maxDiscount"
                      name="maxDiscount"
                      type="number"
                      value={editPromotion.maxDiscount || ''}
                      onChange={handleEditNumberChange}
                      className="bg-nova-black border-nova-gold/30 text-nova-white"
                      placeholder={language === 'fr' ? 'Aucune limite' : 'No limit'}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch
                      id="active"
                      checked={editPromotion.active}
                      onCheckedChange={(checked) => handleEditSwitchChange('active', checked)}
                    />
                    <Label htmlFor="active" className="text-nova-white">
                      {language === 'fr' ? 'Promotion active' : 'Active promotion'}
                    </Label>
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="submit" className="gold-btn">
                    {language === 'fr' ? 'Enregistrer les Modifications' : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
        
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30">
            <DialogHeader>
              <DialogTitle>
                {language === 'fr' ? 'Supprimer la Promotion' : 'Delete Promotion'}
              </DialogTitle>
              <DialogDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Êtes-vous sûr de vouloir supprimer cette promotion ? Cette action est irréversible.' 
                  : 'Are you sure you want to delete this promotion? This action cannot be undone.'}
              </DialogDescription>
            </DialogHeader>
            
            {selectedPromotion && (
              <div className="my-4 p-3 bg-nova-black/40 rounded border border-nova-gold/20">
                <p className="font-semibold text-nova-white">
                  {selectedPromotion.code} - 
                  {selectedPromotion.type === 'percentage' 
                    ? `${selectedPromotion.value}%` 
                    : formatCurrency(selectedPromotion.value)}
                </p>
                <p className="text-nova-white/80 text-sm mt-1">
                  {language === 'fr' ? selectedPromotion.descriptionFr : selectedPromotion.description}
                </p>
              </div>
            )}
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirmOpen(false)}
                className="border-nova-white/30 hover:bg-nova-white/10"
              >
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeletePromotion}
                className="bg-red-600 hover:bg-red-700"
              >
                {language === 'fr' ? 'Supprimer' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30">
            <DialogHeader>
              <DialogTitle>
                {language === 'fr' ? 'Détails de la Promotion' : 'Promotion Details'}
              </DialogTitle>
            </DialogHeader>
            
            {selectedPromotion && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold gold-gradient-text">{selectedPromotion.code}</h3>
                    <p className="text-nova-white/80">
                      {language === 'fr' ? selectedPromotion.descriptionFr : selectedPromotion.description}
                    </p>
                  </div>
                  <Badge 
                    className={selectedPromotion.active ? 'bg-green-600' : 'bg-gray-600'}
                  >
                    {selectedPromotion.active 
                      ? (language === 'fr' ? 'Active' : 'Active') 
                      : (language === 'fr' ? 'Inactive' : 'Inactive')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-nova-black/40 p-3 rounded border border-nova-gold/20">
                    <p className="text-sm text-nova-white/60">
                      {language === 'fr' ? 'Type de Réduction' : 'Discount Type'}
                    </p>
                    <p className="text-nova-white">
                      {selectedPromotion.type === 'percentage' 
                        ? (language === 'fr' ? 'Pourcentage' : 'Percentage') 
                        : (language === 'fr' ? 'Montant Fixe' : 'Fixed Amount')}
                    </p>
                  </div>
                  
                  <div className="bg-nova-black/40 p-3 rounded border border-nova-gold/20">
                    <p className="text-sm text-nova-white/60">
                      {language === 'fr' ? 'Valeur' : 'Value'}
                    </p>
                    <p className="text-nova-white font-semibold">
                      {selectedPromotion.type === 'percentage' 
                        ? `${selectedPromotion.value}%` 
                        : formatCurrency(selectedPromotion.value)}
                    </p>
                  </div>
                  
                  <div className="bg-nova-black/40 p-3 rounded border border-nova-gold/20">
                    <p className="text-sm text-nova-white/60">
                      {language === 'fr' ? 'Période de Validité' : 'Validity Period'}
                    </p>
                    <p className="text-nova-white">
                      {formatDate(selectedPromotion.startDate).split(' ')[0]} - {formatDate(selectedPromotion.endDate).split(' ')[0]}
                    </p>
                  </div>
                  
                  <div className="bg-nova-black/40 p-3 rounded border border-nova-gold/20">
                    <p className="text-sm text-nova-white/60">
                      {language === 'fr' ? 'Catégories' : 'Categories'}
                    </p>
                    <p className="text-nova-white">
                      {selectedPromotion.categories.includes('All') 
                        ? (language === 'fr' ? 'Toutes les catégories' : 'All categories')
                        : selectedPromotion.categories.join(', ')}
                    </p>
                  </div>
                  
                  <div className="bg-nova-black/40 p-3 rounded border border-nova-gold/20">
                    <p className="text-sm text-nova-white/60">
                      {language === 'fr' ? 'Utilisation' : 'Usage'}
                    </p>
                    <p className="text-nova-white">
                      {selectedPromotion.usageCount} / {selectedPromotion.usageLimit}
                    </p>
                  </div>
                  
                  <div className="bg-nova-black/40 p-3 rounded border border-nova-gold/20">
                    <p className="text-sm text-nova-white/60">
                      {language === 'fr' ? 'Location Minimum' : 'Minimum Rental'}
                    </p>
                    <p className="text-nova-white">
                      {selectedPromotion.minRental} {language === 'fr' ? 'jours' : 'days'}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyPromoCode(selectedPromotion.code)}
                    className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Copier le Code' : 'Copy Code'}
                  </Button>
                  <Button
                    className="gold-btn"
                    onClick={() => {
                      setDetailsOpen(false);
                      handleEdit(selectedPromotion);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Modifier' : 'Edit'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="overflow-auto">
            <Table className="w-full">
              <TableHeader className="bg-nova-black/40 sticky top-0">
                <TableRow>
                  <TableHead className="text-nova-white">{language === 'fr' ? 'Code' : 'Code'}</TableHead>
                  <TableHead className="text-nova-white">{language === 'fr' ? 'Valeur' : 'Value'}</TableHead>
                  <TableHead className="text-nova-white">{language === 'fr' ? 'Description' : 'Description'}</TableHead>
                  <TableHead className="text-nova-white">{language === 'fr' ? 'Période' : 'Period'}</TableHead>
                  <TableHead className="text-nova-white">{language === 'fr' ? 'Utilisation' : 'Usage'}</TableHead>
                  <TableHead className="text-nova-white">{language === 'fr' ? 'Statut' : 'Status'}</TableHead>
                  <TableHead className="text-nova-white text-right">{language === 'fr' ? 'Actions' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promotion) => (
                  <TableRow 
                    key={promotion.id}
                    className={isExpired(promotion.endDate) ? 'opacity-60' : ''}
                  >
                    <TableCell className="font-medium text-nova-white">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-nova-gold/30 text-nova-gold">
                          {promotion.code}
                        </Badge>
                        {isExpired(promotion.endDate) && (
                          <Badge className="bg-gray-500">
                            {language === 'fr' ? 'Expiré' : 'Expired'}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-nova-white font-semibold">
                        {promotion.type === 'percentage'
                          ? `${promotion.value}%`
                          : formatCurrency(promotion.value)}
                      </span>
                    </TableCell>
                    <TableCell className="text-nova-white/80 max-w-md truncate">
                      {language === 'fr' ? promotion.descriptionFr : promotion.description}
                    </TableCell>
                    <TableCell className="text-nova-white/80">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-nova-gold" />
                        <span className="text-sm">
                          {formatDate(promotion.startDate).split(' ')[0]}
                        </span>
                        <span>-</span>
                        <span className="text-sm">
                          {formatDate(promotion.endDate).split(' ')[0]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-nova-black/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-nova-gold" 
                            style={{ 
                              width: `${Math.min(
                                (promotion.usageCount / promotion.usageLimit) * 100, 
                                100
                              )}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-nova-white/80 text-xs">
                          {promotion.usageCount}/{promotion.usageLimit}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={promotion.active}
                          onCheckedChange={() => togglePromotionStatus(promotion.id)}
                          disabled={isExpired(promotion.endDate)}
                        />
                        <span className={promotion.active ? 'text-green-400' : 'text-gray-400'}>
                          {promotion.active 
                            ? (language === 'fr' ? 'Actif' : 'Active') 
                            : (language === 'fr' ? 'Inactif' : 'Inactive')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShowDetails(promotion)}
                          className="h-8 w-8 p-0 text-nova-white/70 hover:text-nova-white hover:bg-nova-black/40"
                        >
                          <InfoIcon className="h-4 w-4" />
                          <span className="sr-only">Details</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyPromoCode(promotion.code)}
                          className="h-8 w-8 p-0 text-nova-white/70 hover:text-nova-white hover:bg-nova-black/40"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(promotion)}
                          className="h-8 w-8 p-0 text-nova-white/70 hover:text-nova-white hover:bg-nova-black/40"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(promotion)}
                          className="h-8 w-8 p-0 text-nova-white/70 hover:text-nova-white hover:bg-nova-black/40"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
