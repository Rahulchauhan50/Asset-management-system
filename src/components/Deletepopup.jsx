import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useDeleteAssetMutation, useDeleteNoteMutation } from '../redux/services/UserData';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


export default function Deletepopup() {
  const { Msg } = useSelector((state) => state.UserAuth);
  const dispatch = useDispatch()
  const cancelButtonRef = useRef(null)
  const [deleteFolder, { isLoading: deleteFolderLoading }] = useDeleteAssetMutation();

  const handleDelete = () => {
    if (Msg.message === 'Note') {
      deleteFolder({ folderNameToDelete: Msg.name })
        .unwrap()
        .then((data) => {
          if (data?.success === true) {
            console.log("folder Delete successfully")
            dispatch(SetMsg({ open: false, name: null, message: null }))
          }
        })
        .catch((error) => {
          console.log("some error occured", error)
        });
    }
  }

  return (
    <Transition.Root show={Msg.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { dispatch(SetMsg({ open: false, name: null, message: null })) }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-[0.5] transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-slate-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete <span className='font-semibold text-red-700'>"{Msg.name}"</span>
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete <span className='font-semibold'>"{Msg.name}"</span>? {Msg.message} will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  
                  <button onClick={handleDelete} type="button" class="inline-flex items-center md:mx-4 w-full px-4 justify-center rounded-md bg-red-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto" disabled="">
                  {
                     deleteFolderLoading? <svg class="animate-spin mx-[10px] w-[20px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>:"Delete"
                  }
                    
                    </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-300 outline-none border-2 hover:border-slate-400 sm:mt-0 sm:w-auto"
                    onClick={() => { dispatch(SetMsg({ open: false, name: null, message: null })) }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}