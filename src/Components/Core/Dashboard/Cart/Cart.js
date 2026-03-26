import { useSelector } from "react-redux";
import RenderTotalAmount from "./RenderTotalAmount";
import RenderCartCourses from "./RenderCartCourses";



function Cart(){

    const {totalItems, total} = useSelector((state) => state.cart);

    return (
        <div className="text-richblack-5">
            <h1 className="text-3xl">Your Cart</h1>
            <p className="text-richblack-100 mt-5 mb-5 border-b-2 border-richblack-600">{totalItems} Courses in Cart</p>
            {
                total > 0 ? 
                (   
                    <div className="flex flex-col lg:flex-row items-start gap-8 mt-8">
                        <div className="w-full lg:flex-1">
                            <RenderCartCourses/>
                        </div>
                        <div className="w-full lg:w-fit">
                            <RenderTotalAmount/>
                        </div>
                    </div>
                )
                : (<p className="text-xl">Your cart is Empty</p>)
            }
        </div>
    )
}

export default Cart;