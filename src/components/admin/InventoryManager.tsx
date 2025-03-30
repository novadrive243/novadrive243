
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Package, Search, Car, DollarSign, Clock, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryManagerProps {
  vehicles: any[];
  language: string;
  formatCurrency: (amount: number) => string;
}

interface VehicleInventory {
  status: string;
  lastServiced: string;
  fuelLevel: string;
  mileage: number;
  accessories: string[];
}

interface EnhancedVehicle {
  id: string;
  name: string;
  category?: string;
  price_per_day: number;
  description?: string;
  image_url?: string;
  available?: boolean;
  created_at?: string;
  updated_at?: string;
  inventory: VehicleInventory;
}

type NewVehicle = {
  name: string;
  category: string;
  price_per_day: number;
  description: string;
  image_url: string;
  inventory: VehicleInventory;
};

export const InventoryManager = ({ vehicles: initialVehicles, language, formatCurrency }: InventoryManagerProps) => {
  const { toast } = useToast();
  
  const enhancedVehicles = initialVehicles.map(vehicle => ({
    ...vehicle,
    inventory: {
      status: ['in-stock', 'maintenance', 'reserved', 'in-use'][Math.floor(Math.random() * 4)],
      lastServiced: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fuelLevel: Math.floor(Math.random() * 100) + '%',
      mileage: Math.floor(Math.random() * 50000) + 10000,
      accessories: ['GPS', 'Child Seat', 'Roof Rack', 'Bluetooth', 'Wi-Fi'].filter(() => Math.random() > 0.5)
    }
  }));
  
  const [vehicles, setVehicles] = useState<EnhancedVehicle[]>(enhancedVehicles);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [open, setOpen] = useState(false);
  
  const [newVehicle, setNewVehicle] = useState<NewVehicle>({
    name: '',
    category: '',
    price_per_day: 0,
    description: '',
    image_url: '',
    inventory: {
      status: 'in-stock',
      lastServiced: new Date().toISOString().split('T')[0],
      fuelLevel: '100%',
      mileage: 0,
      accessories: []
    }
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none">
            {language === 'fr' ? 'En Stock' : 'In Stock'}
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-none">
            {language === 'fr' ? 'En Maintenance' : 'Maintenance'}
          </Badge>
        );
      case 'reserved':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-none">
            {language === 'fr' ? 'Réservé' : 'Reserved'}
          </Badge>
        );
      case 'in-use':
        return (
          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-none">
            {language === 'fr' ? 'En Utilisation' : 'In Use'}
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
  
  const getAccessoryTranslation = (accessory: string) => {
    if (language === 'fr') {
      switch (accessory) {
        case 'GPS': return 'GPS';
        case 'Child Seat': return 'Siège Enfant';
        case 'Roof Rack': return 'Porte-Bagages';
        case 'Bluetooth': return 'Bluetooth';
        case 'Wi-Fi': return 'Wi-Fi';
        default: return accessory;
      }
    }
    return accessory;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewVehicle(prev => {
        if (parent === 'inventory') {
          return {
            ...prev,
            inventory: {
              ...prev.inventory,
              [child]: value
            }
          };
        }
        return { ...prev, [name]: value };
      });
    } else {
      setNewVehicle(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewVehicle(prev => {
        if (parent === 'inventory') {
          return {
            ...prev,
            inventory: {
              ...prev.inventory,
              [child]: value
            }
          };
        }
        return { ...prev, [name]: value };
      });
    } else {
      setNewVehicle(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
    const vehicle: EnhancedVehicle = {
      id: `new-${Date.now()}`,
      name: newVehicle.name,
      category: newVehicle.category,
      description: newVehicle.description,
      image_url: newVehicle.image_url,
      available: newVehicle.inventory.status === 'in-stock',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      price_per_day: parseFloat(newVehicle.price_per_day.toString()),
      inventory: { ...newVehicle.inventory }
    };
    
    setVehicles([...vehicles, vehicle]);
    
    toast({
      title: language === 'fr' ? 'Véhicule ajouté' : 'Vehicle Added',
      description: language === 'fr' 
        ? `${vehicle.name} a été ajouté à l'inventaire` 
        : `${vehicle.name} has been added to inventory`,
    });
    
    setOpen(false);
  };
  
  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };
  
  const filteredVehicles = vehicles
    .filter(vehicle => {
      if (activeTab !== 'all') {
        return vehicle.inventory.status === activeTab;
      }
      return true;
    })
    .filter(vehicle => {
      if (searchTerm) {
        return (
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => {
      let compareA: any = a[sortBy as keyof typeof a];
      let compareB: any = b[sortBy as keyof typeof b];
      
      if (sortBy === 'status') {
        compareA = a.inventory.status;
        compareB = b.inventory.status;
      }
      
      if (compareA < compareB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (compareA > compareB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gold-gradient-text flex items-center">
          <Package className="mr-2 h-6 w-6 text-nova-gold" />
          {language === 'fr' ? 'Gestion d\'Inventaire' : 'Inventory Management'}
        </h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gold-btn">
              <PlusCircle className="mr-2 h-4 w-4" />
              {language === 'fr' ? 'Ajouter un Véhicule' : 'Add Vehicle'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-nova-gray text-nova-white border-nova-gold/30 max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {language === 'fr' ? 'Ajouter un Nouveau Véhicule' : 'Add New Vehicle'}
              </DialogTitle>
              <DialogDescription className="text-nova-white/60">
                {language === 'fr' 
                  ? 'Complétez le formulaire pour ajouter un véhicule à l\'inventaire' 
                  : 'Complete the form to add a vehicle to inventory'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddVehicle}>
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="col-span-2">
                  <Label htmlFor="name" className="text-nova-white">
                    {language === 'fr' ? 'Nom du Véhicule' : 'Vehicle Name'}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newVehicle.name}
                    onChange={handleInputChange}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-nova-white">
                    {language === 'fr' ? 'Catégorie' : 'Category'}
                  </Label>
                  <Select 
                    value={newVehicle.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                    required
                  >
                    <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                      <SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} />
                    </SelectTrigger>
                    <SelectContent className="bg-nova-gray border-nova-gold/30">
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
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price_per_day" className="text-nova-white">
                    {language === 'fr' ? 'Prix par Jour' : 'Price per Day'}
                  </Label>
                  <Input
                    id="price_per_day"
                    name="price_per_day"
                    type="number"
                    value={newVehicle.price_per_day}
                    onChange={handleInputChange}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="image_url" className="text-nova-white">
                    {language === 'fr' ? 'URL de l\'Image' : 'Image URL'}
                  </Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={newVehicle.image_url}
                    onChange={handleInputChange}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description" className="text-nova-white">
                    {language === 'fr' ? 'Description' : 'Description'}
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={newVehicle.description}
                    onChange={handleInputChange}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="inventory.status" className="text-nova-white">
                    {language === 'fr' ? 'Statut' : 'Status'}
                  </Label>
                  <Select 
                    value={newVehicle.inventory.status} 
                    onValueChange={(value) => handleSelectChange('inventory.status', value)}
                    required
                  >
                    <SelectTrigger className="bg-nova-black border-nova-gold/30 text-nova-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-nova-gray border-nova-gold/30">
                      <SelectItem value="in-stock" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'En Stock' : 'In Stock'}
                      </SelectItem>
                      <SelectItem value="maintenance" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'En Maintenance' : 'Maintenance'}
                      </SelectItem>
                      <SelectItem value="reserved" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'Réservé' : 'Reserved'}
                      </SelectItem>
                      <SelectItem value="in-use" className="text-nova-white hover:bg-nova-gold/20">
                        {language === 'fr' ? 'En Utilisation' : 'In Use'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="inventory.mileage" className="text-nova-white">
                    {language === 'fr' ? 'Kilométrage' : 'Mileage'}
                  </Label>
                  <Input
                    id="inventory.mileage"
                    name="inventory.mileage"
                    type="number"
                    value={newVehicle.inventory.mileage}
                    onChange={handleInputChange}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="inventory.fuelLevel" className="text-nova-white">
                    {language === 'fr' ? 'Niveau de Carburant' : 'Fuel Level'}
                  </Label>
                  <Input
                    id="inventory.fuelLevel"
                    name="inventory.fuelLevel"
                    value={newVehicle.inventory.fuelLevel}
                    onChange={handleInputChange}
                    className="bg-nova-black border-nova-gold/30 text-nova-white"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="submit" className="gold-btn">
                  {language === 'fr' ? 'Ajouter à l\'Inventaire' : 'Add to Inventory'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-4 bg-nova-gray/30 text-nova-white">
            <TabsTrigger value="all">
              {language === 'fr' ? 'Tous' : 'All'}
            </TabsTrigger>
            <TabsTrigger value="in-stock">
              {language === 'fr' ? 'En Stock' : 'In Stock'}
            </TabsTrigger>
            <TabsTrigger value="reserved">
              {language === 'fr' ? 'Réservé' : 'Reserved'}
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              {language === 'fr' ? 'Maintenance' : 'Maintenance'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-nova-white/60" />
          <Input
            placeholder={language === 'fr' ? 'Rechercher des véhicules...' : 'Search vehicles...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-nova-gray/20 border-nova-gold/30 text-nova-white w-full md:w-[300px]"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="bg-nova-gray/10 border-nova-gold/20 hover:border-nova-gold/50 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={vehicle.image_url || '/lovable-uploads/6a588e4a-4639-4bb2-800c-1d4ca6adb059.png'}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(vehicle.inventory.status)}
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-nova-white">{vehicle.name}</CardTitle>
                  <CardDescription className="text-nova-white/60 flex items-center mt-1">
                    <Car className="h-4 w-4 mr-1 text-nova-gold" />
                    {vehicle.category || 'SUV'}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-nova-gold font-bold flex items-center">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(vehicle.price_per_day)}/day
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-nova-gold/20 rounded p-2">
                    <div className="text-nova-white/60 mb-1">
                      {language === 'fr' ? 'Kilométrage' : 'Mileage'}
                    </div>
                    <div className="text-nova-white">
                      {vehicle.inventory.mileage.toLocaleString()} {language === 'fr' ? 'km' : 'mi'}
                    </div>
                  </div>
                  <div className="border border-nova-gold/20 rounded p-2">
                    <div className="text-nova-white/60 mb-1">
                      {language === 'fr' ? 'Carburant' : 'Fuel'}
                    </div>
                    <div className="text-nova-white">
                      {vehicle.inventory.fuelLevel}
                    </div>
                  </div>
                </div>
                
                <div className="border border-nova-gold/20 rounded p-2">
                  <div className="text-nova-white/60 mb-1">
                    {language === 'fr' ? 'Dernière Maintenance' : 'Last Serviced'}
                  </div>
                  <div className="text-nova-white">
                    {new Date(vehicle.inventory.lastServiced).toLocaleDateString()}
                  </div>
                </div>
                
                {vehicle.inventory.accessories && vehicle.inventory.accessories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {vehicle.inventory.accessories.map((accessory: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-nova-gold/10 text-nova-gold border-nova-gold/30">
                        {getAccessoryTranslation(accessory)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10"
              >
                {language === 'fr' ? 'Modifier' : 'Edit'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10"
              >
                {language === 'fr' ? 'Mettre à Jour' : 'Update Status'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredVehicles.length === 0 && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-nova-gold/50 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-nova-white">
            {language === 'fr' ? 'Aucun véhicule trouvé' : 'No vehicles found'}
          </h3>
          <p className="text-nova-white/60 mt-2">
            {language === 'fr' 
              ? 'Ajustez vos filtres ou ajoutez de nouveaux véhicules à l\'inventaire' 
              : 'Adjust your filters or add new vehicles to inventory'}
          </p>
        </div>
      )}
    </div>
  );
};
