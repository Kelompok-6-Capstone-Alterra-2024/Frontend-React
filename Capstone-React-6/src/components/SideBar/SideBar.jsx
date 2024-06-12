import React, { useState, useEffect } from 'react';
import { logout } from '../../utils/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState('/dashboard');
  

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload();  // Redirect to login page after logout
    };

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '/Sidebar/Dashboard.svg' },
        { name: 'Kelola Konten', path: '/dashboard/managecontent', icon: '/Sidebar/Headset.svg' },
        { name: 'Kelola Pasien', path: '/dashboard/managepatient', icon: '/Sidebar/Clipboard.svg' },
        { name: 'Transaksi', path: '/dashboard/transaction', icon: '/Sidebar/CardTransaction.svg' },
        { name: 'Kelola Forum', path: '/dashboard/manageforum', icon: '/Sidebar/AddLayer.svg' }
    ];

    const isActive = (path) => {
        if (path === '/dashboard/managecontent') {
            return activePath.startsWith('/dashboard/managecontent');
        }
        if (path === '/dashboard/managepatient') {
            return activePath.startsWith('/dashboard/managepatient');
        }
        if (path === '/dashboard/transaction') {
            return activePath.startsWith('/dashboard/transaction');
        }
        if (path === '/dashboard/manageforum') {
            return activePath.startsWith('/dashboard/manageforum');
        }
        if (path === '/dashboard' && (activePath.startsWith('/dashboard') && !activePath.startsWith('/dashboard/manage') && !activePath.startsWith('/dashboard/transaction'))) {
            return true;
        }
        return activePath === path;
    };

    return (
        <div>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 mr-4 text-sm text-gray-500 rounded-lg lg:hidden md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="/logo/mindease-logo.svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
                <div className="h-full flex flex-col justify-between px-4 py-6 overflow-y-auto bg-white shadow fixed">
                    <div>
                        <a href="#" className="flex items-center justify-center mb-14">
                            <img src="/logo/mindease-logo.svg" className="h-6 sm:h-7 px-8" alt="Mindease Logo" />
                        </a>
                        <ul className="text-body1 font-regular justify-between px-3 py-4 gap-10">
                            {menuItems.map(item => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex mb-3 items-center p-2 text-dark-3 rounded-lg group ease-in-out duration-100
                                            ${isActive(item.path) ? 'bg-primary-lighter text-primary-darker font-semibold' : 'hover:bg-primary-lighter hover:text-primary-darker hover:font-semibold'}`}
                                        onClick={() => setActivePath(item.path)}
                                    >
                                        <img
                                            src={item.icon}
                                            alt=""
                                            className={`mr-3 ${isActive(item.path) ? 'stroke-primary-darker' : 'group-hover:stroke-primary-darker'}`}
                                        />
                                        <span className="ms-3">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul className="text-body1 font-regular justify-between px-3 py-2">
                        <li>
                        <button onClick={handleLogout} className="flex mt-40 items-center p-2 text-dark-3 rounded-lg hover:bg-primary-lighter hover:text-primary-darker hover:font-semibold group ease-in-out duration-100">
                                <img src="../../../public/Sidebar/Logout.svg" alt="" className="hover:stroke-primary-darker" />
                                <span className="ms-3">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
