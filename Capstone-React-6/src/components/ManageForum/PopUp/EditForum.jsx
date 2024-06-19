import React, { useState } from 'react';

const EditForum = ({ forum, onClose, onUpdateForum }) => {
    const [editedForum, setEditedForum] = useState({
        image: forum.image_url,
        title: forum.name,
        description: forum.description,
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedForum({ ...editedForum, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedForum({ ...editedForum, [name]: value });
    };

    const handleUpdate = () => {
        onUpdateForum(editedForum);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-end items-center mb-1 px-3">
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                        x
                    </button>
                </div>
                <div className="mb-4 px-4">
                    <div className="relative border-dashed border-2 border-dark-3 rounded-lg h-40 flex justify-center items-center">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                        ) : (
                            <div className="flex justify-center items-center">
                                <label htmlFor="fileUpload" className="cursor-pointer">
                                    <img src="/Forum/addphoto.svg" alt="Camera" className="h-10 w-10" />
                                    <input
                                        id="fileUpload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-4 px-4">
                    <label htmlFor="titleInput" className="block text-sm font-medium text-dark-1 mb-1">Nama Forum</label>
                    <input
                        type="text"
                        id="titleInput"
                        name="title"
                        value={editedForum.title}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nama Forum"
                        className="py-2 px-3 text-sm border border-gray-300 rounded-lg w-full"
                    />
                </div>
                <div className="mb-6 px-4">
                    <label htmlFor="descriptionInput" className="block text-sm font-semibold text-dark-1 mb-1">Deskripsi Forum</label>
                    <textarea
                        id="descriptionInput"
                        name="description"
                        value={editedForum.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Deskripsi Forum"
                        className="py-2 px-3 text-sm border border-gray-300 rounded-lg w-full resize-none"
                    />
                </div>
                <div className="flex justify-center px-4 mb-6">
                    <button onClick={handleUpdate} className="w-full py-2 bg-primary text-sm text-white rounded-lg hover:bg-primary-darker">
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditForum;
