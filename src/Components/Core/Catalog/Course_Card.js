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
        <div className="text-richblack-5">
            <NavLink to={`/courses/${course._id}`}>
                <div>
                    <div>
                        <img alt="Course Thumbnail" src={course?.thumbnail}
                        className="h-96 rounded-xl"/>
                    </div>
                    <div>
                        <p>{course?.courseName}</p>
                        <p> {course?.instructor?.firstName} {course?.instructor?.lastName} </p>
                        <div className="flex gap-x-3">
                            <span> {avgReviewCount || 0} </span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span> {course?.ratingAndReview?.length} Ratings </span>
                        </div>
                        <p> {course?.price} </p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}


export default Course_Card;