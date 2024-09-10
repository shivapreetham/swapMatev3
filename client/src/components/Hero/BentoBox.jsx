import React from 'react';

const FeaturesBentoBox = () => {
  const features = [
    {
      title: "Attendance Tracking",
      description: "Easily log your daily attendance and view your records.",
      icon: "/path/to/attendance-icon.svg"
    },
    {
      title: "Proxy Requests",
      description: "Manage your proxy requests, both global and private.",
      icon: "/path/to/proxy-icon.svg"
    },
    {
      title: "Leaderboard",
      description: "See the top performers and earn rewards.",
      icon: "/path/to/leaderboard-icon.svg"
    },
    {
      title: "Swaps Currency",
      description: "Earn and spend swaps through various activities.",
      icon: "/path/to/swaps-icon.svg"
    }
  ];

  return (
    <div className="grid-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <img src={feature.icon} alt={`${feature.title} Icon`} className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesBentoBox;
