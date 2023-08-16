import Image from 'next/image'
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import Login from "@/app/login/page";

export default function Home() {
  return (
      <main className="bg-[#F1F2F5]">
         <Login />
      </main>
  )
}
