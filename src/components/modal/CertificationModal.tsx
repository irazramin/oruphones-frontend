import React, {useEffect, useState} from 'react';
import Modal from "react-modal"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {toast} from "react-toastify";
import {updateCertificate} from "@/feature/certificationSlice";
const CertificationModal = ({ certificationModalOpen, setCertificationModalOpen, render, setRender }) => {
    const dispatch = useDispatch<AppDispatch>()
    const certificateData = useSelector((state: RootState) => state.certification.data);
    const certificateSuccess = useSelector((state: RootState) => state.certification.success);
    const certificateUpdate = useSelector((state: RootState) => state.certification.updateData);
    const userData = useSelector((state: RootState) => state.user.data);
    const [certificationInput, setCertificationInput]: any = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);

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
        if (certificateData && certificateData.data && certificationInput.length <= 2) {
            const newData = certificateData.data.map(item => ({
                certification: item.certification,
                institude: item.institude,
                id: item._id
            }));

            setCertificationInput(newData);
        }
    }, [certificateData]);
    const handleInput = (e, index) => {
        e.preventDefault();
        const {name, value} = e.target;
        const inputsData = [...certificationInput];

        if (index >= 0 && index < inputsData.length) {
            inputsData[index][name] = value;
            setCertificationInput(inputsData);
        }
    }

    const addCertificationComponentHandle = () => {
        if(certificationInput.length >= 2) {
            toast.error(`You can't add more than 2` )
        }
        else {
            setCertificationInput([...certificationInput, {certification: "", institude: ""}]);

        }
    }

    function closeModal() {
        setCertificationModalOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = certificationInput.map((certificate) => {
            if(certificate.id) {
                return {
                    id: certificate.id,
                    item: {
                        certification: certificate.certification,
                        institude: certificate.institude,
                        user: userData.data._id
                    }
                }
            }else {
                return {
                    id: "",
                    item: {
                        certification: certificate.certification,
                        institude: certificate.institude,
                        user: userData.data._id
                    }
                }
            }
        });

        dispatch(updateCertificate(data));
        if(certificateSuccess && (certificateUpdate.message == 'success')) {
            console.log(certificateUpdate.message)
            setRender(!render)
            setCertificationModalOpen(false);
            toast.success(('Certification updated'))
        }
    }

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={certificationModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className="absolute top-[10px] right-[10px]" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} className="w-[20px] h-[20px] " />
                </button>

                <div className="md:w-[600px]">
                    {certificationInput?.map((item, idx) => {
                        return (
                            <div key={idx} className="z-50">
                                <form id="certificate" action="#" className="my-[20px] border p-3" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <label htmlFor="certification" className="font-medium text-sm">Name</label>
                                        <input value={item.certification} onChange={(e) => handleInput(e, idx)} className="border rounded-md p-2 mt-[12px]" type="text" name="certification" placeholder="certification"/>
                                    </div>
                                    <div className="flex flex-col mt-[10px]">
                                        <label htmlFor="institude" className="font-medium text-sm">Institute</label>
                                        <input value={item.institude} onChange={(e) => handleInput(e, idx)} className="border rounded-md p-2 mt-[12px]" type="text" name="institude" placeholder="institude"/>
                                    </div>
                                </form>
                            </div>
                        )
                    })}
                </div>
                <div className="text-center">
                    <button onClick={addCertificationComponentHandle} className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md">Add</button>
                </div>

                <input form="certificate" type="submit" value="submit" className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md w-full cursor-pointer" />

            </Modal>
        </>
    );
};

export default CertificationModal;