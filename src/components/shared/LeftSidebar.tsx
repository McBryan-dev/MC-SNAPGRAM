import React from 'react';
import {Link, useNavigate, NavLink, useLocation} from 'react-router-dom';
import {useEffect} from 'react'
import {Button} from '../ui/button.tsx';

import {useSignOutAccount} from '@/lib/react-query/queriesAndMutations';
import {useUserContext} from '@/context/AuthContext';
import {sidebarLinks} from '@/constants/index.ts';
import {INavLink} from '@/types/index.ts'

const LeftSidebar = () => {
    const {pathname} = useLocation()
    const {user} = useUserContext();
    const navigate = useNavigate();
    const {mutate: signOut, isSuccess} = useSignOutAccount()

    useEffect(() => {
        if(isSuccess) {
            navigate(0);
        }
    }, [isSuccess])
    return (
        <nav className="leftsidebar h-screen flex flex-col gap-7">
            <div className="flex flex-col gap-9">
                <div>
                    <Link to="/" className="flex gap-3 items-center">
                        <img src="/assets/images/logo.svg"
                        alt="logo"
                        height={36}
                        width={170}/>
                    </Link>
                </div>

                <div>
                    <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                        <img 
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                        alt="profile-photo"
                        className="h-14 w-14 rounded-full"/>
                        <div className="flex flex-col">
                            <p className="body-bold">
                                {user.name}
                            </p>
                            <p className="small-regular text-light-2 font-bold ">
                                -@{user.username}-
                            </p>
                        </div>
                    </Link>
                </div>

                <ul className='flex flex-col gap-3'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li 
                            key={link.label}
                            className={`leftsidebar-link group ${isActive ? 'bg-primary-500' : ''}`}>
                                <NavLink
                                to={link.route}
                                className={`flex gap-4 items-center p-4 text-center text-white-500`} >
                                    <img 
                                    src={link.imgURL}
                                    alt={link.label}
                                    className={`group-hover:invert-white ${isActive ? 'invert-white' : ''}`} />
                                    <h5 className="font-bold text-white-500">
                                        {link.label}
                                    </h5>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="">
                <Button variant="ghost" className="shad-button_ghost" 
                onClick={() => signOut()}>
                    <img 
                    src="/assets/icons/logout.svg"
                    alt="logout"/>
                    <p className="small-medium lg:base-medium">Logout</p>
                </Button>
            </div>
        </nav>
    )
}

export default LeftSidebar;