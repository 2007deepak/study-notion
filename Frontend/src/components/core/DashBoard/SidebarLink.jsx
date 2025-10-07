import React from 'react'

import * as Icons from "react-icon/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';


function SidebarLink({link,iconName})  {

    const Icon = Icons[iconName];
    //beacuse we show in sidebar link activ or not like yellow or white
    const location = useLocation();
    const dispatch = useDispatch();

    // if current path is same as link then it is active
    const matchRoutes = (route) => {
        return matchRoutes({path:route},location.pathname)
    }
  return (
    <NavLink to={link} className={`relative px-8 py-2 text-sm font-medium ${matchRoutes(link.path)? "bg-yellow-800 ":"bg-opacity-0"}`}>

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] ${matchRoutes(link.path) ? "bg-yellow-100" : "bg-opacity-0"}`}>

        </span>

        <div className='flex item-center gap-x-2'>
            <Icon className ="text-lg" />
            <span className=''>{link.name}</span>   
            

        </div>
    </NavLink>
  )
}

export default SidebarLink
