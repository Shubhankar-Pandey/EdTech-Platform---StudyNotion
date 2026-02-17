import { useSelector } from "react-redux";




function RenderCartCourses(){

    const {cart} = useSelector((state) => state.cart);

    return (
        <div>
            {
                cart.map((course, index) => (
                    <div key={index}>
                         <p>{course?.courseName}</p>
                         <p>{course?.category?.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses;