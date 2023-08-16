'use client'
import React, {useEffect, useState} from 'react';
import NameModal from "@/components/modal/NameModal";
import EmailModal from "@/components/modal/EmailModal";
import PhoneModal from "@/components/modal/PhoneModal";
import AboutModal from "@/components/modal/AboutModal";
import SkillModal from "@/components/modal/SkillModal";
import CertificationModal from "@/components/modal/CertificationModal";
import ExperienceModal from "@/components/modal/ExperienceModal";
import EducationModal from "@/components/modal/EducationModal";

import { useDispatch, useSelector } from 'react-redux';
import {redirect, useRouter} from "next/navigation";
import axios from "axios";
import {AppDispatch, RootState} from "@/feature/store";
import {fetchUser} from "@/feature/userSlice";
import Certification from "@/components/profile/Certification";
import Experience from "@/components/profile/Experience";
import Education from "@/components/profile/Education";
import Skill from "@/components/profile/Skill";

const Profile = () => {
    const router:any = useRouter();
    const [nameModalOpen, setNameModalOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [phoneModalOpen, setPhoneModalOpen] = useState(false);
    const [aboutModalOpen, setAboutModalOpen] = useState(false);
    // const [userData, setUserData]: any = useState({});
    const [render, setRender]: any = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: RootState) => state.user.data);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if(token === null || token === "") {
           redirect('/login')
        }
    }, [])

    useEffect(() => {
      dispatch(fetchUser())
    }, [dispatch, render]);

    return (
        <div className="h-[calc(100vh-100px)] m-[10px] md:m-[40px]">
            <div className="h-[200px] bg-[#1E2875] w-full mx-auto rounded-xl p-[10px] md:p-[40px] relative ">
                <p className="uppercase text-[16.667px]  text-white">My Profile</p>
                <div className="abosulote mt-[40px] md:mt-[40px] md:shadow-lg w-full bg-white rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-[10px] md:p-[26.67px]">
                            <div className="flex justify-between items-center">
                                <div
                                    className="bg-[#FFA78D] w-[100.889px] h-[100.889px] rounded-full flex justify-center items-center overflow-hidden">
                                    <img className="w-[90.889px] h-[90.889px] mt-[10px]" src="/user.png" alt=""/>
                                </div>
                                <button
                                    className="bg-[#F0EFFA] px-[14.22px] py-[4.44px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Upload
                                    Photo
                                </button>
                            </div>
                            <div
                                className="mt-[21.19px] border border-black border-opacity-20 rounded-lg shadow p-[16px]">
                                <div>
                                    <label className="font-medium text-stone-900 text-opacity-70 text-sm">Your
                                        Name</label>
                                    <div className="flex justify-between items-center mt-[5.33px]">
                                        <p className="font-medium text-sm md:text-[17px]">{userData?.data?.firstName} {userData?.data?.lastName}</p>
                                        <button
                                            onClick={() => setNameModalOpen(true)}
                                            className="bg-[#F0EFFA] px-[12px] md:px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                                        </button>
                                    </div>
                                    <NameModal setNameModalOpen={setNameModalOpen} nameModalOpen={nameModalOpen} render={render} setRender={setRender} />
                                </div>
                                <div className="mt-[22.22px]">
                                    <label className="font-medium text-stone-900 text-opacity-70 text-sm">Email</label>
                                    <div className="flex justify-between items-center mt-[5.33px]">
                                        <p className="font-medium text-sm md:text-[17px]">{userData?.data?.email}</p>
                                        <button
                                            onClick={() => setEmailModalOpen(true)}
                                            className="bg-[#F0EFFA] px-[12px] md:px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                                        </button>
                                    </div>
                                    <EmailModal setEmailModalOpen={setEmailModalOpen} emailModalOpen={emailModalOpen} render={render} setRender={setRender}/>
                                </div>

                                <div className="mt-[22.22px]">
                                    <label className="font-medium text-stone-900 text-opacity-70 text-sm">Phone
                                        Number</label>
                                    <div className="flex justify-between items-center mt-[5.33px]">
                                        <p className="font-medium text-sm md:text-[17px]">{userData?.data?.phone ?? ''}</p>
                                        <button
                                            onClick={() => setPhoneModalOpen(true)}
                                            className="bg-[#F0EFFA] px-[12px] md:px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                                        </button>
                                    </div>
                                    <PhoneModal setPhoneModalOpen={setPhoneModalOpen} phoneModalOpen={phoneModalOpen} render={render} setRender={setRender} />
                                </div>
                            </div>
                            <div
                                className="mt-[14.22px] border border-black border-opacity-20 rounded-lg shadow p-[16px]">
                                <div>
                                    <div className="flex justify-between items-center mt-[5.33px]">
                                        <p className="text-neutral-800 text-opacity-90 text-lg font-semibold">About {userData?.data?.firstName}</p>
                                        <button
                                            onClick={() => setAboutModalOpen(true)}
                                            className="bg-[#F0EFFA] px-[12px] md:px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                                        </button>
                                    </div>
                                    <p className="text-sm font-normal text-zinc-700 text-opacity-80 mt-[11.56px]">{userData?.data?.about}</p>
                                </div>
                                <AboutModal aboutModalOpen={aboutModalOpen} setAboutModalOpen={setAboutModalOpen} render={render} setRender={setRender} />
                            </div>
                            <div
                                className="mt-[14.22px] border border-black border-opacity-20 rounded-lg shadow p-[16px]">
                              <Skill />
                            </div>
                        </div>
                        <div className="p-[10px] md:p-[26.67px]">
                            <div
                                className="mt-[14.22px] border border-black border-opacity-20 rounded-lg shadow p-[16px]">
                                <div className="flex justify-between items-center">
                                    <div className="">
                                        <label className="font-medium text-neutral-800  text-lg">Professional
                                            Details</label>
                                        <p className="font-normal text-sm mt-[6px]">This are the professional details
                                            shown to users in the app.</p>
                                    </div>
                                    <img src="/Stars.svg" className="w-[70px] h-[70px]" alt=""/>
                                </div>
                            </div>
                            <div
                                className="mt-[22px]">
                                <Certification  />
                            </div>

                            <div
                                className="mt-[22px]">
                                <Experience />
                            </div>

                            <div
                                className="mt-[22px]">
                              <Education />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;