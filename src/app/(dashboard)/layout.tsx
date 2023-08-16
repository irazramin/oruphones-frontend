'use client'
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import {useState} from "react";
import {Provider} from "react-redux";
import {store} from "@/feature/store";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
            <div className='text-black bg-[#FAFBFF]'>
                <div className="flex relative">
                    <Provider store={store} >
                        <div>
                            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                        </div>

                        <div
                            className={`w-[calc(100vh-300px)] md:ml-[300px] transition-all grow duration-150 overflow-x-hidden bg-[#F1F2F5] w-full `}>
                            <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                            <section> {children} </section>
                        </div>
                    </Provider>
                </div>
            </div>
    )
}
