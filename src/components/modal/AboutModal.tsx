import React, {useEffect, useState} from 'react';
import Modal from "react-modal"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useUser from "@/hooks/useUser";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
const AboutModal = ({ aboutModalOpen, setAboutModalOpen, render, setRender }) => {
    const userData = useSelector((state: RootState) => state.user.data);

    const [about, setAbout]: any = useState(userData?.data?.about);

    const customStyles: any = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    useEffect((): any => {
        setAbout(userData?.data?.about);
    }, [userData]);

    function closeModal(): any {
        setAboutModalOpen(false);
    }

    const handleSubmit = async (e): any => {
        e.preventDefault();
        const data: any = {
            about: about
        }
        try {
            const response: any = await axios.put(`http://localhost:4000/api/v1/user/${userData?.data?._id}`, data);
            if(response.status === 201) {
                setAboutModalOpen(false);
                setRender(!render)
            }
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={aboutModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className="absolute top-[10px] right-[10px]" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} className="w-[20px] h-[20px] " />
                </button>
                <form action="#" className="mt-[10px]" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                      <label htmlFor="about" className="font-medium text-sm">About</label>
                      <textarea value={about} onChange={(e: any) => setAbout(e.target.value)} className="border rounded-md p-2 mt-[12px]" name="about" id="about" cols="30" rows="6" placeholder="about"></textarea>
                      <input type="submit" value="submit" className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md"/>
                  </div>
                </form>
            </Modal>
        </>
    );
};

export default AboutModal;