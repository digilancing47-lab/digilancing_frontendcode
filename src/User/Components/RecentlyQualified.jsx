import React from 'react';
import trophy from '../../User/Assets/trophy.svg';
import icon from '../../User/Assets/icon.svg';

const RecentlyQualified = () => {
 const qualifiedUsers = [
  { name: 'Vikram', qualification: 'Normal Qualifier', timeAgo: '1 day ago', avatar: "" },
  { name: 'Anjali', qualification: 'Premium Plus Qualifier', timeAgo: '2 days ago', avatar: "" },
  { name: 'Rohit', qualification: 'Premium Qualifier', timeAgo: '3 days ago', avatar: "" },
  { name: 'Meera', qualification: 'Premium Plus Qualifier', timeAgo: '2 hours ago', avatar: "" },
  { name: 'Sandeep', qualification: 'Normal Qualifier', timeAgo: '5 hours ago', avatar: "" }
];
  return (
    <div
      className="bg-white border border-black/10 rounded-3xl cursor-default overflow-hidden w-full "
    >

      <div
        className="p-3"
         
      >
        <h3 className="text-lg text-black px-2 font-medium">Recently Qualified</h3>
        <p className="text-xs text-gray-500 px-2">Latest users who achieved qualifications</p>
      </div>

      {/* Content */}
      <div className="p-3">
        {qualifiedUsers.map((user, index) => (
          <div key={index} className="flex justify-between items-center mb-3">
            {/* Avatar + Info */}
            <div className="flex items-center">
  {user.avatar ? (
    <img
      src={user.avatar}
      alt={user.name}
      className="w-12 h-12 rounded-full object-cover mr-3"
    />
  ) : (
    <div className="w-12 h-12 rounded-full mr-3 flex items-center justify-center bg-gradient-to-r from-[#3b82f6] via-[#3b82f6] to-[#3b82f6] text-white font-bold text-sm uppercase">
      {user.name?.slice(0, 2)}
    </div>
  )}

  <div className="leading-tight">
    <p className="font-semibold text-sm">{user.name}</p>
    <p className="text-xs text-gray-500">{user.qualification}</p>
    <p className="text-xs text-gray-500">{user.timeAgo}</p>
  </div>
</div>


            {/* Time + Icon */}
            <div className="flex items-center text-sm text-gray-500">
              <img src={trophy} alt="trophy" className="w-7 h-7" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyQualified;
