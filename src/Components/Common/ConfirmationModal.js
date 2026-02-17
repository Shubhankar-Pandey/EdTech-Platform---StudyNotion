import { VscSignOut } from "react-icons/vsc";


function ConfirmationModal({modalData}){
    return (
        <div className="w-full h-full flex items-center justify-center
        absolute top-0 bg-richblack-100 bg-opacity-50">
            
            <div className="flex flex-col items-center
            bg-black text-richblack-5 p-4 w-[40%]
            border-2 border-richblack-500 rounded-xl text-lg">
                <p>
                    {modalData.text1}
                </p>
                <p>
                    {modalData.text2}
                </p>
                <div className="flex gap-4 items-center mt-5">
                    <button
                        onClick = {modalData?.btn1Handler}
                        className="border-[1px] py-1 px-2
                         border-richblack-700 rounded-md
                         bg-richblack-800
                         hover:scale-95 transition-all duration-200
                         hover:bg-richblack-700
                         flex items-center gap-1 text-pink-200">
                            <VscSignOut/>
                            {modalData?.btn1Text}
                    </button>
                    <button
                        onClick={modalData?.btn2Handler}
                        className="border-[1px] py-1 px-2
                         border-richblack-700 rounded-md
                         bg-richblack-800
                         hover:scale-95 transition-all duration-200
                         hover:bg-richblack-700">
                           {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;