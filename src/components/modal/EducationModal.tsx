import React, {useState} from 'react';
import Modal from "react-modal"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const EducationModal = ({ educationModalOpen, setEducationModalOpen }) => {
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

    function closeModal() {
        setEducationModalOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            college: e.target.college.value,
            degree: e.target.degree.value,
            about: e.target.about.value,
            start: e.target.start.value,
            end: e.target.end.value
        }
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
                    <FontAwesomeIcon icon={faTimes} className="w-[20px] h-[20px] " />
                </button>
                <form action="#" className="mt-[10px]" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                      <label htmlFor="college" className="font-medium text-sm">College</label>
                      <input className="border rounded-md p-2 mt-[12px]" type="text" name="college" placeholder="college"/>
                  </div>
                    <div className="flex flex-col mt-[10px]">
                      <label htmlFor="degree" className="font-medium text-sm">Degree</label>
                      <input className="border rounded-md p-2 mt-[12px]" type="text" name="degree" placeholder="degree"/>
                  </div>
                    <div className="flex flex-col mt-[10px]">
                        <label htmlFor="start" className="font-medium text-sm">Start</label>
                        <input className="border rounded-md p-2 mt-[12px]" type="date" name="start" placeholder="start"/>
                    </div>
                    <div className="flex flex-col mt-[10px]">
                        <label htmlFor="end" className="font-medium text-sm">End</label>
                        <input className="border rounded-md p-2 mt-[12px]" type="date" name="end" placeholder="end" />
                    </div>

                    <textarea className="border rounded-md p-2 mt-[12px] w-full" name="about" id="about" cols="30" rows="6" placeholder="about"></textarea>

                    <input type="submit" value="submit" className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md w-full"/>

                </form>
            </Modal>
        </>
    );
};

export default EducationModal;