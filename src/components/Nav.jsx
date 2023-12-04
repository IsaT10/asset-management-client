import { Link, NavLink, useNavigate } from 'react-router-dom';
import useHR from '../Hooks/useHR';
import useAuth from '../Hooks/useAuth';
import useUsers from '../Hooks/useUsers';
import { toast } from 'react-toastify';
import { useState } from 'react';
import avatar from '../assets/images/avatar.png';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useHR();
  const navigate = useNavigate();
  const { isEmployee } = useUsers(userData?.companyName);
  const myEmployee = isEmployee.filter((user) => user.role === 'employee');
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    navigate('/');
    toast.success('Successfully logged out');
  };
  return (
    <div className="px-2 lg:px-0 py-2 text-stone-200">
      <div className="navbar  max-w-7xl mx-auto flex justify-between">
        <div className=" flex w-full lg:w-44 justify-between items-center">
          <div className="flex  gap-2 md:gap-2 lg:gap-5 items-center">
            <Link to="/">
              {userData?.companyLogo ? (
                <img
                  className="w-20 object-cover"
                  src={userData?.companyLogo}
                  alt=""
                />
              ) : (
                <h1 className="text-lg md:text-xl lg:text-2xl text-primary-color font-bold ">
                  AssetMaster
                </h1>
              )}
            </Link>
          </div>

          <div className="dropdown ">
            <label tabIndex={0} className="btn  btn-ghost lg:hidden ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            {!userData?.role ? (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content -left-20 mt-3 p-2 shadow  w-36 mr-10 z-40 text-white rounded-md  bg-blue"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/signupAsEmployee">Join as Employee</Link>
                </li>
                <li>
                  <Link to="/signupAsHR">Join As HR</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            ) : (
              <>
                {userData?.role === 'HR' ? (
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content -left-20 mt-3 p-2 shadow  w-36 mr-10 z-40 text-white rounded-md  bg-blue"
                  >
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/assetsList">Asset List</Link>
                    </li>
                    <li>
                      <Link to="/addAnAsset">Add Asset</Link>
                    </li>
                    <li>
                      <Link to="/allRequest">All Requests</Link>
                    </li>
                    <li>
                      <Link to="/allCustomRequest">Custom Requests</Link>
                    </li>
                    <li>
                      <Link to="/addEmployee">Add an Employee</Link>
                    </li>
                    <li>
                      <Link to="/myEmployee">My Employee</Link>
                    </li>

                    {user?.email ? (
                      <li>
                        <Link onClick={handleLogout}>Logout</Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                          <Link to="/login">login</Link>
                        </li>
                      </>
                    )}
                  </ul>
                ) : (
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content -left-20 mt-3 p-2 shadow  w-36 mr-10 z-40 text-white rounded-md  bg-blue"
                  >
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/myTeam">My Team</Link>
                    </li>
                    <li>
                      <Link to="/requestForAsset"> Request for an Assets</Link>
                    </li>
                    <li>
                      <Link to="/custom-request">Make a Custom Request</Link>
                    </li>

                    {user?.email ? (
                      <li>
                        <Link onClick={handleLogout}>Logout</Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                          <Link to="/login">login</Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </>
            )}
            {/* <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content -left-20 mt-3 p-2 shadow  w-36 mr-10 z-40 text-white rounded-md  bg-blue"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/assetsList">Asset List</Link>
              </li>
              <li>
                <Link to="/addAnAsset">Add Asset</Link>
              </li>
              <li>
                <Link to="/allRequest">All Requests</Link>
              </li>
              <li>
                <Link to="/allCustomRequest">Custom Requests</Link>
              </li>
              <li>
                <Link to="/addEmployee">Add an Employee</Link>
              </li>
              <li>
                <Link to="/myEmployee">My Employee</Link>
              </li>

              {user?.email ? (
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                  <li>
                    <Link to="/login">login</Link>
                  </li>
                </>
              )}
            </ul> */}
          </div>
        </div>
        <div className=" hidden lg:flex relative">
          {!userData?.role ? (
            <ul className="flex gap-4 items-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'pending'
                      : isActive
                      ? 'text-blue  tracking-tight  font-semibold'
                      : ' hover:text-blue duration-100 tracking-tight font-semibold   '
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/signupAsEmployee"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'pending'
                      : isActive
                      ? 'text-blue    tracking-tight font-semibold '
                      : ' hover:text-blue duration-100 tracking-tight font-semibold  '
                  }
                >
                  Join as Employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signupAsHR"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'pending'
                      : isActive
                      ? 'text-blue   tracking-tight font-semibold '
                      : ' hover:text-blue duration-100 tracking-tight font-semibold  '
                  }
                >
                  Join as HR/Admin
                </NavLink>
              </li>

              <li>
                <Link
                  to="/login"
                  className="bg-transparent border-2 text-sm md:text-base border-stone-900 rounded-sm px-3 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-1.5.5  font-semibold"
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <>
              {userData?.role === 'HR' ? (
                <ul className="flex gap-3 items-center">
                  {/* <li>
                    <NavLink
                      to="/"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold   '
                          : '  hover:text-blue duration-100 tracking-tight font-semibold   '
                      }
                    >
                      Home
                    </NavLink>
                  </li> */}

                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue    tracking-tight font-semibold   '
                          : '  hover:text-blue tracking-tight font-semibold duration-100  '
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/assetsList"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold     '
                          : ' hover:text-blue duration-100 tracking-tight font-semibold  '
                      }
                    >
                      Asset List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/addAnAsset"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue tracking-tight font-semibold    '
                          : ' hover:text-blue duration-100 tracking-tight font-semibold  '
                      }
                    >
                      Add Asset
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/allRequest"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold   '
                          : '  hover:text-blue tracking-tight font-semibold  duration-100  '
                      }
                    >
                      All Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/allCustomRequest"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold   '
                          : '  hover:text-blue duration-100 tracking-tight font-semibold   '
                      }
                    >
                      Custom Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/addEmployee"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold   '
                          : '  hover:text-blue duration-100 tracking-tight font-semibold   '
                      }
                    >
                      Add an Employee
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myEmployee"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold   '
                          : '  hover:text-blue duration-100 tracking-tight font-semibold   '
                      }
                    >
                      My Employee({myEmployee?.length})
                    </NavLink>
                  </li>

                  {/* <p>{user.displayName}</p> */}

                  {userData?.image ? (
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="avatar cursor-pointer flex items-center"
                    >
                      <div className="w-10 rounded-full">
                        <img src={userData?.image} alt="" />
                      </div>
                      <div className="border-2 border-stone-500 pr-1 border-l-0 rounded-r-lg ">
                        <IoMdArrowDropdown className="text-stone-500 text-lg mt-0.5" />
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="avatar cursor-pointer flex items-center"
                    >
                      <div className="w-10 rounded-full bg-transparent">
                        <img src={avatar} alt="asdsa" />
                      </div>
                      <div className="border-2 border-stone-500 pr-1 border-l-0 rounded-r-lg ">
                        <IoMdArrowDropdown className="text-stone-500 text-lg mt-0.5" />
                      </div>
                    </div>
                  )}

                  {isOpen && (
                    <div className="bg-blue absolute w-[160px] right-0 px-2 py-6 rounded-md z-20 top-12 flex flex-col items-center">
                      {userData?.image ? (
                        <div
                          onClick={() => setIsOpen(!isOpen)}
                          className="avatar cursor-pointer "
                        >
                          <div className="w-14 rounded-full">
                            <img src={user.photoURL} alt="" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-14 rounded-full bg-transparent">
                          <img src={avatar} alt="asdsa" />
                        </div>
                      )}

                      <p className="text-xl font-semibold">{userData?.name}</p>

                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className=" text-stone-200 px-4 py-1.5 rounded-md font-semibold text-sm mt-3 flex items-center gap-1"
                      >
                        <span>View Profile</span>
                        <FaArrowRight />
                      </Link>
                      <button
                        className="bg-stone-200 text-stone-800 px-4 py-1.5 rounded-md font-semibold text-sm mt-3"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}

                  {/* {user?.email ? (
              <>
                <button
                  className="bg-transparent border-2 text-sm md:text-base border-stone-900  rounded-sm px-3 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-1.5.5 text-stone font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>

                {user?.photoURL ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 rounded-full bg-transparent">
                    <img src={avatar} alt="asdsa" />
                  </div>
                )}
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? 'pending'
                        : isActive
                        ? ' text-blue  tracking-tight font-semibold   font-semibold'
                        : 'font-semibold  hover:text-blue duration-100 tracking-tight font-semibold  '
                    }
                  >
                    Sign up
                  </NavLink>
                </li>
                <Link
                  to="/login"
                  className="bg-transparent border-2 text-sm md:text-base border-stone-900 rounded-sm px-3 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-1.5.5  font-semibold"
                >
                  Login
                </Link>
              </>
            )} */}
                </ul>
              ) : (
                <ul className="flex gap-4 items-center">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold   '
                          : '  hover:text-blue duration-100 tracking-tight font-semibold   '
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/assets"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue    '
                          : ' hover:text-blue duration-100 tracking-tight font-semibold  '
                      }
                    >
                      My assets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myTeam"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue    '
                          : ' hover:text-blue duration-100 tracking-tight font-semibold  '
                      }
                    >
                      My Team
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/requestForAsset"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue  tracking-tight font-semibold   '
                          : '  hover:text-blue duration-100 tracking-tight font-semibold   '
                      }
                    >
                      Request for an Assets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/custom-request"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? 'pending'
                          : isActive
                          ? 'text-blue    '
                          : '  hover:text-blue duration-100 tracking-tight font-semibold   '
                      }
                    >
                      Make a Custom Request
                    </NavLink>
                  </li>

                  {userData?.image ? (
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="avatar cursor-pointer flex items-center"
                    >
                      <div className="w-10 rounded-full">
                        <img src={userData?.image} alt="" />
                      </div>
                      <div className="border-2 border-stone-500 pr-1 border-l-0 rounded-r-lg ">
                        <IoMdArrowDropdown className="text-stone-500 text-lg mt-0.5" />
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="avatar cursor-pointer flex items-center"
                    >
                      <div className="w-10 rounded-full bg-transparent">
                        <img src={avatar} alt="avatar" />
                      </div>
                      <div className="border-2 border-stone-500 pr-1 border-l-0 rounded-r-lg ">
                        <IoMdArrowDropdown className="text-stone-500 text-lg mt-0.5" />
                      </div>
                    </div>
                  )}

                  {isOpen && (
                    <div className="bg-blue absolute w-[160px] right-0 px-2 py-6 rounded-md z-20 top-12 flex flex-col items-center">
                      {userData?.image ? (
                        <div
                          onClick={() => setIsOpen(!isOpen)}
                          className="avatar cursor-pointer "
                        >
                          <div className="w-14 rounded-full">
                            <img src={userData.image} alt="" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-14 rounded-full bg-transparent">
                          <img src={avatar} alt="avatar" />
                        </div>
                      )}

                      <p className="text-xl font-semibold">{userData?.name}</p>

                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className=" text-stone-200 px-4 py-1.5 rounded-md font-semibold text-sm mt-3 flex items-center gap-1"
                      >
                        <span>View Profile</span>
                        <FaArrowRight />
                      </Link>
                      <button
                        className="bg-stone-200 text-stone-800 px-4 py-1.5 rounded-md font-semibold text-sm mt-3"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}

                  {/* {user?.email ? (
              <>
                <button
                  className="bg-transparent border-2 text-sm md:text-base border-stone-900  rounded-sm px-3 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-1.5.5 text-stone font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>

                {user?.photoURL ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 rounded-full bg-transparent">
                    <img src={avatar} alt="asdsa" />
                  </div>
                )}
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? 'pending'
                        : isActive
                        ? ' text-blue  tracking-tight font-semibold   font-semibold'
                        : 'font-semibold  hover:text-blue duration-100 tracking-tight font-semibold  '
                    }
                  >
                    Sign up
                  </NavLink>
                </li>
                <Link
                  to="/login"
                  className="bg-transparent border-2 text-sm md:text-base border-stone-900 rounded-sm px-3 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-1.5.5  font-semibold"
                >
                  Login
                </Link>
              </>
            )} */}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
