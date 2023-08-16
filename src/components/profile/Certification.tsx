'use client'
import React, {useEffect, useState} from 'react';
import CertificationModal from "@/components/modal/CertificationModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {fetchCertificate} from "@/feature/certificationSlice";
const Certification = () => {
    const dispatch = useDispatch<AppDispatch>();
    const certificateDate = useSelector((state: RootState) => state.certification.data);
    const userData = useSelector((state: RootState) => state.user.data);
    const [render, setRender]: any = useState(false)

    const [certificationModalOpen, setCertificationModalOpen] = useState(false);

    useEffect(() => {
        if(userData?.data?._id) {
            dispatch(fetchCertificate(userData?.data?._id));
        }
    }, [userData?.data?._id, render])

    return (
        <div>
            <div className="flex justify-between items-center mt-[5.33px]">
                <p className="font-medium text-lg">Certifications</p>
                <button
                    onClick={() => setCertificationModalOpen(true)}
                    className="bg-[#F0EFFA] px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                </button>
            </div>

            {certificateDate?.data?.map(item => {
                return (
                    <div
                        key={item._id}
                        className="relative bg-white rounded-[26.67px] border border-stone-300 mt-[12px] flex items-center justify-around">
                        <img src="/certificate.svg" className="w-[43px] h-[44px]" alt=""/>
                        <div className="text-center mt-[7px]">
                            <p className="4px">{item.certification}</p>
                            <p className="my-[7px]">{item.institude}</p>
                        </div>
                        <div>
                        </div>
                    </div>
                )
            })}
            <CertificationModal setCertificationModalOpen={setCertificationModalOpen} certificationModalOpen={certificationModalOpen} render={render} setRender={setRender} />
        </div>
    );
};

export default Certification;