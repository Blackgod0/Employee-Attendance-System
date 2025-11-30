export interface AttendanceRecord {
    _id: string;
    userId: string;
    date: string;
    checkInTime?: string | null;
    checkOutTime?: string | null;
    status: 'present' | 'absent' | 'late' | 'half-day' | string;
    totalHours: number;
    createdAt?: string;
    __v?: number;
}
