import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, Star, Image, Briefcase, LogOut, UserCircle2 } from 'lucide-react';
import AdminServices from '@/components/admin/AdminServices';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminGallery from '@/components/admin/AdminGallery';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminBookings from '@/components/admin/AdminBookings';

import { useQuery } from '@tanstack/react-query';
const Admin = () => {
  const { user, profile, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  // Dynamic stats (lightweight, no heavy UI)
  const { data: services = [] } = useQuery<any[]>({ queryKey: ['/api/services'], enabled: !!user });
  const { data: testimonials = [] } = useQuery<any[]>({ queryKey: ['/api/testimonials'], enabled: !!user });
  const { data: gallery = [] } = useQuery<any[]>({ queryKey: ['/api/gallery'], enabled: !!user });
  const { data: bookings = [] } = useQuery<any[]>({ queryKey: ['/api/bookings'], enabled: !!user });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
      </div>
    );
  }
  if (!user || !isAdmin) return null;

  return (


    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <UserCircle2 className="w-10 h-10 text-purple-600" />
            <span className="text-lg font-bold text-gray-800">{profile?.full_name || user?.username || 'أدمن'}</span>
            <span className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-1">صلاحية: {isAdmin ? 'مدير' : 'مستخدم'}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')} className="flex items-center gap-2 text-sm px-4 py-2">
              <Users className="w-4 h-4" />
              الرئيسية
            </Button>
            <Button variant="destructive" onClick={signOut} className="flex items-center gap-2 text-sm px-4 py-2">
              <LogOut className="w-4 h-4" />
              خروج
            </Button>
          </div>
        </div>

        {/* Stats (lightweight) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center border border-gray-100">
            <Briefcase className="h-5 w-5 text-purple-400 mb-1" />
            <div className="text-xl font-bold text-purple-900">{services.filter((s:any)=>s.is_active).length}</div>
            <div className="text-xs text-gray-500">خدمات</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center border border-gray-100">
            <Star className="h-5 w-5 text-yellow-400 mb-1" />
            <div className="text-xl font-bold text-pink-900">{testimonials.length}</div>
            <div className="text-xs text-gray-500">تقييمات</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center border border-gray-100">
            <Image className="h-5 w-5 text-blue-400 mb-1" />
            <div className="text-xl font-bold text-blue-900">{gallery.length}</div>
            <div className="text-xs text-gray-500">صور</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center border border-gray-100">
            <Users className="h-5 w-5 text-green-400 mb-1" />
            <div className="text-xl font-bold text-green-900">{bookings.length}</div>
            <div className="text-xs text-gray-500">حجوزات</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-0 md:p-4">
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="flex flex-wrap gap-2 mb-4">
              <TabsTrigger value="services" className="flex items-center gap-2 text-sm px-3 py-2 font-bold data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 rounded">
                <Briefcase className="w-4 h-4" />الخدمات
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-2 text-sm px-3 py-2 font-bold data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-900 rounded">
                <Star className="w-4 h-4" />التقييمات
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2 text-sm px-3 py-2 font-bold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 rounded">
                <Image className="w-4 h-4" />المعرض
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2 text-sm px-3 py-2 font-bold data-[state=active]:bg-green-100 data-[state=active]:text-green-900 rounded">
                <Users className="w-4 h-4" />الحجوزات
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 text-sm px-3 py-2 font-bold data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded">
                <Settings className="w-4 h-4" />الإعدادات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-2">
              <AdminServices />
            </TabsContent>
            <TabsContent value="testimonials" className="mt-2">
              <AdminTestimonials />
            </TabsContent>
            <TabsContent value="gallery" className="mt-2">
              <AdminGallery />
            </TabsContent>
            <TabsContent value="bookings" className="mt-2">
              <AdminBookings />
            </TabsContent>
            <TabsContent value="settings" className="mt-2">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
