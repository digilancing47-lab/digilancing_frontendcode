import React from 'react';
import { PhoneCall } from 'lucide-react';
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const SupportSystem = () => {
  return (
    <div className="mt-8">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Helpdesk System</h2>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Support Cards */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl border border-gray-300 shadow-sm p-6">
          {/* Support Card 1 */}
          <div className="flex items-center gap-4 border-r border-gray-300 pr-4">
            <div className="rounded-full">
              <img src='/whatsapp.svg' alt='' className='w-12'/>
            </div>
            <div>
              <p className="text-sm text-gray-600">We are here for you</p>
              <p className="font-semibold text-lg">+91 9625136861</p>
              <p className="text-xs text-gray-500">Monday - Sunday 9:00AM - 05:00PM</p>
            </div>
          </div>

          {/* Support Card 2 */}
          <div className="flex items-center gap-4 pl-4">
            <div className="rounded-full">
              <img src='/whatsapp.svg' alt='' className='w-12'/>
            </div>
            <div>
              <p className="text-sm text-gray-600">Let’s Connect On</p>
              <p className="font-semibold text-lg">+91 9310246027</p>
              <p className="text-xs text-gray-500">Monday - Sunday 9:00AM - 05:00PM</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6 flex flex-col justify-center items-center">
          <p className="font-semibold text-lg mb-4">Get Updates</p>
          <div className="flex gap-2 text-2xl">
            <img src='youtube.svg' alt='' className='w-10'/>
            <img src='facebook.svg' alt='' className='w-10'/>
            <img src='twitter.svg' alt='' className='w-10'/>
            <img src='intra.svg' alt='' className='w-10'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSystem;
