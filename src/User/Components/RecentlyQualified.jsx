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
      className="bg-white rounded-4xl cursor-default border border-[#C9C9C9] mb-4 overflow-hidden w-full "
    >

      <div
        className="p-3"
        style={{ background: 'linear-gradient(to bottom right, #4852F4 0%, #8B38EA 100%)' }}
      >
        <h3 className="text-lg text-white px-2 font-medium">Recently Qualified</h3>
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
    <div className="w-12 h-12 rounded-full mr-3 flex items-center justify-center bg-gradient-to-r from-indigo-500  to-indigo-300 text-white font-bold text-sm uppercase">
      {user.name?.slice(0, 2)}
    </div>
  )}

  <div className="leading-tight">
    <p className="font-semibold text-sm">{user.name}</p>
    <p className="text-xs text-[#B5B5B5]">{user.qualification}</p>
    <p className="text-xs text-[#B5B5B5]">{user.timeAgo}</p>
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
