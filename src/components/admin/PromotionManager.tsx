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
import { PlusCircle, Ticket, Clock, Calendar, Trash2, Edit, Copy, BadgePercent, InfoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPromotion(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPromotion(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleSelectChange = (name: string, value: string | string[]) => {
    setNewPromotion(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setNewPromotion(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleAddPromotion = (e: React.FormEvent, onClose: () => void) => {
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
    
    // Reset form
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
    
    onClose();
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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gold-btn">
              <PlusCircle className="mr-2 h-4 w-4" />
              {language === 'fr' ? 'Nouvelle Promotion' : 'New Promotion'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-2xl">
            {(onClose) => (
              <>
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
                
                <form onSubmit={(e) => handleAddPromotion(e, onClose)}>
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
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="bg-nova-gray/10 border-nova-gold/20">
        <CardHeader>
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Promotions Actives et Planifiées' : 'Active & Scheduled Promotions'}
          </CardTitle>
          <CardDescription className="text-nova-white/60">
            {language === 'fr' 
              ? 'Gérez vos codes promotionnels et offres spéciales'
              : 'Manage your promotional codes and special offers'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-nova-gold/20">
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Code' : 'Code'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Remise' : 'Discount'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Validité' : 'Validity'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Description' : 'Description'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Utilisation' : 'Usage'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Statut' : 'Status'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Actions' : 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow 
                  key={promotion.id} 
                  className={`border-nova-gold/10 ${isExpired(promotion.endDate) && !promotion.active ? 'opacity-60' : ''}`}
                >
                  <TableCell className="font-mono text-nova-white font-semibold">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-nova-gold/10 border-nova-gold/30 text-nova-white">
                        {promotion.code}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-nova-gold/70 hover:text-nova-gold"
                        onClick={() => copyPromoCode(promotion.code)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-nova-gold font-semibold">
                      {promotion.type === 'percentage' 
                        ? `${promotion.value}%` 
                        : formatCurrency(promotion.value)}
                    </span>
                    <div className="text-xs text-nova-white/60 mt-1">
                      {promotion.minRental > 1 && (
                        <span>
                          {language === 'fr' 
                            ? `Min. ${promotion.minRental} jours` 
                            : `Min. ${promotion.minRental} days`}
                        </span>
                      )}
                      {promotion.maxDiscount && (
                        <span className="ml-2">
                          {language === 'fr' 
                            ? `Max. ${formatCurrency(promotion.maxDiscount)}` 
                            : `Max. ${formatCurrency(promotion.maxDiscount)}`}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-nova-white/80 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-nova-gold" />
                      {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                    </div>
                    <div className="text-xs text-nova-white/60 mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {isExpired(promotion.endDate) 
                        ? (language === 'fr' ? 'Expiré' : 'Expired')
                        : (language === 'fr' ? 'Actif' : 'Active')}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] text-nova-white/80">
                    {language === 'fr' ? promotion.descriptionFr : promotion.description}
                    <div className="text-xs text-nova-white/60 mt-1">
                      {promotion.categories.join(', ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-nova-white">
                        {promotion.usageCount} / {promotion.usageLimit}
                      </span>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-1 overflow-hidden">
                        <div 
                          className="bg-nova-gold h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (promotion.usageCount / promotion.usageLimit) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${promotion.active 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                        : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'} border-none`}
                    >
                      {promotion.active 
                        ? (language === 'fr' ? 'Actif' : 'Active')
                        : (language === 'fr' ? 'Inactif' : 'Inactive')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-nova-gold"
                        title={language === 'fr' ? 'Modifier' : 'Edit'}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 ${promotion.active ? 'text-red-400' : 'text-green-400'}`}
                        onClick={() => togglePromotionStatus(promotion.id)}
                        title={promotion.active 
                          ? (language === 'fr' ? 'Désactiver' : 'Deactivate') 
                          : (language === 'fr' ? 'Activer' : 'Activate')}
                      >
                        {promotion.active 
                          ? <Trash2 className="h-4 w-4" />
                          : <BadgePercent className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-nova-white/70"
                        title={language === 'fr' ? 'Détails' : 'Details'}
                      >
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-xs text-nova-white/60 pt-0">
          <InfoIcon className="h-4 w-4 mr-2 text-nova-gold" />
          {language === 'fr' 
            ? 'Les codes promotionnels sont sensibles à la casse et peuvent être limités à certaines catégories de véhicules' 
            : 'Promo codes are case-sensitive and may be limited to certain vehicle categories'}
        </CardFooter>
      </Card>
    </div>
  );
};
