"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faChevronDown} from "@fortawesome/free-solid-svg-icons"
import {useState} from "react";
import useUser from "@/hooks/useUser";
import {useSelector} from "react-redux";
import {RootState} from "@/feature/store";

export default function Topbar({ sidebarOpen, setSidebarOpen }) {
    const userData = useSelector((state: RootState) => state.user.data);

    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }
    return (
        <nav
            className='bg-white min-h-[60px] w-full relative shadow flex items-center justify-end px-[20px] md:px-[44px] py-[16px] '>
           <button className="absolute left-[10px] block md:hidden" onClick={handleSidebar}>
               <img className="w-[35px] h-[35px] object-cover"  src="/menu.svg" alt=""/>
           </button>
            <div className="flex gap-[16.38px] items-center">
                <FontAwesomeIcon icon={faBell} className='text-[#1A1558] text-[20px] w-[20px] h-[20px]'/>
                <div className="bg-[#FFA78D] w-[33.988px] h-[33.988px] rounded-full overflow-hidden block md:hidden">
                    <img className="w-[28.988px] h-[28.988px]" src="/user.png" alt=""/>
                </div>
                <div
                    className="p-[10.24px]  md:flex items-center justify-between gap-[10.24px] border-2 shadow-sm rounded-lg cursor-pointer hidden">
                    <img className="w-[33.988px] h-[33.988px]" src="/user.png" alt=""/>
                    <div className="mr-[30px]">
                        <p className="text-[14px] font-medium text-[#373B5C]">Welcome back,</p>
                        <h3 className="text-[16px] text-[#373B5C] font-medium">{userData?.data?.firstName} {userData?.data?.lastName}</h3>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} className='text-[#1A1558] text-[14px] w-[20px] h-[20px]' />
                </div>
            </div>
        </nav>
    )
}