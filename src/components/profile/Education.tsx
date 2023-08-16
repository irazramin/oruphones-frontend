'use client'
import React, {useState} from 'react';
import EducationModal from "@/components/modal/EducationModal";

const Education = () => {
    const [educationModalOpen, setEducationModalOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mt-[5.33px]">
                <p className="font-medium text-lg">Education</p>
                <button
                    onClick={() => setEducationModalOpen(true)}
                    className="bg-[#F0EFFA] px-[12px] md:px-[18.11px] rounded-2xl text-[15px] font-medium active:scale-[.98] duration-300">Edit
                </button>
            </div>

            <div
                className="relative bg-white border border-black border-opacity-20 rounded-lg shadow p-[16px] my-[12px]">
                <div className="w-full">
                    <h3 className="uppercase text-[#413B89] text-lg font-semibold">IIT
                        HYDERABAD</h3>
                    <div
                        className="text-sm font-medium flex items-center justify-between mt-[10px]">
                        <p>(2010-2014)</p>
                        <p>Btech</p>
                    </div>
                    <p className="mt-[10px] text-sm text-[#49454FCC]">Lorem ipsum dolor sit amet
                        consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque
                        mauris ac arcu elit ipsum dolor sit amet consectetur.</p>
                </div>
            </div>
            <EducationModal educationModalOpen={educationModalOpen} setEducationModalOpen={setEducationModalOpen} />
        </div>
    );
};

export default Education;