import React, {useState} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Modal from "react-modal"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './style.css'
const SkillModal = ({ skillModalOpen, setSkillModalOpen }) => {
    const [tags, setTags] = React.useState([
        { id: 'Thailand', text: 'Thailand' },
        { id: 'India', text: 'India' },
        { id: 'Vietnam', text: 'Vietnam' },
        { id: 'Turkey', text: 'Turkey' }
    ]);

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
        setSkillModalOpen(false);
    }

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
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
                <form action="#" className="mt-[10px]">
                  <div className="flex flex-col">
                      <label htmlFor="skill" className="font-medium text-sm">Skill</label>
                      <ReactTags
                          tags={tags}
                          handleDelete={handleDelete}
                          handleAddition={handleAddition}
                          handleTagClick={handleTagClick}
                          inputFieldPosition="bottom"
                          autocomplete
                      />
                      <input type="submit" value="submit" className="bg-[#BAB6EB] mt-[15px] p-2 font-medium text-sm rounded-md"/>
                  </div>
                </form>
            </Modal>
        </>
    );
};

export default SkillModal;