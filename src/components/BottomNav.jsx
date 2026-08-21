import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiOutlineFlag,
  HiOutlineCreditCard,
  HiOutlineChartBar,
  HiOutlineUser,
} from "react-icons/hi";
import { Landmark } from "lucide-react";
import { Bot } from "lucide-react";

import { MdSavings } from "react-icons/md";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/"><HiHome size={24} /></NavLink>
      <NavLink to="/goals"><HiOutlineFlag size={24} /></NavLink>
      <NavLink to="/transactions"><HiOutlineCreditCard size={24} /></NavLink>
      <NavLink to="/budgets"><MdSavings size={24} /></NavLink>
      <NavLink to="/investments"><HiOutlineChartBar size={24} /></NavLink>
      <NavLink to="/advisor"><Bot size={24} /></NavLink>
      <NavLink to="/accounts"><Landmark size={24} /></NavLink>
      <NavLink to="/profile"><HiOutlineUser size={24} /></NavLink>
    </nav>
  );
}

export default BottomNav;