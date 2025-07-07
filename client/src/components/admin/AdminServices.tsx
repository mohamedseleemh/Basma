import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [features, setFeatures] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('sort_order');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل الخدمات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIcon('');
    setFeatures('');
    setIsActive(true);
    setEditingService(null);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description || '');
    setIcon(service.icon || '');
    setFeatures(service.features.join(', '));
    setIsActive(service.is_active);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      title,
      description: description || null,
      icon: icon || null,
      features: features
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f),
      is_active: isActive,
      sort_order: editingService ? editingService.sort_order : services.length,
    };

    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;

        toast({
          title: 'تم التحديث',
          description: 'تم تحديث الخدمة بنجاح',
        });
      } else {
        const { error } = await supabase.from('services').insert([serviceData]);

        if (error) throw error;

        toast({
          title: 'تم الإضافة',
          description: 'تم إضافة الخدمة بنجاح',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حفظ الخدمة',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'تم الحذف',
        description: 'تم حذف الخدمة بنجاح',
      });

      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حذف الخدمة',
        variant: 'destructive',
      });
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id);

      if (error) throw error;

      fetchServices();
    } catch (error) {
      console.error('Error toggling service:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحديث حالة الخدمة',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
          <p className="text-muted-foreground">إضافة وتعديل خدمات الشركة</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة خدمة جديدة
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'عدل بيانات الخدمة' : 'أدخل بيانات الخدمة الجديدة'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">اسم الخدمة *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="مثال: رحلات نيلية VIP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف مختصر للخدمة"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">الأيقونة (emoji)</Label>
                <Input
                  id="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="🚢"
                  maxLength={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">المميزات (منفصلة بفاصلة)</Label>
                <Textarea
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="خدمة VIP, طعام فاخر, موسيقى حية"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
                <Label htmlFor="is_active">نشط</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">{editingService ? 'تحديث' : 'إضافة'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {service.icon && <span className="text-2xl">{service.icon}</span>}
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {service.title}
                      {!service.is_active && <Badge variant="secondary">غير نشط</Badge>}
                    </CardTitle>
                    {service.description && (
                      <CardDescription className="mt-1">{service.description}</CardDescription>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={service.is_active}
                    onCheckedChange={() => toggleActive(service)}
                    className="mr-2"
                  />
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(service)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {service.features.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {services.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">لا توجد خدمات حالياً</p>
              <p className="text-sm text-muted-foreground mt-1">
                اضغط على "إضافة خدمة جديدة" لإضافة أول خدمة
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
