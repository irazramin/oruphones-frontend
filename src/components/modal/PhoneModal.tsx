import React, {useEffect, useState} from 'react';
import Modal from "react-modal"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";
import {RootState} from "@/feature/store";
import axios from "axios";
import {set} from "zod";
const PhoneModal = ({ phoneModalOpen, setPhoneModalOpen, render, setRender }) => {
    const userData = useSelector((state: RootState) => state.user.data);

    const [phone, setPhone]: any = useState(userData?.data?.phone);
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
        setPhone(userData?.data?.phone);
    }, [userData]);

    function closeModal() {
        setPhoneModalOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            phone: phone
        }
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/user/${userData?.data?._id}`, data);
            console.log(response)
            if(response.status === 201) {
                setPhoneModalOpen(false);
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
                isOpen={phoneModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className="absolute top-[10px] right-[10px]" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} className="w-[20px] h-[20px] " />
                </button>
                <form action="#" className="mt-[10px]" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                      <label htmlFor="phone" className="font-medium text-sm">Phone</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-md p-2 mt-[12px]" type="text" name="phone" placeholder="phone"/>
                      <input type="submit" value="submit" className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md"/>
                  </div>
                </form>
            </Modal>
        </>
    );
};

export default PhoneModal;