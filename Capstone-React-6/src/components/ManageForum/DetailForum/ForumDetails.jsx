import React, { useState } from 'react';
import MemberList from './MemberList';
import EditForum from '../PopUp/EditForum';
import DeleteForum from '../PopUp/DeleteForum'; 
import axios from 'axios';

const ForumDetails = ({ forum, setShowDetails }) => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false); 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTkwNTU1OTEsInJvbGUiOiJ1c2VyIiwidXNlcklkIjoxMn0.x0Wp6nzrnOvOTEXsvlr_RLhE2t-vJnVqeKhlzDcxGbM'; 

    const handleEditClick = () => {
        setShowEditPopup(true);
    };

    const handleCloseEditPopup = () => {
        setShowEditPopup(false);
    };

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    };

    const handleCloseDeletePopup = () => {
        setShowDeletePopup(false);
    };

    const handleUpdateForum = async (updatedForum) => {
        try {
            const response = await axios.put(`https://dev-capstone.practiceproject.tech/v1/doctors/forums/${forum.forum_id}`, updatedForum, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Forum updated:', response.data);
            setShowEditPopup(false);
            setShowDetails(false);
        } catch (error) {
            console.error('Error updating forum:', error);
        }
    };

    const handleDeleteForum = async () => {
        try {
            const response = await axios.delete(`https://dev-capstone.practiceproject.tech/v1/doctors/forums/${forum.forum_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Forum deleted:', response.data);
            setShowDeletePopup(false);
            setShowDetails(false);
        } catch (error) {
            console.error('Error deleting forum:', error);
        }
    };

    return (
        <div>
            <div className="mb-5 flex items-center pb-2 border-b-2 pl-2 pr-6">
                <img src={`/Forum/${forum.image}`} alt={forum.name} onClick={() => setShowDetails(false)} className="h-32 w-32 mr-4" />
                <div>
                    <h2 className="text-xl mb-2 font-semibold">{forum.name}</h2>
                    <p className="text-sm text-gray-500">{forum.description}</p>
                    <div className="flex gap-6 justify-center mb-3">
                        <button onClick={handleEditClick} className="py-2 px-6 rounded-lg border border-primary flex justify-center text-center mt-4 hover:bg-gray-200">
                            <img src="/Forum/edit1.svg" alt="" />
                            <span className="ml-2 text-primary text-sm font-medium">Edit</span>
                        </button>
                        <button onClick={handleDeleteClick} className="py-2 px-6 rounded-lg border border-error flex justify-center text-center mt-4 hover:bg-gray-200">
                            <img src="/Forum/delete.svg" alt="" />
                            <span className="ml-2 text-error text-sm font-medium">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
            <MemberList forumId={forum.forum_id} />

            {/* Tampilkan popup EditForum */}
            {showEditPopup && (
                <EditForum
                    forum={forum}
                    onClose={handleCloseEditPopup}
                    onUpdateForum={handleUpdateForum}
                />
            )}

            {/* Tampilkan popup DeleteForum */}
            {showDeletePopup && (
                <DeleteForum
                    forum={forum}
                    onClose={handleCloseDeletePopup}
                    onDeleteForum={handleDeleteForum}
                />
            )}
        </div>
    );
};

export default ForumDetails;
