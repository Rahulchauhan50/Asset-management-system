import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa"
import PhotoPicker from "./PhotoPicker";
import axios from "axios";

function AddUser() {

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const departmentRef = useRef(null);

  const [grabPhoto, setgrabPhoto] = useState(false)
  const [profileImage, setprofileImage] = useState(false)
  const [profileImageUpload,setprofileImageUpload] = useState(null)

  useEffect(()=>{
    if(grabPhoto){
      const data = document.getElementById("photo-picker")
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(()=>{
          setgrabPhoto(false)
        },5000)
      }
    }
  },[grabPhoto])

  const handleAdduser = async () => {
    try {
      const formData = new FormData();
      formData.append("image", profileImageUpload);
      formData.append("email", emailRef.current?.value);
      formData.append("name", nameRef.current?.value);
      formData.append("department", departmentRef.current?.value);
  
      const { data } = await axios.post('http://localhost:5000/data/add-user', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
  
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    
  }


  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    setprofileImageUpload(file)
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = function (event){
      data.src = event.target.result;
      data.setAttribute("data-src",event.target.result)
    }
    reader.readAsDataURL(file)
    setTimeout(()=>{
      setprofileImage(data.src)
    },3000)

  }
 
  return (
    <section className="bg-gray-50 dark:bg-gray-900 sm:p-5 antialiased p-4 sm:ml-64 max-h-screen overflow-auto h-screen">
    <form
      id="drawer-update-product"
      className=" z-40 w-full h-auto p-4 overflow-y-auto bg-white dark:bg-gray-900"
      tabIndex="1"
      aria-labelledby="drawer-update-product-label"
      // onSubmit={handleAddAsset}
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        New User
      </h5>

      <div className="flex flex-col justify-between my-8 dark:bg-gray-800  bg-gray-50 rounded-2xl">
        <div className="bg-gray-50 flex justify-center dark:bg-[#374151] text-gray-900 dark:text-gray-50 bottom-1 border-solid border-b-white py-4 rounded-2xl">
          User Details
        </div>
        <div className="flex justify-between m-8 lg:flex-row flex-col">
          <div className="lg:w-[40%] w-full">
            <label
              htmlFor="description"
              className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            {/* <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                  <div className="flex items-center space-x-1 sm:pr-4">
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        />
                      </svg>
                      <span className="sr-only">Attach file</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                      <span className="sr-only">Embed map</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        />
                      </svg>
                      <span className="sr-only">Upload image</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        />
                      </svg>
                      <span className="sr-only">Format code</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                        />
                      </svg>
                      <span className="sr-only">Add emoji</span>
                    </button>
                  </div>
                  <div className="flex-wrap items-center hidden space-x-1 sm:flex sm:pl-4">
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        />
                      </svg>
                      <span className="sr-only">Add list</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        />
                      </svg>
                      <span className="sr-only">Settings</span>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  data-tooltip-target="tooltip-fullscreen"
                  className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                    />
                  </svg>
                  <span className="sr-only">Full screen</span>
                </button>
                <div
                  id="tooltip-fullscreen"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="bottom"
                  style={{
                    position: "absolute",
                    inset: "0px auto auto 0px",
                    margin: "0px",
                    transform: "translate3d(0px, 335px, 0px)",
                  }}
                >
                  Show full screen
                  <div className="tooltip-arrow" data-popper-arrow=""></div>
                </div>
              </div>
              <div className="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="description"
                  rows="8"
                  ref={DescriptionRef}
                  required
                  className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write product description here"
                >
                  
                </textarea>
              </div>
            </div> */}
             <div className="flex items-center justify-center">
     
     
        <div className="context-openers relative cursor-pointer z-0" onClick={()=>{ setgrabPhoto(true)}} >
          <div className={`z-10 context-openers hover:bg-[rgba(30,42,49,0.4)] h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 `}>
            <FaCamera className="text-2xl"/>
            <span className="context-openers text-gray-000">Change profile photo</span>
          </div>
        <div className="context-openers flex items-center h-60 w-60">
          <img src={profileImage?profileImage:'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className="context-openers rounded-full bg-[#233138]" alt="avatar" height={250} width={250}/>
        </div>
        </div>
        <div>
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </div>
    
   </div>
          </div>
          <div className="lg:w-[40%] w-full">
            <div className="my-4">
              <label
               
                className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                ref={nameRef}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="User Full name"
              />
            </div>
            <div className="my-4">
              <label
               
                className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Email
              </label>
              <input
                type="email"
                ref={emailRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="name"
                className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department
              </label>
              <select
                id="category"
                ref={departmentRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value='Electronics' >Digital</option>
                <option value="TV/Monitors">BTL</option>
                <option value="PC">ATL</option>
                <option value="Gaming/Console">Creatibe</option>
                <option value="Phones">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    

     

   
      
      <div className="flex justify-between">
            {/* <div> */}
            <button
            onClick={()=>{document.getElementById('drawer-update-product').reset();}}
              type="button"
              className="text-red-600 w-1/3 inline-flex justify-center items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-1 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                />
              </svg>
              Discard
            </button>

            {/* </div>
    <div> */}
            <button
              type="button"
              onClick={handleAdduser}
              className="text-green-600 inline-flex justify-center items-center w-1/3 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
            >
              {/* <svg aria-hidden="true" className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            </svg> */}
              Add Asset
            </button>
            {/* </div> */}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 sm:w-1/2"></div>
    </form>
  </section>
  )
}

export default AddUser