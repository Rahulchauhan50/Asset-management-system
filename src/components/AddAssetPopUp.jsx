import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { SetCreate, setNotexist } from '../redux/features/User'
// import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import AddAsset from './AddAsset';
// import { useAddNoteMutation } from '../redux/services/UserData'

export default function AddAssetPopUp({show}){
  const dispatch = useDispatch()
//   const { Create, Notexist } = useSelector((state) => state.UserAuth);
  const cancelButtonRef = useRef(null)
//   const [addNote, { isLoading: addNoteLoading }] = useAddNoteMutation();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

//   const handleAddNote = (e) => {
//     e.preventDefault();
//     const title = titleRef.current.value;
//     const description = descriptionRef.current.value;

//     addNote({ folderName: Create.name, title, description })
//       .unwrap()
//       .then((data) => {
//         if (data?.success === true) {
//           console.log("folder Delete successfully")
//           dispatch(SetCreate({ open: false, name: null }))
//         }
//       })
//       .catch((error) => {
//         console.log("some error occured", error)
//         if(error.data === "Note already exist"){
//           dispatch(setNotexist(true))
//         }
//       });
//   }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[100] " initialFocus={cancelButtonRef} onClose={() => {}}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-300 text-left shadow-xl transition-all sm:my-8 w-[90vw]">
               
               <AddAsset/>
               
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}







