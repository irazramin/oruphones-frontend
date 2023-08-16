'use client'
import React, {useEffect, useState} from 'react';
import ExperienceModal from "@/components/modal/ExperienceModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {fetchCertificate} from "@/feature/certificationSlice";
import {fetchExperience} from "@/feature/experienceSlice";

const Experience = () => {
    const dispatch = useDispatch<AppDispatch>();
    const experienceDate = useSelector((state: RootState) => state.experience.data);
    const [experienceModalOpen, setExperienceModalOpen] = useState(false);
    const userData = useSelector((state: RootState) => state.user.data);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if(userData?.data?._id) {
            dispatch(fetchExperience(userData?.data?._id));
        }
    }, [userData?.data?._id, render])

    return (
        <div>
            <div className="flex justify-between items-center mt-[5.33px]">
                <p className="font-medium text-lg">Experience</p>
                <button
                    onClick={() => setExperienceModalOpen(true)}
                    className="bg-[#F0EFFA] px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                </button>
            </div>

            {experienceDate?.data?.map(item => {
                return (
                    <div
                        key={item._id}
                        className="relative bg-white border border-black border-opacity-20 rounded-lg shadow p-[16px] my-[12px]">
                        <div
                            className="flex justify-between items-center w-full gap-[10px] flex-col md:flex-row">
                            <div className="w-full md:w-[60%] order-2 md:order-1 mt-[10px] md:mt-0">
                                <div className="flex justify-between">
                                    <h4>{new Date(item.end).getFullYear() - new Date(item.start).getFullYear()} years ({new Date(item.start).getFullYear()}-{new Date(item.end).getFullYear()})</h4>
                                    <h4>{item.jobType}</h4>
                                </div>
                                <div className="flex justify-between text-[#49454FCC] text-[15px]">
                                    <h4>{item.company}</h4>
                                    <h4>-- {item.position}</h4>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <img className="w-full object-cover" src="/logo.svg" alt=""/>
                            </div>
                        </div>
                    </div>
                )
            })}
            <ExperienceModal experienceModalOpen={experienceModalOpen} setExperienceModalOpen={setExperienceModalOpen} render={render} setRender={setRender} />
        </div>
    );
};

export default Experience;