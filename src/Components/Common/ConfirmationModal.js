import { VscSignOut } from "react-icons/vsc";


function ConfirmationModal({modalData}){
    return (
        <div className="text-white border-[1px] border-white">
            <div className="flex flex-col items-center">
                <p>
                    {modalData.text1}
                </p>
                <p>
                    {modalData.text2}
                </p>
                <div className="flex gap-4 items-center">
                    <button onClick = {modalData?.btn1Handler}>
                        {modalData?.btn1Text}
                    </button>
                    <button onClick={modalData?.btn2Handler}>
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;