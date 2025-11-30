// src/pages/employee/Dashboard.tsx
import {
    AlarmClock,
    BellRing,
    Calendar,
    CalendarDays,
    Check,
    CheckCircle,
    CircleDashed,
    Clock,
    Gift,
    Home,
    LogOut,
    User,
    UserPlus,
    X,
  } from "lucide-react";
  import { useEffect, useMemo, useState } from "react";
  import AttendanceChart from "../../components/AttendanceChart";
  import StatCard from "../../components/StatCard";
  import TodayStatusCard from "../../components/TodayStatusCard";
  import useAttendanceDashboardApi, {
    type AttendanceHistoryResponse,
    type AttendanceSummary,
    type AttendanceRecord,
  } from "../../core/api/attendance_dashboard_api";
  import useAuthApi from "../../core/api/authentication_api";
  
  const EMPTY_HISTORY: AttendanceHistoryResponse = {
    success: true,
    count: 0,
    history: [],
  };
  
  const EMPTY_SUMMARY: AttendanceSummary = {
    present: 0,
    absent: 0,
    late: 0,
    halfDay: 0,
    totalDays: 0,
    totalHours: 0,
  };
  
  export default function Dashboard() {
    const [history, setHistory] = useState<AttendanceHistoryResponse>(EMPTY_HISTORY);
    const [summary, setSummary] = useState<AttendanceSummary>(EMPTY_SUMMARY);
    const [today, setToday] = useState<{
      status: "present" | "absent" | "late" | "half-day" | "not-marked";
      attendance: AttendanceRecord | null;
    }>({ status: "not-marked", attendance: null });
  
    const [navbarUserName, setNavbarUserName] = useState<string>("Employee");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  
    const attendanceApi = useAttendanceDashboardApi();
    const { getCurrentUser } = useAuthApi();
  
    // Derived navbar data (date + shift)
    const navbarData = useMemo(() => {
      const todayLabel = new Date().toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  
      let shiftName = "Not Checked In";
      let shiftTime = "--";
  
      if (today.attendance?.checkInTime) {
        const t = new Date(today.attendance.checkInTime);
        shiftName = today.status === "late" ? "Late Check-In" : "Checked-In";
        shiftTime = t.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      }
  
      if (today.attendance?.checkOutTime) {
        const t = new Date(today.attendance.checkOutTime);
        shiftName = "Checked-Out";
        shiftTime = t.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      }
  
      return {
        date: todayLabel,
        shiftName,
        shiftTime,
        userName: navbarUserName,
        userAvatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        hasNotification: false,
      };
    }, [today, navbarUserName]);
  
    const employeeStats = useMemo(
      () => [
        {
          title: "Present Days",
          value: summary.present,
          icon: <CheckCircle />,
        },
        {
          title: "Absent Days",
          value: summary.absent,
          icon: <X />,
        },
        {
          title: "Late Days",
          value: summary.late,
          icon: <AlarmClock />,
        },
        {
          title: "Half Days",
          value: summary.halfDay,
          icon: <CircleDashed />,
        },
        {
          title: "Total Working Days",
          value: summary.totalDays,
          icon: <CalendarDays />,
        },
        {
          title: "Total Hours Worked",
          value: summary.totalHours.toFixed(2),
          icon: <Clock />,
        },
      ],
      [summary]
    );
  
    // Load dashboard data
    useEffect(() => {
      document.title = "Employee Dashboard";
  
      const load = async () => {
        try {
          setIsLoading(true);
  
          const now = new Date();
          const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  
          const [summaryRes, historyRes, todayRes, userRes] = await Promise.all([
            attendanceApi.getSummary(monthStr),
            attendanceApi.getHistory(monthStr),
            attendanceApi.getTodayStatus(),
            getCurrentUser(),
          ]);
  
          setSummary(summaryRes);
          setHistory(historyRes);
          setToday({
            status: todayRes.status,
            attendance: todayRes.attendance,
          });
  
          if (userRes?.user?.name) {
            setNavbarUserName(userRes.user.name);
          }
        } catch (err) {
          console.error("Error loading dashboard:", err);
        } finally {
          setIsLoading(false);
        }
      };
  
      load();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    const handleQuickAction = async () => {
      try {
        if (isActionLoading) return;
        setIsActionLoading(true);
  
        // Decide whether to check-in or check-out.
        const canCheckIn = today.status === "not-marked";
        const canCheckOut = today.status === "present" && !!today.attendance?.checkInTime && !today.attendance?.checkOutTime;
  
        if (!canCheckIn && !canCheckOut) {
          return;
        }
  
        if (canCheckIn) {
          await attendanceApi.checkIn();
        } else if (canCheckOut) {
          await attendanceApi.checkOut();
        }
  
        // Refresh dashboard data after action
        const now = new Date();
        const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  
        const [summaryRes, historyRes, todayRes] = await Promise.all([
          attendanceApi.getSummary(monthStr),
          attendanceApi.getHistory(monthStr),
          attendanceApi.getTodayStatus(),
        ]);
  
        setSummary(summaryRes);
        setHistory(historyRes);
        setToday({
          status: todayRes.status,
          attendance: todayRes.attendance,
        });
      } catch (err) {
        console.error("Quick action error:", err);
        alert((err as Error).message || "Unable to update attendance.");
      } finally {
        setIsActionLoading(false);
      }
    };
  
    const recentAttendance = useMemo(() => {
      return [...history.history]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7);
    }, [history]);
  
    return (
      <main className="flex w-screen h-screen bg-slate-100">
        {/* sidebar */}
        <Sidebar />
  
        <section className="flex-1 flex flex-col">
          {/* navbar */}
          <DashboardNavbar {...navbarData} />
  
          {/* main section */}
          <div className="flex-1 bg-[#f3f5f7] rounded-tl-4xl flex gap-6 pr-12">
            {/* Left: Chart + recent attendance */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                {isLoading ? (
                  <div className="p-8">
                    <div className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
                  </div>
                ) : (
                  <AttendanceChart data={history} />
                )}
              </div>
  
              {/* Recent attendance list */}
              <div className="px-8 pb-8">
                <div className="bg-white rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-800">Recent Attendance</h3>
                    <span className="text-xs text-slate-400">Last 7 days</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {recentAttendance.length === 0 && (
                      <p className="text-xs text-slate-400 py-2">No attendance records yet.</p>
                    )}
                    {recentAttendance.map((item) => (
                      <RecentAttendanceRow key={item._id} record={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right: Today card + stats */}
            <div className="flex flex-col py-8 gap-5 w-80">
              <TodayStatusCard
                status={today.status}
                checkInTime={today.attendance?.checkInTime || null}
                checkOutTime={today.attendance?.checkOutTime || null}
                totalHours={today.attendance?.totalHours}
                onPrimaryAction={handleQuickAction}
                isActionLoading={isActionLoading}
              />
  
              <div className="flex flex-col gap-4">
                {employeeStats.map((item, index) => (
                  <StatCard {...item} key={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
  
  // --- Sidebar (unchanged, just slightly typed) ---
  const Sidebar: React.FC = () => {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [amPm, setAmPm] = useState("");
  
    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes();
  
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
  
        setHours(String(h).padStart(2, "0"));
        setMinutes(String(m).padStart(2, "0"));
        setAmPm(ampm);
      };
  
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <aside className="h-full w-20 flex flex-col items-center bg-white py-8 pt-4 ">
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mb-12 ">
          <div className="w-4 h-4 bg-white rounded-tr-lg rounded-bl-lg"></div>
        </div>
  
        <nav className="flex-1 flex flex-col gap-8 w-full items-center">
          <button className="text-indigo-600 p-2 rounded-xl bg-indigo-50">
            <Home size={24} strokeWidth={2.5} />
          </button>
          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
            <UserPlus size={24} />
          </button>
          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
            <User size={24} />
          </button>
          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
            <Calendar size={24} />
          </button>
          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
            <Gift size={24} />
          </button>
        </nav>
  
        <div className="flex flex-col items-center gap-6 mt-auto">
          <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-50 rounded-xl">
            <span className="text-xs font-bold text-gray-800 leading-none">
              {hours}:{minutes}
            </span>
            <span className="text-[9px] text-gray-500 font-medium leading-none mt-0.5">
              {amPm}
            </span>
          </div>
  
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={24} />
          </button>
        </div>
      </aside>
    );
  };
  
  interface NavbarProps {
    date?: string;
    shiftName?: string;
    shiftTime?: string;
    userName?: string;
    userAvatarUrl?: string;
    hasNotification?: boolean;
  }
  
  const DashboardNavbar: React.FC<NavbarProps> = ({
    date,
    shiftName,
    shiftTime,
    userName,
    userAvatarUrl,
    hasNotification,
  }) => {
    return (
      <div className="w-full bg-white px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Attendance
            </span>
            <div className="flex items-center gap-3">
              <span className="text-slate-800 font-bold text-lg leading-none group-hover:text-blue-600 transition-colors">
                {date}
              </span>
              <Calendar className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" strokeWidth={2} />
            </div>
          </div>
  
          <div className="h-10 w-px bg-slate-200 mx-2 hidden md:block"></div>
  
          <div className="flex flex-col gap-1 cursor-pointer group">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              {shiftName}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-800 font-bold text-lg leading-none group-hover:text-blue-600 transition-colors">
                {shiftTime}
              </span>
              <Check className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" strokeWidth={2} />
            </div>
          </div>
        </div>
  
        <div className="flex items-center gap-6 md:gap-8 ml-auto md:ml-0">
          <button className="relative p-1 hover:bg-slate-50 rounded-full transition-colors group">
            <BellRing className="w-6 h-6 text-slate-600 group-hover:text-slate-800" strokeWidth={2} />
            {hasNotification && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            )}
          </button>
  
          <div className="flex items-center gap-3 pl-4 pr-1 py-1 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full cursor-pointer">
            <span className="text-sm font-semibold text-slate-700">{userName}</span>
            <img
              src={userAvatarUrl}
              alt={userName}
              className="w-9 h-9 rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>
      </div>
    );
  };
  
  // --- Small helper row for recent attendance ---
  function statusBadgeClasses(status: string) {
    switch (status) {
      case "present":
        return "bg-emerald-50 text-emerald-600";
      case "late":
        return "bg-amber-50 text-amber-600";
      case "half-day":
        return "bg-indigo-50 text-indigo-600";
      case "absent":
        return "bg-rose-50 text-rose-600";
      default:
        return "bg-slate-50 text-slate-500";
    }
  }
  
  interface RecentAttendanceRowProps {
    record: AttendanceRecord;
  }
  
  const RecentAttendanceRow: React.FC<RecentAttendanceRowProps> = ({ record }) => {
    const dateLabel = new Date(record.date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      weekday: "short",
    });
  
    return (
      <div className="flex items-center justify-between py-2 text-xs">
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{dateLabel}</span>
          <span className="text-[11px] text-slate-400">
            {record.checkInTime
              ? `In: ${new Date(record.checkInTime).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "No check-in"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500">
            {record.totalHours ? `${record.totalHours.toFixed(2)} h` : "--"}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBadgeClasses(
              record.status
            )}`}
          >
            {record.status}
          </span>
        </div>
      </div>
    );
  };
  
  // X icon without importing again from lucide-react (small helper)
  const XIcon = (props: React.ComponentProps<typeof CheckCircle>) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
  