import React, { useState } from 'react';
import { useGetAllUserQuery} from '../redux/services/UserApi';

const ProfileCard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data } = useGetAllUserQuery();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <section className="bg-gray-50 no-scrollbar dark:bg-gray-900 sm:p-5 antialiased p-4 sm:ml-64  overflow-auto">

        <div className='flex flex-wrap'>
        {
           data?.map((element, i)=>{
                return  <div key={i} className="m-2 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
               
                <div className="flex flex-col items-center pt-10 pb-10">
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${element?.profileimage?element?.profileimage:"https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"}`} alt="Bonnie Green" />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{element?.name}</h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{element?.department}</span>
                  <div className="flex mt-4 md:mt-6">
                    <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{element?.email}</span>
                    <a href={`mailto:${element?.email}`} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                  </div>
                </div>
              </div>
            })
        }
        </div>
      
   
    </section>
  );
};

export default ProfileCard;
