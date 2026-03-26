import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { buyCourse } from "../../../../Services/operation/StudentFeaturesAPI"
import IconBtn from "../../../Common/IconButton"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    console.log("handleBuyCourse clicked")
    const courses = cart.map((course) => course._id)
    console.log("courses = ", courses);
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="w-full xl:min-w-[300px] h-fit rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg">
      
      {/* Heading */}
      <h2 className="text-lg font-semibold text-richblack-5 mb-4">
        Order Summary
      </h2>

      {/* Divider */}
      <div className="h-[1px] w-full bg-richblack-700 mb-4" />

      {/* Total Section */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-richblack-300">Total Amount</p>
        <p className="text-xs text-richblack-400">{cart.length} Courses</p>
      </div>

      <p className="text-3xl text-yellow-50 mb-6">
        ₹ {total}
      </p>

      {/* Buy Button */}
      
      <IconBtn
        text="Proceed to Buy"
        onClick={handleBuyCourse}
        customClasses="w-full justify-center items-center rounded-md p-2 font-bold bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200"
      />

      {/* Extra Info */}
      <p className="text-xs text-richblack-200 mt-4 text-center">
        Secure payment powered by Razorpay
      </p>
    </div>
  )
}