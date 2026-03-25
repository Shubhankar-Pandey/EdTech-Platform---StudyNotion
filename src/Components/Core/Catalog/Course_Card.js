import { NavLink } from "react-router-dom";
import RatingStars from "../../Common/RatingStars"
import GetAvgRating from "../../../utils/avgRating";
import { useEffect, useState } from "react";




function Course_Card({course}){

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReview);
        setAvgReviewCount(count);
    }, [course])


    return (
        <div className="text-richblack-5 p-4">
            <NavLink to={`/courses/${course._id}`}>
                <div>
                    <div>
                        <img alt="Course Thumbnail" src={course?.thumbnail}
                        className="rounded-xl"/>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <p>{course?.courseName}</p>
                        <p> <span className="text-richblack-300">Instructor :</span> {course?.instructor?.firstName} {course?.instructor?.lastName} </p>
                        <div className="flex gap-x-3">
                            <span className="text-yellow-50"> {avgReviewCount || 0} </span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span> {course?.ratingAndReview?.length} Ratings </span>
                        </div>
                        <p> Rs. {course?.price} </p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}


export default Course_Card;