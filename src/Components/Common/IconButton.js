


function IconButton({text, onClick, children, disabled,
     outline = false, customClasses, type}){

    return (
        <button className={`${customClasses} flex gap-2`}
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
                : ( text )
            }
        </button>
    )
}

export default IconButton;