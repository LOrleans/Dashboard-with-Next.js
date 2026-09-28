import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className='flex h-screen p-4 gap-4 bg-gray-100'>
      <Sidebar />
      <main className='flex-1'>
        {children}
      </main>
    </div>
  )
}