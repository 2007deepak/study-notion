
import Instructor from  "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";
function InstructorSection() {
  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
        {/* Left Section */}

        <div className=" relative w-full md:w-1/2 ">
          <div className="relative z-10  overflow-hidden">
            <img src={Instructor} alt="" className="shadow-white" />
          </div>
          <div className="absolute bottom-4 right-4 w-full h-full  bg-white z-0"></div>
        </div>
        {/* Right Section */}

        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10 mt-10 md:mt-12 items-start">
          <div className="text-3xl md:text-4xl font-semibold w-full md:w-[80%] text-center md:text-left ">
            Become an
            <HighlightText text={"Instructor"} />
          </div>
          <p className="font-medium text-[14px] md:text-[16px] text-richblack-600 w-full md:w-[80%] md:text-center ">
            Instructor from around the world teach millions of students on
            studyNotion. tools and skill to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center py-1 text-base font-semibold ">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection
