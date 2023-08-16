import React, {useEffect, useState} from 'react';
import Modal from "react-modal"
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {toast} from "react-toastify";
import {updateEducation} from "@/feature/educationSlice";

const EducationModal = ({educationModalOpen, setEducationModalOpen, setRender, render}) => {
    const dispatch = useDispatch<AppDispatch>()
    const educationData = useSelector((state: RootState) => state.education.data);
    const educationSuccess = useSelector((state: RootState) => state.education.success);
    const educationUpdate = useSelector((state: RootState) => state.education.updateData);
    const userData = useSelector((state: RootState) => state.user.data);
    const [educationInput, setEducationInput]: any = useState([]);

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
        if (educationData && educationData.data && educationInput.length <= 2) {
            const newData = educationData.data.map(item => ({
                college: item.college,
                degree: item.degree,
                about: item.about,
                start: item.start,
                end: item.end,
                id: item._id
            }));

            setEducationInput(newData);
        }

    }, [educationData]);


    const handleInput = (e, index) => {
        e.preventDefault();
        const {name, value} = e.target;
        const inputsData = [...educationInput];

        if (index >= 0 && index < inputsData.length) {
            inputsData[index][name] = value;
            setEducationInput(inputsData);
        }
    }

    const addEducationComponentHandle = () => {
        if (educationInput.length >= 2) {
            toast.error(`You can't add more than 2`)
        } else {
            setEducationInput([...educationInput, {college: "", degree: "", about: "", start: "", end: ""}]);
        }
    }

    function closeModal() {
        setEducationModalOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = educationInput.map((education) => {
            if (education.id) {
                return {
                    id: education.id,
                    item: {
                        college: education.college,
                        degree: education.degree,
                        about: education.about,
                        start: education.start,
                        end: education.end,
                        user: userData.data._id
                    }
                }
            } else {
                return {
                    id: "",
                    item: {
                        college: education.college,
                        degree: education.degree,
                        about: education.about,
                        start: education.start,
                        end: education.end,
                        user: userData.data._id
                    }
                }
            }
        });

        dispatch(updateEducation(data));


        console.log(educationUpdate.message);
        setRender(!render)
        setEducationModalOpen(false);
        toast.success(('Education updated'))

    }

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={educationModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className="absolute top-[10px] right-[10px]" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} className="w-[20px] h-[20px] "/>
                </button>
                <div>
                    {educationInput.map((item, idx) => {
                        return (
                            <form key={idx} id="education" action="#" className="my-[20px] border p-3"
                                  onSubmit={handleSubmit}>
                                <div className="flex items-center gap-[15px]">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="college" className="font-medium text-sm">College</label>
                                        <input value={item.college} onChange={(e) => handleInput(e, idx)}
                                               className="border rounded-md p-2 mt-[12px]" type="text" name="college"
                                               placeholder="college"/>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="degree" className="font-medium text-sm">Degree</label>
                                        <input value={item.degree} onChange={(e) => handleInput(e, idx)}
                                               className="border rounded-md p-2 mt-[12px]" type="text" name="degree"
                                               placeholder="degree"/>
                                    </div>
                                </div>
                                <div className="flex items-center mt-[10px] gap-[15px] w-full">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="start" className="font-medium text-sm">Start</label>
                                        <input value={item.start} onChange={(e) => handleInput(e, idx)}
                                               className="border rounded-md p-2 mt-[12px] w-full" type="date"
                                               name="start" placeholder="start"/>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="end" className="font-medium text-sm">End</label>
                                        <input value={item.end} onChange={(e) => handleInput(e, idx)}
                                               className="border rounded-md p-2 mt-[12px] w-full" type="date" name="end"
                                               placeholder="end"/>
                                    </div>
                                </div>

                                <textarea value={item.about} onChange={(e) => handleInput(e, idx)}
                                          className="border rounded-md p-2 mt-[12px] w-full" name="about" id="about"
                                          cols="30" rows="6" placeholder="about"></textarea>


                            </form>
                        )
                    })}
                </div>

                <input form="education" type="submit" value="submit"
                       className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md w-full cursor-pointer"/>

            </Modal>
        </>
    );
};

export default EducationModal;