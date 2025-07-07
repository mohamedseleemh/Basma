import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SiteSettings {
  site_title: string;
  site_description: string;
  contact_phone: string;
  contact_email: string;
  social_media: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: '',
    site_description: '',
    contact_phone: '',
    contact_email: '',
    social_media: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('key, value');

      if (error) throw error;

      if (data) {
        const settingsObj: any = {};
        data.forEach((item) => {
          if (item.key === 'social_media') {
            settingsObj[item.key] = item.value;
          } else {
            settingsObj[item.key] = item.value;
          }
        });

        setSettings({
          site_title: settingsObj.site_title || '',
          site_description: settingsObj.site_description || '',
          contact_phone: settingsObj.contact_phone || '',
          contact_email: settingsObj.contact_email || '',
          social_media: settingsObj.social_media || {
            facebook: '',
            instagram: '',
            twitter: '',
          },
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل الإعدادات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // Update each setting
      const updates = [
        { key: 'site_title', value: JSON.stringify(settings.site_title) },
        { key: 'site_description', value: JSON.stringify(settings.site_description) },
        { key: 'contact_phone', value: JSON.stringify(settings.contact_phone) },
        { key: 'contact_email', value: JSON.stringify(settings.contact_email) },
        { key: 'social_media', value: JSON.stringify(settings.social_media) },
      ];

      for (const update of updates) {
        const { error } = await supabase.from('site_settings').upsert(
          {
            key: update.key,
            value: update.value,
          },
          {
            onConflict: 'key',
          },
        );

        if (error) throw error;
      }

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ الإعدادات بنجاح',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حفظ الإعدادات',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSocialMedia = (platform: keyof SiteSettings['social_media'], value: string) => {
    setSettings((prev) => ({
      ...prev,
      social_media: {
        ...prev.social_media,
        [platform]: value,
      },
    }));
  };

  if (loading) {
    return <div className="flex justify-center p-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إعدادات الموقع</h2>
          <p className="text-muted-foreground">تخصيص إعدادات الموقع الأساسية</p>
        </div>

        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات العامة</CardTitle>
            <CardDescription>إعدادات الموقع الأساسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_title">عنوان الموقع</Label>
              <Input
                id="site_title"
                value={settings.site_title}
                onChange={(e) => updateSetting('site_title', e.target.value)}
                placeholder="VIB - رحلات نيلية مميزة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site_description">وصف الموقع</Label>
              <Input
                id="site_description"
                value={settings.site_description}
                onChange={(e) => updateSetting('site_description', e.target.value)}
                placeholder="خدمات حجوزات ورحلات نيلية VIP"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card>
          <CardHeader>
            <CardTitle>معلومات التواصل</CardTitle>
            <CardDescription>بيانات التواصل مع العملاء</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact_phone">رقم الهاتف</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone}
                onChange={(e) => updateSetting('contact_phone', e.target.value)}
                placeholder="+201234567890"
                type="tel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_email">البريد الإلكتروني</Label>
              <Input
                id="contact_email"
                value={settings.contact_email}
                onChange={(e) => updateSetting('contact_email', e.target.value)}
                placeholder="info@vib.com"
                type="email"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Settings */}
        <Card>
          <CardHeader>
            <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
            <CardDescription>روابط صفحات التواصل الاجتماعي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">فيسبوك</Label>
              <Input
                id="facebook"
                value={settings.social_media.facebook}
                onChange={(e) => updateSocialMedia('facebook', e.target.value)}
                placeholder="https://facebook.com/vib"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">إنستجرام</Label>
              <Input
                id="instagram"
                value={settings.social_media.instagram}
                onChange={(e) => updateSocialMedia('instagram', e.target.value)}
                placeholder="https://instagram.com/vib"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">تويتر</Label>
              <Input
                id="twitter"
                value={settings.social_media.twitter}
                onChange={(e) => updateSocialMedia('twitter', e.target.value)}
                placeholder="https://twitter.com/vib"
                type="url"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {saving ? 'جاري الحفظ...' : 'حفظ جميع التغييرات'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
