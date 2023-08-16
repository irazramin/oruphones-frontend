'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const router = useRouter();
    const pathname = usePathname();
    const [logoutData, setLogoutData] = useState({})
    console.log(sidebarOpen)
    const navItems: any = [
        {
            id: 1,
            name: 'My Profile',
            path: '/profile',
            icon: `${faChevronRight}`
        },
        {
            id: 2,
            name: 'My Connections',
            path: '/connections',
            icon: `${faChevronRight}`
        }
    ]


    useEffect(() => {
        if(logoutData.status === 200) {
            localStorage.setItem('access_token', "");
            router.push('/login');
        }
    }, [logoutData]);
    const handleLogout = async () => {
        const token = JSON.parse(localStorage.getItem('access_token'));

        const response = await axios.post(`http://localhost:4000/api/v1/auth/logout`, {token});
        setLogoutData(response)
    }

    return (
        <aside
            className={`${sidebarOpen ? 'left-0' : '-left-[300px]'} w-[280px] md:w-[300px] max-w-[300px] fixed z-50 h-screen bg-white text-[#1A1558]  transition-all duration-300 top-0 md:left-0`}>
            <div>
                <p className='text-center font-bold uppercase mt-[20px] p-2 border-black border-opacity-20 rounded-lg shadow mx-[40px]'>Dashboard</p>
            </div>
            <FontAwesomeIcon onClick={() => setSidebarOpen(false)} icon={faTimes} className='text-[#1A1558] text-[16px] w-[20px] h-[20px] absolute right-[10px] top-[30px] block md:hidden' />
            <ul className='mt-[30px]'>
                {
                    navItems.map((item: any) => (
                        <Link href={item.path} key={item?.id}>
                            <li
                                className={`${pathname == item.path ? 'bg-accent' : ''} text-[20px] flex items-center gap-[20px] py-3 px-[35px] hover:bg-accent hover:text-white cursor-pointer duration-300s`}>
                                <FontAwesomeIcon icon={faChevronRight} className='text-[#1A1558] text-[16px] w-[20px] h-[20px]' />
                                <button className={`${pathname == item.path ? 'border border-[#1A1558] rounded-md' : ''}  text-[#1A1558] text-sm px-[32px] py-[11px] w-full`}>{item.name}</button>
                            </li>

                        </Link>
                    ))
                }
                <li className='flex justify-center items-end absolute bottom-[30px] text-center text-md mx-auto font-medium left-[40%] cursor-pointer' onClick={handleLogout}>Log out</li>
            </ul>
        </aside>
    )
}