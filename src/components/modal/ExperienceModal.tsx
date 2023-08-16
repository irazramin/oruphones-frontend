import React, {useEffect, useState} from 'react';
import Modal from "react-modal"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {toast} from "react-toastify";
import {updateExperience} from "@/feature/experienceSlice";

const ExperienceModal = ({experienceModalOpen, setExperienceModalOpen, setRender, render}) => {
    const dispatch = useDispatch<AppDispatch>()
    const experienceData = useSelector((state: RootState) => state.experience.data);
    const experienceSuccess = useSelector((state: RootState) => state.experience.success);
    const experienceUpdate = useSelector((state: RootState) => state.experience.updateData);
    const userData = useSelector((state: RootState) => state.user.data);
    const [experienceInput, setCertificationInput]: any = useState([]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    useEffect(() => {
        if (experienceData && experienceData.data && experienceInput.length <= 2) {
            const newData = experienceData.data.map(item => ({
                company: item.company,
                position: item.position,
                jobType: item.jobType,
                start: item.start,
                end: item.end,
                id: item._id
            }));

            setCertificationInput(newData);
        }

        console.log(experienceData)
    }, [experienceData]);


    const handleInput = (e, index) => {
        e.preventDefault();
        const {name, value} = e.target;
        const inputsData = [...experienceInput];

        if (index >= 0 && index < inputsData.length) {
            inputsData[index][name] = value;
            setCertificationInput(inputsData);
        }
    }

    const addCertificationComponentHandle = () => {
        if (experienceInput.length >= 2) {
            toast.error(`You can't add more than 2`)
        } else {
            setCertificationInput([...experienceInput, {company: "", position: "", jobType: "", start: "", end: ""}]);
        }
    }

    function closeModal() {
        setExperienceModalOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = experienceInput.map((experience) => {
            if (experience.id) {
                return {
                    id: experience.id,
                    item: {
                        company: experience.company,
                        position: experience.position,
                        jobType: experience.jobType,
                        start: experience.start,
                        end: experience.end,
                        user: userData.data._id
                    }
                }
            } else {
                return {
                    id: "",
                    item: {
                        company: experience.company,
                        position: experience.position,
                        jobType: experience.jobType,
                        start: experience.start,
                        end: experience.end,
                        user: userData.data._id
                    }
                }
            }
        });

        dispatch(updateExperience(data));
        console.log(experienceUpdate)
        if (experienceSuccess && (experienceUpdate.message == 'success')) {
            console.log(experienceUpdate.message)
            setRender(!render)
            setExperienceModalOpen(false);
            toast.success(('Certification updated'))
        }
    }

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={experienceModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className="absolute top-[10px] right-[10px]" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} className="w-[20px] h-[20px] "/>
                </button>
                <div>
                    {experienceInput.map((item, idx) => {
                        return (
                            <form id="experience" action="#" className="my-[20px] border p-3"  onSubmit={handleSubmit}>
                                <div className="flex items-center gap-[15px] justify-center">
                                    <div className="flex flex-col">
                                        <label htmlFor="company" className="font-medium text-sm">Company</label>
                                        <input value={item.company} onChange={(e) => handleInput(e, idx)} className="border rounded-md p-2 mt-[12px]" type="text" name="company"
                                               placeholder="company"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="position" className="font-medium text-sm">Position</label>
                                        <input value={item.position} onChange={(e) => handleInput(e, idx)} className="border rounded-md p-2 mt-[12px]" type="text" name="position"
                                               placeholder="position"/>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-[10px]">
                                    <label htmlFor="jobType" className="font-medium text-sm">Job type</label>
                                    <input value={item.jobType} onChange={(e) => handleInput(e, idx)} className="border rounded-md p-2 mt-[12px]" type="text" name="jobType"
                                           placeholder="Full-time"/>
                                </div>
                                <div className="flex items-center gap-[15px]">
                                    <div className="flex flex-col mt-[10px] w-full">
                                        <label htmlFor="start" className="font-medium text-sm">Start</label>
                                        <input value={item.start} onChange={(e) => handleInput(e, idx)} className="border rounded-md p-2 mt-[12px] w-full" type="date" name="start"
                                               placeholder="start"/>
                                    </div>
                                    <div className="flex flex-col w-full mt-[10px]">
                                        <label htmlFor="end" className="font-medium text-sm">End</label>
                                        <input value={item.end} onChange={(e) => handleInput(e, idx)} className="border rounded-md p-2 mt-[12px] w-full" type="date" name="end"
                                               placeholder="end"/>
                                    </div>
                                </div>

                            </form>
                        )
                    })}
                </div>
                <div className="text-center">
                    <button onClick={addCertificationComponentHandle} className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md">Add</button>
                </div>
                <input form="experience" type="submit" value="submit"
                       className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md w-full cursor-pointer"/>

            </Modal>
        </>
    );
};

export default ExperienceModal;