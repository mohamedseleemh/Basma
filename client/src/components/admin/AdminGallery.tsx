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
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase.from('gallery_items').select('*').order('sort_order');

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل معرض الصور',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setImageUrl('');
    setDescription('');
    setIsActive(true);
    setEditingItem(null);
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setImageUrl(item.image_url);
    setDescription(item.description || '');
    setIsActive(item.is_active);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemData = {
      title: title || null,
      image_url: imageUrl,
      description: description || null,
      is_active: isActive,
      sort_order: editingItem ? editingItem.sort_order : galleryItems.length,
    };

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery_items')
          .update(itemData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: 'تم التحديث',
          description: 'تم تحديث الصورة بنجاح',
        });
      } else {
        const { error } = await supabase.from('gallery_items').insert([itemData]);

        if (error) throw error;

        toast({
          title: 'تم الإضافة',
          description: 'تم إضافة الصورة بنجاح',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchGalleryItems();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حفظ الصورة',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;

    try {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'تم الحذف',
        description: 'تم حذف الصورة بنجاح',
      });

      fetchGalleryItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حذف الصورة',
        variant: 'destructive',
      });
    }
  };

  const toggleActive = async (item: GalleryItem) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({ is_active: !item.is_active })
        .eq('id', item.id);

      if (error) throw error;

      fetchGalleryItems();
    } catch (error) {
      console.error('Error toggling gallery item:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحديث حالة الصورة',
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
          <h2 className="text-2xl font-bold">إدارة معرض الصور</h2>
          <p className="text-muted-foreground">إضافة وتعديل صور المعرض</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة صورة جديدة
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'تعديل الصورة' : 'إضافة صورة جديدة'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'عدل بيانات الصورة' : 'أدخل بيانات الصورة الجديدة'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الصورة</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: رحلة نيلية مميزة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">رابط الصورة *</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف مختصر للصورة"
                  rows={3}
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
                <Button type="submit">{editingItem ? 'تحديث' : 'إضافة'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={item.image_url}
                  alt={item.title || 'Gallery image'}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {!item.is_active && <Badge variant="secondary">غير نشط</Badge>}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  {item.title && <CardTitle className="text-lg mb-1">{item.title}</CardTitle>}
                  {item.description && (
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Switch checked={item.is_active} onCheckedChange={() => toggleActive(item)} />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {galleryItems.length === 0 && (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-8">
                <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">لا توجد صور في المعرض حالياً</p>
                <p className="text-sm text-muted-foreground mt-1">
                  اضغط على "إضافة صورة جديدة" لإضافة أول صورة
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
