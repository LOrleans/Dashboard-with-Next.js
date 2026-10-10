import Sidebar from "@/app/components/Sidebar";
import MobileBottomNav from "@/app/components/MobileBottomNav"
import MobileTopBar from "@/app/components/MobileTopBar";

export default function DashboardLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100'>
      {/* Sidebar do Desktop */}
      <Sidebar />

      {/* Mobile Bar */}
      <MobileTopBar />
      <main className='flex-1 overflow-y-auto w-full pt-16 pb-4 px-4 md:pt-4 md:pb-4 md:px-8'>
        {children}
      </main>
      <MobileBottomNav />
    </div>
  )
}