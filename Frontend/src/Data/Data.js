import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
  UiUserCircle,
} from "@iconscout/react-unicons";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    place: "/AdminHome",
  },
  {
    icon: UilClipboardAlt,
    heading: "Orphans",
    place: "/Orphans",
  },
  {
    icon: UilUsersAlt,
    heading: "Donations",
    place: "/Donations",
  },
  {
    icon: UilPackage,
    heading: "Adoptions",
    place: "/Adoptions",
  },
  {
    icon: UilChart,
    heading: "Sponserships",
    place: "/Sponserships",
  },
  {
    icon: UilChart,
    heading: "Profile",
    place: "/Profile",
  },
];
