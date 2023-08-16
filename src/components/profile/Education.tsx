'use client'
import React, {useEffect, useState} from 'react';
import EducationModal from "@/components/modal/EducationModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {fetchEducation} from "@/feature/educationSlice";

const Education = () => {
    const [educationModalOpen, setEducationModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const educationDate = useSelector((state: RootState) => state.education.data);
    const userData = useSelector((state: RootState) => state.user.data);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (userData?.data?._id) {
            dispatch(fetchEducation(userData?.data?._id));
        }
    }, [userData?.data?._id, render])

    return (
        <div>
            <div className="flex justify-between items-center mt-[5.33px]">
                <p className="font-medium text-lg">Education</p>
                <button
                    onClick={() => setEducationModalOpen(true)}
                    className="bg-[#F0EFFA] px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                </button>
            </div>

            {educationDate?.data?.map(item => {
                return (
                    <div
                        key={item._id}
                        className="relative bg-white border border-black border-opacity-20 rounded-lg shadow p-[16px] my-[12px]">
                        <div className="w-full">
                            <h3 className="uppercase text-[#413B89] text-lg font-semibold">{item.college}</h3>
                            <div
                                className="text-sm font-medium flex items-center justify-between mt-[10px]">
                                <p>({new Date(item.start).getFullYear()}-{new Date(item.end).getFullYear()})</p>
                                <p>{item.degree}</p>
                            </div>
                            <p className="mt-[10px] text-sm text-[#49454FCC]">{item.about}</p>
                        </div>
                    </div>
                )
            })}
            <EducationModal educationModalOpen={educationModalOpen} setEducationModalOpen={setEducationModalOpen} render={render} setRender={setRender}/>
        </div>
    );
};

export default Education;