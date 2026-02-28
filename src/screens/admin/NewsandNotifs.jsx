import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import {
    createOrUpdateBanner,
    deleteBanner,
    getAllBanners,
} from "../../api/admin-api";
import { Button2 } from "../../components/ui/Buttons";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const NewsandNotifs = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        title: "",
        description: "",
        banner: null,
    });

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const res = await getAllBanners();
            setBanners(res.data);
        } catch (err) {
            console.error("Failed to load banners:", err);
        }
    };

    // 🔹 Cloudinary Config
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
    const IMAGE_PRESET = import.meta.env.VITE_CLOUDINARY_IMAGE_PRESET;
    const IMAGE_FOLDER = import.meta.env.VITE_CLOUDINARY_IMAGE_FOLDER;

    // 🔹 Upload Image to Cloudinary
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", IMAGE_PRESET);
        formData.append("folder", IMAGE_FOLDER);
        const response = await fetch(
            `${BASE_URL}/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
        );
        const data = await response.json();
        if (!data?.secure_url || !data?.public_id) {
            throw new Error("Upload failed");
        }
        return {
            imageUrl: data.secure_url,
            publicId: data.public_id,
        };
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            setLoading(true);
            const { imageUrl, publicId } = await uploadToCloudinary(payload.banner);
            const dataToSend = {
                title: payload.title,
                description: payload.description,
                url: imageUrl,
                publicId,
            };
            await createOrUpdateBanner(dataToSend);
            SwalSuccess.fire({
                title: "Success",
                text: "Banner created successfully.",
                timer: 2000,
            });
            setPayload({ title: "", description: "", banner: null });
            fetchBanners();
        } catch (err) {
            SwalError.fire({
                title: "Error",
                text: err?.message || "Upload failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!payload.title.trim()) {
            SwalError.fire({ title: "Error", text: "Title is required." });
            return false;
        }
        if (!payload.banner) {
            SwalError.fire({ title: "Error", text: "Image is required." });
            return false;
        }
        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPayload({ ...payload, banner: file });
        }
    };

    const serialNumberTemplate = (_, { rowIndex }) => rowIndex + 1;

    const deleteActionHandler = (rowData) => (
        <button
            onClick={async () => {
                await deleteBanner(rowData._id);
                SwalSuccess.fire({
                    title: "Deleted",
                    text: "Banner deleted successfully.",
                    timer: 2000,
                }).then(fetchBanners);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
        >
            <MdDeleteForever size={20} /> Delete
        </button>
    );

    return (
        <>
            {loading && <PageLoader />}

            <div className="min-h-screen mt-5 px-4 md:px-8 text-white">
                <h1 className="text-3xl font-bold mb-8 tracking-wide">
                    News & Notification Banners
                </h1>

                {/* Create Banner */}
                <div className="bg-[#1c1d22] border !border-gray-600 max-w-5xl mx-auto rounded-2xl p-8 shadow-xl mb-12">
                    <h2 className="text-4xl text-center font-semibold mb-6">
                        Create New Banner
                    </h2>

                    <div className="flex flex-col gap-6 text-xl">
                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-300 font-medium">Title</label>
                            <input
                                type="text"
                                placeholder="Enter banner title"
                                className="bg-[#1c1d22] border !border-gray-700 px-4 py-3 rounded-lg"
                                value={payload.title}
                                onChange={(e) =>
                                    setPayload({ ...payload, title: e.target.value })
                                }
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-300 font-medium">
                                Description
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Enter banner description"
                                className="bg-[#1c1d22] border !border-gray-700 px-4 py-3 rounded-lg resize-none"
                                value={payload.description}
                                onChange={(e) =>
                                    setPayload({ ...payload, description: e.target.value })
                                }
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-gray-300 font-medium">Image</label>
                            <input
                                type="file"
                                className="bg-[#1c1d22] border !border-gray-700 px-4 py-3 rounded-lg text-gray-300"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button2 name="Create Banner" onClick={handleSubmit} />
                    </div>

                    {payload.banner && (
                        <div className="mt-8">
                            <p className="text-gray-400 text-lg mb-3">Preview</p>
                            <img
                                src={URL.createObjectURL(payload.banner)}
                                alt="Preview"
                                className="w-full max-w-sm h-44 object-cover rounded-xl border !border-gray-700"
                            />
                        </div>
                    )}
                </div>

                {/* Banner Table */}
                <div className="bg-[#1c1d22] border !border-gray-600 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6">
                        Uploaded Banners
                    </h2>

                    <DataTable
                        value={banners}
                        paginator
                        rows={10}
                        stripedRows
                        responsiveLayout="scroll"
                    >
                        <Column body={serialNumberTemplate} header="S.No" />
                        <Column field="title" header="Title" />
                        <Column field="description" header="Description" />
                        <Column
                            header="Image"
                            body={(rowData) => (
                                <img
                                    src={rowData.imageUrl}
                                    alt={rowData.title}
                                    className="w-36 h-20 object-cover rounded-lg"
                                />
                            )}
                        />
                        <Column header="Action" body={deleteActionHandler} />
                    </DataTable>
                </div>

            </div>
        </>
    );
};

export default NewsandNotifs;
