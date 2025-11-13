import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { FaUpload, FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import profileImgDefault from "../Assets/profile.png";
import sponsorImg from "../Assets/Sponsor.png";
import { useNavigate } from "react-router-dom";


import { API_BASE } from "../../apiBase";

export default function ProfilePage() {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const userprofile = user?.customer_image;
  const fullname = user?.fullname || "";
  const guide_code = user?.guide_code || "";
  const email = user?.email || "";
  const phone = user?.phone || "";
  const state = user?.state || "";
  const packageId = sessionStorage.getItem("packageId");

  const referred_person_id = user?.referred_by;

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
  const [uploadProgress, setUploadProgress] = useState(0);

  // new states to hold signed upload info returned by backend
  const [uploadUrl, setUploadUrl] = useState(null); // signed PUT URL
  const [publicUrl, setPublicUrl] = useState(null); // optional public URL returned by backend
  const [expectedContentType, setExpectedContentType] = useState(null); // optional content-type backend expects

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const resdata = await fetch(
        `${API_BASE}/api/v_1/users/changeprofile/getsignurl?pendingUserId=${guide_code}&ext=${file.name.split(".").pop()}`
      );

      if (!resdata.ok) {
        const errTxt = await resdata.text().catch(() => "");
        throw new Error(`Failed to get signed url: ${resdata.status} ${errTxt}`);
      }
      const data = await resdata.json();
      setUploadUrl(data.uploadUrl || null);
      setPublicUrl(data.publicUrl || null);
      setExpectedContentType(data.contentType || null);

      // set local preview and open crop modal
      setImage(URL.createObjectURL(file));
      setZoom(1);
    } catch (err) {
      console.error("Failed to get signed url:", err);
      alert("Could not get upload URL. Check console for details.");
    }
  };

  const removeSelectedImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
      setImage(null);
      setUploadProgress(0);
    }
  };

  const uploadCroppedImage = async () => {
    try {
      if (!uploadUrl) {
        alert("Missing upload URL. Please select an image again so we can request an upload URL from the server.");
        return;
      }

      setUploading(true);
      setUploadProgress(0);
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
      const contentTypeToSend = expectedContentType || "image/jpeg";
      await uploadToSignedUrl(croppedBlob, uploadUrl, contentTypeToSend);
      let finalPublicUrl = publicUrl;
      if (!finalPublicUrl) {
        finalPublicUrl = uploadUrl.split("?")[0];
      }
      setUploadProgress(100);

      try {
        await axios.post(`${API_BASE}/api/v_1/users/changeprofile/confirmUpload`, {
          pendingUserId: guide_code,
          publicUrl: finalPublicUrl,
        });
       
        setProfileImg(finalPublicUrl);
        const updatedUser = { ...user, customer_image: finalPublicUrl };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      } catch (err) {
        console.warn("Failed to notify server about uploaded file. Check backend endpoint.", err);
      }

      setImage(null);
      setUploadUrl(null);
      setPublicUrl(null);
      setExpectedContentType(null);
      setUploadProgress(0);
    } catch (err) {
      alert(`Failed to upload image: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };


  const [referedpersondetails,setreferedpersondetails] = useState(null)

useEffect(() => {
  if (referred_person_id) {  // ✅ runs only if not null or undefined
    const getreferred_persondetails = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/v_1/users/getcustomerdetails/refered/${referred_person_id}`
        );
        const data = await res.json();
        setreferedpersondetails(data.data)
      } catch (error) {
        console.error("Error fetching referred person details:", error);
      }
    };

    getreferred_persondetails(); 
  }
}, [referred_person_id]); 


console.log(referedpersondetails)
  return (
    <div className="min-h-screen bg-[#002E5D] flex flex-col items-center py-5 px-6">
      {/* Modal - Cropper */}
      {image && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[95%] max-w-3xl relative">
            <button
              aria-label="Close cropper"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={removeSelectedImage}
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Crop & Upload Profile Image</h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-2/3 h-80 bg-gray-100 rounded overflow-hidden">
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

              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border">
                    <img src={image} alt="preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Preview</p>
                    <p className="text-xs text-gray-400">Make sure face is centered</p>
                  </div>
                  <button onClick={removeSelectedImage} title="Remove" className="p-2 rounded-lg hover:bg-gray-100">
                    <FaTrash />
                  </button>
                </div>
                {/* Upload controls */}
                <div className="mt-auto">
                  {uploading && (
                    <div className="w-full">
                      <div className="text-sm mb-2">Uploading — {uploadProgress}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${uploadProgress}%`, background: "linear-gradient(90deg,#0283FF,#0066cc)" }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setImage(null)}
                      disabled={uploading}
                      className="w-full px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={uploadCroppedImage}
                      disabled={uploading}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded-lg ${
                        uploading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      <FaUpload />
                      {uploading ? "Uploading..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-[#0a4a7a] to-[#083b66] rounded-2xl p-3 flex items-center gap-5 shadow-lg">
        <div className="relative">
           {userprofile ? (
              <img
                src={userprofile}
                alt="Profile"
                className="w-[180px] rounded-xl object-cover"
              />
            ) : (
            <div className="w-[180px] h-[140px] rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-bold text-4xl uppercase" 
               onClick={() => navigate("/Profile")}
                style={{cursor:"pointer"}}>
                {fullname?.slice(0, 2)}
              </div>
            )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="">
            <h2 className="text-3xl capitalize font-semibold text-white">{fullname}</h2>
            <p className="text-gray-200 text-[16px]">{email}</p>
          </div>

          <input id="upload-input" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

          <div className="flex items-center gap-3 mt-3">
            <label htmlFor="upload-input" title="Edit profile" className="px-4 py-1.5 cursor-pointer bg-[#0283FF] text-white rounded-lg text-sm">
              Edit Profile
            </label>
          </div>
        </div>
      </div>

      {/* Main Grid (rest of your layout unchanged) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Personal Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-black text-2xl font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl">
                <label className="text-[#6B7280] text-sm">Name</label>
                <input type="text" value={fullname} readOnly className="w-full capitalize font-normal rounded-lg text-[#1F2937]" />
              </div>
              <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl">
                <label className="text-[#6B7280] text-sm">Email</label>
                <input type="text" value={email} readOnly className="w-full capitalize font-normal rounded-lg text-[#1F2937]" />
              </div>
              <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl">
                <label className="text-[#6B7280] text-sm">Phone</label>
                <input type="text" value={phone} readOnly className="w-full capitalize font-normal rounded-lg text-[#1F2937]" />
              </div>
              <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl">
                <label className="text-[#6B7280] text-sm">State</label>
                <input type="text" value={state} readOnly className="w-full capitalize font-normal rounded-lg text-[#1F2937]" />
              </div>
            </div>

            <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl mt-4 md:mt-10 relative">
              <label className="text-[#6B7280] text-sm">Current Plan</label>

              <div className="flex items-center justify-between rounded-lg text-black relative">
                <span>{currentPlan}</span>
              </div>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0283FF]/10 text-[#0283FF] font-normal px-4 py-2 rounded-full text-sm">Active</span>
            </div>
          </div>

          <div className="bg-[#ffffff] rounded-xl mt-3 p-6 shadow-lg">
            <h3 className="text-black font-semibold text-lg mb-4">Quick Links</h3>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl">
                <label className="text-[#6B7280] text-sm mb-2">Community Link</label>
                <div className="w-full font-normal rounded-lg text-[#0283FF] cursor-pointer truncate">https://chat.whatsapp.com/JWeWyMWV5KGxIRzTiLxX</div>
              </div>
              <div className="py-3 grid grid-cols-1  md:grid-cols-2 rounded-2xl">
                <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl">
                  <label className="text-[#6B7280] text-sm mb-2">Content Factory (Hindi)</label>
                  <div className="w-full font-normal rounded-lg text-[#0283FF] cursor-pointer">Join Now →</div>
                </div>
                <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl">
                  <label className="text-[#6B7280] text-sm mb-2">Content Factory (English)</label>
                  <div className="w-full font-normal rounded-lg text-[#0283FF] cursor-pointer">Join Now →</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#ffffff] rounded-xl p-6 shadow-lg">
            <h3 className="text-black font-semibold mb-4">Sponsor Details</h3>
            {referedpersondetails ? (
              <div className="flex items-center gap-3">
                {referedpersondetails?.customer_image ? (
                  <img
                    src={referedpersondetails?.customer_image}
                    alt="Profile"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-bold text-2xl uppercase" 
                   onClick={() => navigate("/Profile")}
                    style={{cursor:"pointer"}}>
                    {referedpersondetails?.fullname?.slice(0, 2)}
                  </div>
                )}
                <div className="">
                  <h4 className="text-black text-[16px] font-medium">{referedpersondetails?.fullname}</h4>
                  <p className="text-[#6B7280] text-xs">{referedpersondetails?.email}</p>
                  <p className="text-[#6B7280] text-xs">{referedpersondetails?.phone}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-gray-100">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">You have not joined under anyone</p>
                <p className="text-gray-400 text-xs mt-1">No guide assigned</p>
              </div>
            )}
          </div>

          <div className="bg-[#ffffff] rounded-xl p-6 shadow-lg">
            <h3 className="text-black font-semibold mb-4">Contact Support</h3>
            <p className="text-sm bg-white text-black rounded-2xl px-2 pb-3 mb-3">
              <span className="font-semibold text-lg">+91-9825136881</span> <br />
              <span className="text-[#6B7280]">Monday-Sunday: 09:00AM - 09:00PM</span>
            </p>
            <button className="w-full bg-[#0283FF] hover:bg-[#0c7bdc] text-white py-3 rounded-xl cursor-pointer font-medium transition">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// upload helper — only include Content-Type header if expectedContentType is provided
const uploadToSignedUrl = async (file, uploadUrl, expectedContentType = null) => {
  try {
    const headers = {};
    // If backend signed the URL with a contentType, pass that exact value here.
    // If expectedContentType is null, we DO NOT add Content-Type header to avoid signature mismatch
    if (expectedContentType) {
      headers["Content-Type"] = expectedContentType;
    }
    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers,
      body: file,
      mode: "cors",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Upload failed (status ${res.status}): ${text}`);
    }
    return true;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error(`Network/CORS error during upload: ${err.message}`);
    }
    throw err;
  }
};

// helper functions (unchanged)
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
