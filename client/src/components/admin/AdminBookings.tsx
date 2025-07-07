import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string | null;
  status: string;
  created_at: string;
}

const AdminBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['/api/bookings'],
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: 'تم تحديث الحجز بنجاح',
        description: 'تم تحديث حالة الحجز',
      });
    },
    onError: () => {
      toast({
        title: 'خطأ في التحديث',
        description: 'فشل في تحديث حالة الحجز',
        variant: 'destructive',
      });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/bookings/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: 'تم حذف الحجز بنجاح',
        description: 'تم حذف الحجز من النظام',
      });
    },
    onError: () => {
      toast({
        title: 'خطأ في الحذف',
        description: 'فشل في حذف الحجز',
        variant: 'destructive',
      });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'مؤكد';
      case 'cancelled':
        return 'ملغى';
      default:
        return 'في الانتظار';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const updateStatus = (id: string, status: string) => {
    updateBookingMutation.mutate({ id, status });
  };

  const openViewDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الحجوزات</h2>
        <div className="text-sm text-gray-600">إجمالي الحجوزات: {bookings.length}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">في الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter((b: Booking) => b.status === 'pending').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">مؤكدة</p>
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter((b: Booking) => b.status === 'confirmed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ملغاة</p>
              <p className="text-2xl font-bold text-red-600">
                {bookings.filter((b: Booking) => b.status === 'cancelled').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">هذا الشهر</p>
              <p className="text-2xl font-bold text-blue-600">
                {
                  bookings.filter((b: Booking) => {
                    const bookingDate = new Date(b.created_at);
                    const now = new Date();
                    return (
                      bookingDate.getMonth() === now.getMonth() &&
                      bookingDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الخدمة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  التاريخ والوقت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الضيوف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking: Booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{booking.service}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{booking.guests} ضيف</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {getStatusText(booking.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openViewDialog(booking)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="عرض التفاصيل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="تأكيد الحجز"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="إلغاء الحجز"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => deleteBookingMutation.mutate(booking.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="حذف الحجز"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Booking Dialog */}
      {isViewDialogOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">تفاصيل الحجز</h3>
              <button
                onClick={() => setIsViewDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">اسم العميل</label>
                  <p className="text-gray-800">{selectedBooking.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                  <p className="text-gray-800">{selectedBooking.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">رقم الهاتف</label>
                  <p className="text-gray-800">{selectedBooking.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">الخدمة</label>
                  <p className="text-gray-800">{selectedBooking.service}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">التاريخ</label>
                  <p className="text-gray-800">{selectedBooking.date}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">الوقت</label>
                  <p className="text-gray-800">{selectedBooking.time}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">عدد الضيوف</label>
                  <p className="text-gray-800">{selectedBooking.guests}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">الحالة</label>
                  <p className="text-gray-800">{getStatusText(selectedBooking.status)}</p>
                </div>
              </div>

              {selectedBooking.special_requests && (
                <div>
                  <label className="text-sm font-medium text-gray-600">طلبات خاصة</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                    {selectedBooking.special_requests}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-600">تاريخ الحجز</label>
                <p className="text-gray-800">{formatDate(selectedBooking.created_at)}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsViewDialogOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إغلاق
              </button>
              {selectedBooking.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      updateStatus(selectedBooking.id, 'confirmed');
                      setIsViewDialogOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    تأكيد الحجز
                  </button>
                  <button
                    onClick={() => {
                      updateStatus(selectedBooking.id, 'cancelled');
                      setIsViewDialogOpen(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    إلغاء الحجز
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
