import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../Slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col gap-6">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className="flex flex-col xl:flex-row gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-5 shadow-md hover:shadow-lg transition-all duration-200"
        >
          {/* Left Section */}
          <div className="flex flex-1 flex-col md:flex-row gap-4">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-auto md:h-[140px] w-full md:w-[220px] rounded-lg object-cover aspect-video md:aspect-auto"
            />

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-richblack-5">
                  {course?.courseName}
                </p>

                <p className="text-sm text-richblack-300 mt-1">
                  {course?.category?.name}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-50 font-medium">4.5</span>

                  <ReactStars
                    count={5}
                    value={course?.ratingAndReviews?.length}
                    size={18}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />

                  <span className="text-richblack-400 text-sm">
                    ({course?.ratingAndReviews?.length} Ratings)
                  </span>
                </div>
              </div>

              {/* Remove Button (mobile placement) */}
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="xl:hidden mt-3 w-fit flex items-center gap-1 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-pink-200 hover:bg-richblack-600 transition-all"
              >
                <RiDeleteBin6Line />
                Remove
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex xl:flex-col items-center xl:items-end justify-between xl:justify-start gap-4">
            
            {/* Remove Button (desktop) */}
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="hidden xl:flex items-center gap-1 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-pink-200 hover:bg-richblack-600 transition-all"
            >
              <RiDeleteBin6Line />
              Remove
            </button>

            {/* Price */}
            <p className="text-2xl font-bold text-yellow-50">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}