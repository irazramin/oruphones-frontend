'use client'
import React, {useState} from 'react';
import SkillModal from "@/components/modal/SkillModal";

const Skill = () => {
    const [skillModalOpen, setSkillModalOpen] = useState(false);

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
            <SkillModal setSkillModalOpen={setSkillModalOpen} skillModalOpen={skillModalOpen} />
        </div>
    );
};

export default Skill;