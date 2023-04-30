import React from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import LeftSideBar from "./LeftSideBar";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg bg-light-gray text-gray-700 text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="flex flex-row bg-zinc-300 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto">
      {activeMenu && (
        <>
          <LeftSideBar />
          <div className="w-full">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <span>Reports</span>
              </Link>
            </div>
            <div className="mt-10 ">
              {links.map((item) => (
                <div key={item.title}>
                  {/* <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p> */}
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.to}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "bg-light-gray" : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="uppercase font-semibold text-xs">
                        {link.name}
                      </span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
