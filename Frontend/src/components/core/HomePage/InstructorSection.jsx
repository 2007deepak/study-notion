
import Instructor from  "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";
function InstructorSection() {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 item-center">
        {/* Left Section */}
        <div className=" w-[50%] ">
          <img src={Instructor} alt="" className="shadow-white" />
        </div>

        {/* Right Section */}

        <div className="w-[50%] flex flex-col gap-10 mt-28">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] text-richblack-600  w-[80%]">
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
