import HighlightText from "../HomePage/HighlightText";



function Quote(){
    return (
        <div className="text-richblack-100 text-3xl w-[70%] text-center">
            We are passionate about revolutionizing the way we learn. Our innovative platform 
            <HighlightText text={"combines technology"}/>
            <span className="text-brown-100 font-bold">
                {", "}
                expertise
            </span>
            , and community to create an 
            <span className="text-brown-100 font-bold">
                {" "}
                unparalleled educational experience
            </span>
        </div>
    )
}

export default Quote;