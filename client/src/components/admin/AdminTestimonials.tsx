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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  is_active: boolean;
  sort_order: number;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('sort_order');

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل التقييمات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setContent('');
    setRating(5);
    setIsActive(true);
    setEditingTestimonial(null);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setName(testimonial.name);
    setContent(testimonial.content);
    setRating(testimonial.rating);
    setIsActive(testimonial.is_active);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const testimonialData = {
      name,
      content,
      rating,
      is_active: isActive,
      sort_order: editingTestimonial ? editingTestimonial.sort_order : testimonials.length,
    };

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;

        toast({
          title: 'تم التحديث',
          description: 'تم تحديث التقييم بنجاح',
        });
      } else {
        const { error } = await supabase.from('testimonials').insert([testimonialData]);

        if (error) throw error;

        toast({
          title: 'تم الإضافة',
          description: 'تم إضافة التقييم بنجاح',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حفظ التقييم',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا التقييم؟')) return;

    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'تم الحذف',
        description: 'تم حذف التقييم بنجاح',
      });

      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حذف التقييم',
        variant: 'destructive',
      });
    }
  };

  const toggleActive = async (testimonial: Testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !testimonial.is_active })
        .eq('id', testimonial.id);

      if (error) throw error;

      fetchTestimonials();
    } catch (error) {
      console.error('Error toggling testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحديث حالة التقييم',
        variant: 'destructive',
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return <div className="flex justify-center p-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة التقييمات</h2>
          <p className="text-muted-foreground">إضافة وتعديل تقييمات العملاء</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة تقييم جديد
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'تعديل التقييم' : 'إضافة تقييم جديد'}</DialogTitle>
              <DialogDescription>
                {editingTestimonial ? 'عدل بيانات التقييم' : 'أدخل بيانات التقييم الجديد'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم العميل *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="مثال: أحمد محمد"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">محتوى التقييم *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="تجربة رائعة مع فريق VIB..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">التقييم</Label>
                <Select
                  value={rating.toString()}
                  onValueChange={(value) => setRating(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 نجوم ⭐⭐⭐⭐⭐</SelectItem>
                    <SelectItem value="4">4 نجوم ⭐⭐⭐⭐</SelectItem>
                    <SelectItem value="3">3 نجوم ⭐⭐⭐</SelectItem>
                    <SelectItem value="2">2 نجوم ⭐⭐</SelectItem>
                    <SelectItem value="1">1 نجمة ⭐</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
                <Label htmlFor="is_active">نشط</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">{editingTestimonial ? 'تحديث' : 'إضافة'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {testimonial.name}
                    {!testimonial.is_active && <Badge variant="secondary">غير نشط</Badge>}
                  </CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={testimonial.is_active}
                    onCheckedChange={() => toggleActive(testimonial)}
                    className="mr-2"
                  />
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(testimonial)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">"{testimonial.content}"</p>
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">لا توجد تقييمات حالياً</p>
              <p className="text-sm text-muted-foreground mt-1">
                اضغط على "إضافة تقييم جديد" لإضافة أول تقييم
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
