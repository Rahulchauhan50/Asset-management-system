import React, { useEffect, useRef, useState } from "react";
import { useAddAssetMutation, useGetAllUserQuery } from "../redux/services/UserApi";
import PhotoPicker from "./PhotoPicker";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function AddAsset() {
  const location = useLocation();
  const { users } = useGetAllUserQuery();
  const { data } = location.state || {};

  const [AddAsset] = useAddAssetMutation();
  const [productImageUpload,setproductImageUpload] = useState(null)
  const [productImage, setproductImage] = useState(false)
  const [grabPhoto, setgrabPhoto] = useState(false)

  // Item Description
  const [Description, setDescription] = useState(data?.item_description?.Description)
  const [idTag, setidTag] = useState(data?.item_description?.ID_Tag)
  const [assetName, setassetName] = useState(data?.item_description?.Asset_Name)
  const [Category, setCategory] = useState(data?.item_description?.Category)
  const [purchaseDate, setpurchaseDate] = useState(data?.Purchase_Information?.purchaseDate)
  const [Supplier, setSupplier] = useState(data?.Purchase_Information?.Supplier)
  const [warrantyExpire, setwarrantyExpire] = useState(data?.Purchase_Information?.warranty_Expire)
  const [Price, setPrice] = useState(data?.Purchase_Information?.Price)
  const [Condition, setCondition] = useState(data?.Quantity_and_value?.Condition)
  const [unitvalue, setunitvalue] = useState(data?.Quantity_and_value?.Unit_value)
  const [Qyt, setQyt] = useState(data?.Quantity_and_value?.Qyt)
  const [Value, setValue] = useState(data?.Quantity_and_value?.Value)
  const [serialNo, setserialNo] = useState(data?.Items_Details?.Serial_No)
  const [modelNo, setmodelNo] = useState(data?.Items_Details?.Model_No)
  const [AMC, setAMC] = useState(data?.Items_Details?.AMC)
  const [Room, setRoom] = useState(data?.Location?.Room)
  const [deptArea, setdeptArea] = useState(data?.Location?.Dept_area)
  const [assignedto, setassignedto] = useState(data?.Location?.assignedto)


  const setassetNamee = (e) => {
    setassetName(e.target.value)
    console.log(assetName)
  }

  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    setproductImageUpload(file)
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = function (event){
      data.src = event.target.result;
      data.setAttribute("data-src",event.target.result)
    }
    reader.readAsDataURL(file)
    setTimeout(()=>{
      setproductImage(data.src)
    },3000)

  }

  const handleAddAsset = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append("Description", Description);
        formData.append("ID_Tag", idTag);
        formData.append("Asset_Name", assetName);
        formData.append("Category", Category);
        formData.append("purchaseDate", purchaseDate); 
        formData.append("Supplier", Supplier);
        formData.append("warranty_Expire", warrantyExpire);
        formData.append("Price", Price);
        formData.append("Condition", Condition);
        formData.append("Unit_value", unitvalue);
        formData.append("Qyt", Qyt);
        formData.append("value", Value);
        formData.append("Serial_No", serialNo);
        formData.append("Model_No", modelNo);
        formData.append("AMC", AMC);
        formData.append("Room", Room);
        formData.append("Dept_area", deptArea);
        formData.append("assignedto", assignedto);
        formData.append("image", productImageUpload);
        console.log(formData)
        if(data){
          formData.append("id", data._id);
          const reponse = await axios.post(`https://asset-backend-wxnd.onrender.com/data/update-asset`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        console.log(reponse)

        }else{
          const { data } = await axios.post('https://asset-backend-wxnd.onrender.com/data/add-asset', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        console.log(data);
        }

       

    } catch (error) {
        console.log(error);
    }
}






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

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 sm:p-5 antialiased p-4 sm:ml-64 no-scrollbar h-full max-h-screen overflow-auto">
        <form
          id="drawer-update-product"
          className=" z-40 w-full h-auto p-4 overflow-y-auto bg-white dark:bg-gray-900"
          tabIndex="1"
          aria-labelledby="drawer-update-product-label"
          onSubmit={handleAddAsset}
        >
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            New Asset
          </h5>

          <div className="flex flex-col justify-between my-8 dark:bg-gray-800 bg-gray-50 rounded-2xl">
            <div className="flex justify-center bottom-1 border-solid border-b-white bg-gray-50 dark:bg-[#374151] py-4 text-gray-900 dark:text-white rounded-2xl">
              Item Description
            </div>
            <div className="flex justify-between flex-col md:flex-row m-8">
              <div className="lg:w-[75%] w-full">
                <label
                  htmlFor="description"
                  className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
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
                    value={Description}
                    onChange={(e)=>setDescription(e.target.value)}
                      id="description"
                      rows="8"
                      required
                      className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="Write product description here"
                    >
                      {data?.item_description?.Description}
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="lg:w-[20%] w-full">
                <div className="my-4">
                  <label
                    htmlFor="name"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ID Tag
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={idTag}
                    onChange={(e)=>setidTag(e.target.value)}
                    placeholder="Type Id tag"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="name"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Asset Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={assetName}
                    onChange={(e)=>setassetNamee(e)}
                    placeholder="Type Asset name"
                    required
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="name"
                    className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={Category}
                    onSelect={(e)=>setCategory(e.target.value)}
                  >
                    <option value='Electronics' >Monitors</option>
                    <option value='Electronics' >Keyboards</option>
                    <option value='Electronics' >Mouse</option>
                    <option value='Electronics' >CPU</option>
                    <option value='Electronics' >TelePhones</option>
                    <option value='Electronics' >Mac Monitor</option>
                    <option value='Electronics' >Mac Mouse</option>
                    <option value='Electronics' >Mac Keyboard</option>
                    <option value='Electronics' >Mac Laptop</option>
                    <option value='Electronics' >Printers</option>
                    <option value='Electronics' >Fans</option>
                    <option value='Electronics' >AC</option>
                    <option value='Electronics' >Tables</option>
                    <option value='Electronics' >Invertor</option>
                    <option value='Electronics' >Freeze</option>
                    <option value='Electronics' >Microwave</option>
                    <option value='Electronics' >Chairs</option>
                    <option value='Electronics' >Camera</option>
                    <option value='Electronics' >Lights</option>
                    <option value='Electronics' >TV</option>
                    <option value='Electronics' >RO</option>
                    <option value='Electronics' >Induction</option>
                    <option value='Electronics' >wall Camera</option>
                    <option value='Electronics' >Camera</option>
                    <option value='Electronics' >Projector</option>
                    <option value='Electronics' >Other</option>

                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-col rounded-2xl">
            <div className="flex lg:flex-row flex-col  justify-between ">
              <div className="lg:w-[48%] w-full my-2 dark:bg-gray-800 bg-gray-50 rounded-2xl">
                <div className="bottom-1 flex justify-center border-solid border-b-white bg-gray-50 dark:bg-[#374151] text-gray-900 dark:text-gray-50 py-4 rounded-2xl">
                  Purchase Information
                </div>
                <div className="p-4">
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={purchaseDate}
                      onChange={(e)=>setpurchaseDate(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={Supplier}
                      onChange={(e)=>setSupplier(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Supplier name"
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      warranty Expire
                    </label>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={warrantyExpire}
                      onChange={(e)=>setwarrantyExpire(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={Price}
                      onChange={(e)=>setPrice(e.target.value)}
                      placeholder="Type price in rupees"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-[48%] w-full my-2 dark:bg-gray-800 bg-gray-50 rounded-2xl">
                <div className="bg-gray-50 flex justify-center dark:bg-[#374151] text-gray-900 dark:text-gray-50 bottom-1 border-solid border-b-white py-4 rounded-2xl">
                  Quantity and value
                </div>
                <div className="p-4">
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Condition
                    </label>
                    <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={Condition}
                    onSelect={(e)=>setCondition(e.target.value)}
                  >
                    <option  value="Excellent" >Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Poor">Poor</option>
                    <option value="Very poor">Very poor</option>
                  </select>
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Unit value
                    </label>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Unit value"
                      value={unitvalue}
                      onChange={(e)=>setunitvalue(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Qyt
                    </label>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Quantity"
                      value={Qyt}
                      onChange={(e)=>setQyt(e.target.value)}
                      required
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      value
                    </label>
                    <input
                      type="number"
                      value={Value}
                      onChange={(e)=>setValue(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl my-8">
            <div className="flex justify-between lg:flex-row flex-col ">
              <div className="lg:w-[48%] w-full my-2 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="bg-gray-50 flex justify-center dark:bg-[#374151] text-gray-900 dark:text-gray-50 bottom-1 border-solid border-b-white  py-4 rounded-2xl">
                  Uplaod Product Image
                </div>
                <div className="p-4" onClick={()=>{ setgrabPhoto(true)}} >
                  <div className="flex items-center justify-center w-full">
                    
                  {
                    productImage?<img alt="hg" src={productImage} ></img>:  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    {/* <input id="dropzone-file" type="file" className="hidden" /> */}
                  </label>

                  }

                    {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
                  </div>
                </div>
              </div>
              <div className="lg:w-[48%] w-full my-2 dark:bg-gray-800 bg-gray-50 rounded-2xl">
                <div className="flex justify-center bg-gray-50 dark:bg-[#374151] text-gray-900 dark:text-gray-50 bottom-1 border-solid border-b-white py-4 rounded-2xl">
                  Items Details
                </div>
                <div className="p-4">
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Serial No.
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product Serial No."
                      value={serialNo}
                      onChange={(e)=>setserialNo(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Model No.
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      value={modelNo}
                      onChange={(e)=>setmodelNo(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="name"
                      className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      AMC
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product Link"
                      value={AMC}
                      onChange={(e)=>setAMC(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between my-8 dark:bg-gray-800 bg-gray-50  rounded-2xl">
            <div className="flex justify-center bg-gray-50 dark:bg-[#374151] text-gray-900 dark:text-gray-50 bottom-1 border-solid border-b-white py-4 rounded-2xl">
              Location
            </div>
            <div className="flex justify-between m-8 lg:flex-row flex-col">
              <div className="lg:w-[30%] w-full my-2">
                <label
                  htmlFor="name"
                  className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <select
                    id="category"
                    value={Room}
                    onSelect={(e)=>setRoom(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value='Electronics' >Reception lift area</option>
                    <option value='Electronics' >Reception</option>
                    <option value='Electronics' >Meeting Room-1</option>
                    <option value='Electronics' >Meeting Room-2</option>
                    <option value='Electronics' >Admin Room (cabin-1)</option>
                    <option value='Electronics' >Ajay sir Cabin (cabin-2)</option>
                    <option value='Electronics' >CEO Cabin (cabin-3)</option>
                    <option value='Electronics' >Tarun sir Cabin (cabin-4)</option>
                    <option value='Electronics' >Media (cabin-4)</option>
                    <option value='Electronics' >(cabin-6)</option>
                    <option value='Electronics' >(cabin-7)</option>
                    <option value='Electronics' >(cabin-8)</option>
                    <option value='Electronics' >HR cabin (cabin-9)</option>
                    <option value='Electronics' >cabin-11</option>
                    <option value='Electronics' >Board Room (cabin-12)</option>
                    <option value='Electronics' >cabin-13</option>
                    <option value='Electronics' >Studio (cabin-14)</option>
                    <option value='Electronics' >Pentry</option>
                    <option value='Electronics' >Others</option>

                  </select>
              </div>

              <div className="lg:w-[30%] w-full my-2">
                <label
                  htmlFor="name"
                  className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Depatment
                </label>
                <select
                    id="category"
                    value={deptArea}
                    onSelect={(e)=>setdeptArea(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value='Electronics' >Creative</option>
                    <option value='Electronics' >Graphics</option>
                    <option value='Electronics' >CS</option>
                    <option value='Electronics' >Sales</option>
                    <option value='Electronics' >Presales</option>
                    <option value='Electronics' >Finance</option>
                    <option value='Electronics' >HR</option>
                    <option value='Electronics' >It</option>
                    <option value='Electronics' >Admin</option>
                    <option value='Electronics' >Media</option>
                    <option value='Electronics' >BTL</option>
                    <option value='Electronics' >ATL</option>
                    <option value='Electronics' >Digital</option>
                    <option value='Electronics' >Management</option>
                    <option value='Electronics' >other</option>

                  </select>
              </div>
              <div className="lg:w-[30%] w-full my-2">
                <label
                  htmlFor="name"
                  className="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Assigned to
                </label>
                <select
                    id="category"
                    value={assignedto}
                    onSelect={(e)=>setassignedto(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {
                      users?.map((ele, i)=>{
                        return <option key={i} value={ele?.name} >{ele?.name}</option>
                      })
                    }
                    
                    <option value='Electronics' >Shubham</option>
                    <option value='Electronics' >Yogesh</option>
                    <option value='Electronics' >Sanjay</option>
                  </select>
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
              type="submit"
              onClick={handleAddAsset}
              className="text-green-600 inline-flex justify-center items-center w-1/3 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
            >
              {data?"Update Asset":"Add Asset"}
            </button>
    
           
           
            {/* </div> */}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 sm:w-1/2"></div>
        </form>
      </section>
    </>
  );
}

export default AddAsset;
