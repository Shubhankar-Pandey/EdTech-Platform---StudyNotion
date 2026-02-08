


function IconButton({text, onClick, children, disabled,
     outline = false, customClasses, type}){

    return (
        <button
            type = {type}
            disabled = {disabled}
            onClick={onClick}
        >
            {
                children ? 
                (   
                    <>
                        <span>{text}</span>
                        {children}
                    </>
                )
                : ( text)
            }
        </button>
    )
}

export default IconButton;