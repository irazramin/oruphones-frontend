'use client'
import React, {useEffect, useState} from 'react';
import SkillModal from "@/components/modal/SkillModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {fetchSkill} from "@/feature/skillSlice";

const Skill = () => {
    const [skillModalOpen, setSkillModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const skillDate = useSelector((state: RootState) => state.skill.data);
    const userData = useSelector((state: RootState) => state.user.data);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if(userData?.data?._id) {
            dispatch(fetchSkill(userData?.data?._id));
        }
    }, [userData?.data?._id, render])

    return (
        <div>
            <div>
                <div className="flex justify-between items-center mt-[5.33px]">
                    <p className="text-neutral-800 text-opacity-90 text-lg font-semibold">Skill</p>
                    <button
                        onClick={() => setSkillModalOpen(true)}
                        className="bg-[#F0EFFA] px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                    </button>
                </div>
                <p className="text-sm font-normal text-neutral-800 mt-[19.11px]">NextJs</p>
                <p className="text-sm font-normal text-neutral-800 mt-[17.22px]">NextJs</p>
            </div>
            <SkillModal setSkillModalOpen={setSkillModalOpen} skillModalOpen={skillModalOpen} render={render} setRender={setRender}/>
        </div>
    );
};

export default Skill;