import { IconBase } from "react-icons";
import IconButton from "./IconButton"


function ConfirmationModal({modalData}){
    return (
        <div>
            <div>
                <p>
                    {modalData.text1}
                </p>
                <p>
                    {modalData.text2}
                </p>
                <div>
                    <IconButton
                        onClick = {modalData?.onClick}
                        text = {modalData?.text}
                    />
                    <button onClick={modalData?.btn2Handler}>
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;