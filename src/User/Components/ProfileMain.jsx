import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { FaUpload, FaTrash } from "react-icons/fa";
import profileImgDefault from "../assets/profile.png";
import sponsorImg from "../assets/sponsor.png";

export default function ProfilePage() {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const fullname = user?.fullname || "";
  const email = user?.email || "";
  const phone = user?.phone || "";
  const state = user?.state || "";
  const packageId = sessionStorage.getItem("packageId");

  const packageNames = {
    DIGI0005: "Ultimate Package",
    DIGI0004: "Premium Package",
    DIGI0003: "Advanced Package",
    DIGI0002: "Standard Package",
    DIGI0001: "Basic Package",
  };
  const currentPlan = packageNames[packageId] || packageId;

  const [profileImg, setProfileImg] = useState(profileImgDefault);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const uploadCroppedImage = async () => {
    try {
      setUploading(true);
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);

      const formData = new FormData();
      formData.append("file", croppedBlob);

      const res = await axios.post("/api/upload-profile", formData);
      setProfileImg(res.data.imageUrl); // Update UI
      setImage(null); // Close crop UI
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#002E5D] flex flex-col items-center py-10 px-6">

      <div className="bg-[#003D80] w-full max-w-6xl rounded-2xl py-6 text-center">
        <h1 className="text-white text-2xl font-bold tracking-wide">PROFILE</h1>
      </div>

      {image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-lg font-semibold mb-4 text-center">Crop Profile Image</h2>

            <div className="relative w-full h-64 bg-gray-200 rounded overflow-hidden">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom Slider */}
            <div className="mt-4">
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setImage(null)}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={uploadCroppedImage}
                disabled={uploading}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {uploading ? "Uploading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Profile Header Card */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-[#0a4a7a] to-[#083b66] rounded-xl p-6 flex items-center gap-10 mt-20 shadow-lg">
        <div className="relative">
          <img
            src={profileImg}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-white object-cover"
          />

        </div>
        <div className="flex flex-col gap-2">
          {/* Upload Button */}
          <label htmlFor="upload-input" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 text-sm">
            <FaUpload /> Upload Image
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Delete Button */}
          <button onClick={() => setProfileImg(profileImgDefault)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
            <FaTrash /> Delete Image
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{fullname}</h2>
          <p className="text-gray-200 text-sm">{email}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Personal Details */}
        <div className="md:col-span-2 bg-[#0a4a7a] rounded-xl p-6 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm">Name</label>
              <input type="text" value={fullname} readOnly className="w-full mt-1 rounded-lg p-2 bg-white border border-gray-500 text-black" />
            </div>
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input type="text" value={email} readOnly className="w-full mt-1 rounded-lg p-2 bg-white border border-gray-500 text-black" />
            </div>
            <div>
              <label className="text-gray-300 text-sm">Phone</label>
              <input type="text" value={phone} readOnly className="w-full mt-1 rounded-lg p-2 bg-white border border-gray-500 text-black" />
            </div>
            <div>
              <label className="text-gray-300 text-sm">State</label>
              <input type="text" value={state} readOnly className="w-full mt-1 rounded-lg p-2 bg-white border border-gray-500 text-black" />
            </div>
          </div>

          {/* Current Plan */}
          <div className="mt-6">
            <label className="text-gray-300 text-sm">Current Plan</label>
            <div className="flex items-center justify-between mt-1 p-3 rounded-lg bg-white border border-gray-500 text-black">
              <span>{currentPlan}</span>
              <span className="text-green-500 font-semibold text-sm">Active</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Sponsor Details */}
          <div className="bg-[#0a4a7a] rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4">Sponsor Details</h3>
            <div className="flex items-center gap-3">
              <img src={sponsorImg} alt="Sponsor" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="text-white text-sm font-medium">Arun P Lush</h4>
                <p className="text-gray-300 text-xs">arunlush17@gmail.com</p>
                <p className="text-gray-300 text-xs">09841638729</p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-[#0a4a7a] rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4">Contact Support</h3>
            <p className="text-sm bg-white text-black rounded-2xl px-2 py-3 mb-2">
              📞 +91 9825136881 <br />
              Monday-Sunday: 09:00AM - 09:00PM
            </p>
            <button className="w-full bg-[#1D9BF0] hover:bg-[#0c7bdc] text-white py-2 rounded-lg font-medium transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Canvas is empty"));
      resolve(blob);
    }, "image/jpeg");
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
