import { useParams } from "react-router-dom";
import Footer from "../Components/Common/Footer";
import { useEffect, useState } from "react";
import { apiConnector } from "../Services/apiConnector";
import { categories } from "../Services/apis";
import { getCatalogPageData } from "../Services/operation/pageAndComponentData";
import Course_Card from "../Components/Core/Catalog/Course_Card";
import CourseSlider from "../Components/Core/Catalog/CourseSlider";



function Catalog(){

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");


    // fetch all categories
    useEffect(() => {
        const getCategories = async() => {
            // console.log("before api call");
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("after api call");
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;

            setCategoryId(category_id);
        }
        getCategories();
    }, [catalogName]);

    // console.log("catalog name : ", catalogName);
    // console.log("category_id : ", categoryId);


    useEffect(() => {
        if (!categoryId) return;
        const getCategoryDetail = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(error){
                console.log(error);
            }
        }
        getCategoryDetail();
    }, [categoryId])

    // console.log("catalogPageData : ", catalogPageData);




    return (
        <div>
            <div className="text-richblack-5 w-full">
                
                <div className="bg-richblack-800 h-60 flex items-center p-4">
                    <div className="w-11/12 mx-auto flex flex-col gap-7"> 
                        <p className="text-richblack-300 text-sm">
                            {`Home / Catalog / `}
                            <span className="text-yellow-50">{catalogPageData?.data?.selectedCategory?.name}</span>
                        </p>
                        <p className="text-3xl">{catalogPageData?.data?.selectedCategory?.name}</p>
                        <p className="text-richblack-200 text-sm">{catalogPageData?.data?.selectedCategory?.description}</p>
                    </div>
                </div>

                <div>

                    {/* Section 1  */}
                    <div className="w-11/12 mx-auto mt-10">
                        <div className="text-3xl font-semibold">Courses to get you started</div>
                        <p className="underline text-yellow-50 mt-3">Most popular</p>
                        <div className="mt-3">
                            <CourseSlider Courses = {catalogPageData?.data?.selectedCategory?.courses}/>
                        </div>
                        
                    </div>

                    {/* Section 2  */}
                    <div className="w-11/12 mx-auto mt-10">
                        <p className="text-3xl font-semibold">Top Courses in {catalogPageData?.data?.selectedCategory?.name} </p>
                        <div className="mt-3">
                            <CourseSlider Courses = {catalogPageData?.data?.differentCategory?.courses}/>
                        </div>
                    </div>

                    {/* Section 3  */}
                    <div className="w-11/12 mx-auto mt-10">
                        <p className="text-3xl font-semibold">Frequently Bought Together</p>

                        <div className="py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {
                                    catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                                    .map((course, index) => (
                                        <Course_Card key={index} course = {course}/>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </div>

                <Footer/>

            </div>
        </div>
    )
}


export default Catalog;