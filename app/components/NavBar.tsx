"use client";
import { CustomFlowbiteTheme, Navbar, Flowbite } from "flowbite-react";
import LogoComponent from "./images/Logo";

const customTheme: CustomFlowbiteTheme = {
  avatar: {
    root: {
      size: {
        xs: "w-[32px] h-[32px] shrink-0",
      },
      img: {
        off: "relative overflow-hidden bg-gray-100 hover:bg-gray-300 dark:bg-gray-600",
      },
    },
  },
  dropdown: {
    arrowIcon: "hidden",
    floating: {
      base: "z-[40] w-fit rounded-lg divide-y divide-gray-100 shadow-md focus:outline-none",
      item: {
        base: "flex items-center justify-start py-1 px-2 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100",
      },
    },
  },
  navbar: {
    root: {
      base: "bg-white px-1 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
      inner: {
        base: "mx-auto px-1 flex max-tablet:gap-3 items-center justify-between self-stretch",
      },
    },
  },
};

const NavBar: React.FC = () => {
  let user: any;
  const userCookie: any =
    typeof localStorage !== "undefined" && localStorage.getItem("user");
  if (userCookie) {
    user = JSON.parse(userCookie);
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Navbar
        fluid
        className="fixed md:py-2 top-0 z-[40] md:z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[58px]"
      >
        <Navbar.Brand>
          <div className="flex gap-2 items-center">
            <LogoComponent className="w-[115px] h-[50px]" />
            <span className="hidden xl:block w-[1px] h-[30px] bg-[#D1D3D8]"></span>
            <span className="hidden xl:inline whitespace-nowrap text-md ml-2 font-sanchez font-bold dark:text-white text-primary-colmena">
              Portal Juegos
            </span>
          </div>
        </Navbar.Brand>
      </Navbar>
    </Flowbite>
  );
};

export default NavBar;
