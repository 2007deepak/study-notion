
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from  "../components/core/HomePage/CTAButton.jsx";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks.jsx"
import TimelineSection from "../components/core/HomePage/TimelineSection.jsx"
import LearningLanguageSection  from "../components/core/HomePage/LearningLanguageSection.jsx"
import InstructorSection from "../components/core/HomePage/InstructorSection.jsx"
import ExploreMore from "../components/core/HomePage/ExploreMore.jsx";
import Footer from "../components/common/Footer";

function Home (){
  return (
    <div>
      {/*Section1 */}
      <div
        className="relative mx-auto flex flex-col w-11/12 items-center
      text-white justify-between"
      >
        <Link to="/signup">
          <div
            className=" mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold 
          text-richblack-200 transition-all duration-200 hover:scale-95 w-fit"
          >
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]">
              <p>Become An Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="font-semibold mt-5 text-3xl">
          Empower Your Future With Coding Skills
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-3  sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-richblack-300 max-w-[100%] sm:max-w-[1000px] mx-auto">
          With our online coding course, you can learn at your own pace, from
          anywhre in the world, get access to a wealth of resources,including
          hands-on projects,quizzes,and presonalized feedback from instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className=" relative mx-3 my-12 shadow-blue-200 w-full max-w-[1000px]">
          <div className="relative z-10  overflow-hidden">
            <video muted loop autoPlay>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
          <div className="absolute top-4 left-4 w-full h-full  bg-white z-0"></div>
        </div>

        {/*Code Section 1 */}
        <div className=" max-w-[1100px]">
          <CodeBlocks
            position={" flex md:flex-row flex-col sm:flex-row  "}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and tought by industry expertss who have years of experience in coding and passing about sharing thier knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourse",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css"\nhead>\nbody\nh1><aheref="/">Header</a>\n</h1>`}
            codeColor={"text-yellow-25"}
            gradient="from-[#8B5CF6]/40 via-[#EC4899]/40 to-[#FCD34D]/30"
          ></CodeBlocks>
        </div>

        {/*Code Section 2 */}
        <div className="max-w-[1100px] w-full px-4 mx-auto ">
          <CodeBlocks
            position={"lg: flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold w-[50%]">
                Start
                <HighlightText text={`coding \nin seconds`} />
              </div>
            }
            subheading={
              "Go ahead,give it a try hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css"\nhead>\nbody\nh1><aheref="/">Header</a>\n</h1>`}
            codeColor={"text-yellow-25"}
            gradient="from-[#22D3EE]/40 via-[#6366F1]/40 to-[#A855F7]/30"
          ></CodeBlocks>
        </div>

        <ExploreMore />
      </div>
      {/*Section2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex  flex-col  items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className=" flex flex-row items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col justify-between ">
          <div className="flex flex-col md:flex-row gap-8 md:gap-5  mt-[60px] md:mt-[95px] mb-10">
            <div className=" text-3xl md:text-4xl font-semibold md:w-[45%] w-full md:text-left">
              Get the Skill you need for a
              <HighlightText text={"job that is in demand"} />
            </div>

            <div className="flex flex-col  gap-6 md:gap-10 md:full md:w-[40%] md:items-start items-center md:text-left">
              <div className="text-[16px]">
                This modern StudyNotion is the ditects its own.Today, to be a
                competetive specialist requires more than professional skills.
              </div>
              <div className="w-full flex justify-start md:justify-start">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="font-semibold">Learn more</div>
                </CTAButton>
              </div>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/*Section3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-10 text-pure-greys-50">
          Reviews from other learners
        </h2>
        {/* Review Slider here */}
      </div>
      {/*Footer */}
      <Footer />
    </div>
  );
}

export default Home 
 