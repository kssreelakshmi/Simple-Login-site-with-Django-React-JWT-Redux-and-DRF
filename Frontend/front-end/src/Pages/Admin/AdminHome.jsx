import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'

const AdminHome = () => {
  const baseURL = "http://127.0.0.1:8000";
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem('access')
  const fetchUsers = (url) => {
    axios.get(url)
    .then((response) => {
      setUsers(response.data.results);
      console.log(response)
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    }).catch((error) => {
      console.error('ERROR! fetching users:', error);
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchUsers(`${baseURL}/api/user/admin/users/?search=${query}`);
  };

  const changeStatus = ({user}) =>{
  
      axios.patch(`${baseURL}/api/user/admin/user/toggle-active/${user.id}/`, {}, {
        
        headers: {
          
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          
        },
      })
      .then((response) => {
        console.log('the data is:',response)
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === user.id ? { ...u, is_active: response.data.is_active } : u
          )
        );
       
      })
      .catch((error) => {
        console.error("Error updating user:", error.response.data);
      });
  
  }

  useEffect(() => {
    fetchUsers(baseURL + "/api/user/admin/users/");
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchUsers(`${baseURL}/api/user/admin/users/?search=${searchQuery}`);
    }
  }, [searchQuery]);



  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-400">
        <div className="bg-gray-100 bg-opacity-35 p-8 rounded-xl shadow-2xl w-full max-w-[90%]">
          <header className="text-2xl text-center rounded-lg text-white p-2 font-semibold bg-black/15 ">User List</header>
          <div className="mt-4 mx-4">
            <div className='flex'>
            <div className="mb-4 bg-white rounded-lg items-center w-[70%] p-1 shadow-lg border border-gray-200">
              <input
                type="search"
                value = {searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
                />
            </div>
            
              <button className='mr-2 ml-20 items-center bg-black/70 my-3 p-2 rounded-full text-white'>
              <Link to ='user/create' >
              Create
              </Link>
              </button>
            </div>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3 text-center">Profile Image</th>
                      <th className="px-4 py-3">Username</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3 text-center">Active Status</th>
                      <th className="px-4 py-3 text-center">Block/Unblock</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">No Users Found</td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex justify-center text-sm">
                              <div className="relative w-8 h-8 mr-3 rounded-full">
                                <img
                                  src={user.profile_pic ? user.profile_pic : 'https://imgs.search.brave.com/uFVivMWdV33VC0QbgrTXEPKsHo4Ouvx02eGK8J-uDTU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzIxLzg5LzI4/LzM2MF9GXzcyMTg5/Mjg5Ml94Zndwc2hz/UDJHR2hNRWw5enBI/a2RWTFI5ZFhrQk9j/dS5qcGc'}
                                  className="object-cover w-full h-full rounded-full"
                                  alt=""
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Link to={`/admin/user/update/${user.id}`} className="mr-4 text-blue-200 hover:text-blue-500 cursor-pointer ">
                              {user.username}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm">{user.email}</td>
                          <td className="px-4 py-3 text-sm">{user.phone_number}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`px-2 py-1 font-semibold leading-tight text-white rounded-full ${
                                user.is_active ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            >
                              {user.is_active ? 'Active' : 'Not Active'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={()=>changeStatus({user})} className="text-red-600 hover:text-red-900">
                              {user.is_active ? 'Block' : 'Unblock'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Pagination */}
            <nav className="flex justify-center mt-4">
              <ul className="inline-flex -space-x-px">
                <li className={`page-item ${!prevPage ? 'disabled' : ''}`}>
                  <button
                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                    disabled={!prevPage}
                    onClick={() => fetchUsers(prevPage)}
                  >
                    Previous
                  </button>
                </li>
                <li className={`page-item ${!nextPage ? 'disabled' : ''}`}>
                  <button
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                    disabled={!nextPage}
                    onClick={() => fetchUsers(nextPage)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
