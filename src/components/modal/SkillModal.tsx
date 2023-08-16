import React, {useEffect, useState} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Modal from "react-modal"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/feature/store";
import {updateSkill} from "@/feature/skillSlice";
import {toast} from "react-toastify";
const SkillModal = ({ skillModalOpen, setSkillModalOpen, render, setRender }) => {
    const dispatch = useDispatch<AppDispatch>()
    const skillData = useSelector((state: RootState) => state.skill.data);
    const skillSuccess = useSelector((state: RootState) => state.skill.success);
    const skillUpdate = useSelector((state: RootState) => state.skill.updateData);
    const userData = useSelector((state: RootState) => state.user.data);
    const [skillInput, seSkillInput]: any = useState([]);

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
        if (skillData && skillData.data && skillInput.length <= 2) {
            const newData = skillData.data.map(item => ({
                name: item.name,
            }));

            seSkillInput(newData);
        }

    }, [skillData]);


    const handleInput = (e, index) => {
        e.preventDefault();
        const {name, value} = e.target;
        const inputsData = [...skillInput];

        if (index >= 0 && index < inputsData.length) {
            inputsData[index][name] = value;
            seSkillInput(inputsData);
        }
    }

    const addSkillComponentHandle = () => {
        if (skillInput.length >= 2) {
            toast.error(`You can't add more than 2`)
        } else {
            seSkillInput([...skillInput, {name: ""}]);
        }
    }
    function closeModal() {
        setSkillModalOpen(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = skillInput.map((skill) => {
            if (skill.id) {
                return {
                    id: skill.id,
                    item: {
                        name: skill.name,
                    }
                }
            } else {
                return {
                    id: "",
                    item: {
                        name: skill.name,
                        user: userData.data._id
                    }
                }
            }
        });

       if(skillInput.length > 0) {
           dispatch(updateSkill(data));

           console.log(skillUpdate.message);
           setRender(!render)
           setSkillModalOpen(false);
           toast.success(('Skill updated'));
       }else {
           toast.error(("can't save blank data"));
       }
    }

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={skillModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className="absolute top-[10px] right-[10px]" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} className="w-[20px] h-[20px] " />
                </button>
                <div>
                    {skillInput.map((item, idx) =>{
                        return (
                            <form key={idx} id="skill" action="#" className="mt-[10px]" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <label htmlFor="skill" className="font-medium text-sm">Skill</label>
                                    <input value={item.name} onChange={(e) => handleInput(e, idx)}
                                           className="border rounded-md p-2 mt-[12px]" type="text" name="name"
                                           placeholder="name"/>
                                </div>
                            </form>
                        )
                    })}
                </div>
                <div className="text-center">
                    <button onClick={addSkillComponentHandle}
                            className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md">Add
                    </button>
                </div>
                <input form="skill" type="submit" value="submit" className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md cursor-pointer" />
            </Modal>
        </>
    );
};

export default SkillModal;