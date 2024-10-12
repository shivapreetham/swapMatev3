import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "../../utils/AuthUtil";
import { useNavigate } from "react-router-dom";

export default function Navbar1() {
  return (
    <div className="relative w-full z-50">
      <Navbar className="top-2" />
      <Logo />
      <Icons />
    </div>
  );
}

function Logo() {
  return (
    <div className="fixed top-8 left-4">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
        <span className="text-black dark:text-white font-bold">
          <img src="C:\Users\SHIVAPREETHAM ROHITH\Desktop\mern-projects\SwapMate\client\public\assets\Screenshot_2024-07-13_172732-removebg-preview.png" alt="L" />
        </span>
      </div>
    </div>
  );
}
function Icons() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');

    navigate('/login');
  };

  return (
    <div className="fixed top-7 right-4 flex items-center space-x-4">
      <div
        className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400"
        onClick={() => navigate('/notifications')}
      >
        <span className="text-black dark:text-white">N</span>
      </div>
      <div
        className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <span className="text-black dark:text-white">P</span>
      </div>
      <div
        className="bg-crimson text-white rounded-full px-4 py-2 flex items-center justify-center cursor-pointer hover:bg-red-700"
        onClick={handleLogout}
      >
        <span className="font-bold">Logout</span>
      </div>
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar on scroll down
      } else {
        setShowNavbar(true); 
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-40 transition-transform duration-300",
        className,
        showNavbar ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Proxy">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/globalrequest">Globally Request</HoveredLink>
            <HoveredLink href="/privaterequest">Private Request</HoveredLink>
            <HoveredLink href="/myRequests">My Requests</HoveredLink>
            <HoveredLink href="/myPromises">My Promises</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Attendance">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Mark My Attendance"
              href="/markMyAttendance"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Easily mark your attendance with a single click."
            />
            <ProductItem
              title="Get My Attendance"
              href="getMyAttendance"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Retrieve your attendance records quickly."
            />
            <ProductItem
              title="Leaderboard"
              href="leaderboard"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="See how you rank among your peers."
            />
            <ProductItem
              title="Calendar"
              href="calender"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="View your attendance and upcoming events in a calendar view."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Chat">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/chat">Global Chat</HoveredLink>
            <HoveredLink href="/chat">Private Groups</HoveredLink>
            <HoveredLink href="/chat/">Private Chat</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
