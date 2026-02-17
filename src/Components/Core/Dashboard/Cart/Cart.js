import { useSelector } from "react-redux";
import RenderTotalAmount from "./RenderTotalAmount";
import RenderCartCourses from "./RenderCartCourses";



function Cart(){

    const {totalItems, total} = useSelector((state) => state.cart);

    return (
        <div className="text-richblack-5">
            <h1>Your Cart</h1>
            <p>{totalItems} Courses in Cart</p>
            {
                total > 0 ? 
                (   
                    <div>
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                )
                : (<p>Your cart is Empty</p>)
            }
        </div>
    )
}

export default Cart;