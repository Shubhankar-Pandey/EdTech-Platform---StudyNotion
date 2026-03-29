import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import Course_Card from "./Course_Card";




function CourseSlider({Courses}){
    return (
        <div className="text-richblack-5">
            {
                Courses?.length ? 
                (<div>
                    <Swiper
                        slidesPerView = {1}
                        loop = {Courses?.length > 3}
                        spaceBetween = {50}
                        pagination = {{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules = {[Pagination, FreeMode, Autoplay]}
                        freeMode = {true}
                        breakpoints = {{
                            1024 : {slidesPerView : 3}
                        }}
                        className="max-h-[30rem]"
                    >
                        {
                            Courses?.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <Course_Card course = {course}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>)
                : (<div>
                    <p>No course found</p>
                </div>)
            }
        </div>
    )
}


export default CourseSlider;