
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from  "../components/core/HomePage/CTAButton.jsx";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks.jsx"
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

        <div>
          Empower Your Future With Coding Skills
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 text-center text-lg font-bold text-richblack-300">
          With our online coding course, you can learn at your own pace, from
          anywhre in the
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className=" mx-3 my-12 shadow-blue-200 w-full max-w-[1000px]  ">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/*Code Section 1 */}
        <div className=" max-w-[1000px]">
          <CodeBlocks
            position={"lg: flex-row"}
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
          ></CodeBlocks>
        </div>

        {/*Code Section 1 */}
        <div className=" max-w-[1000px]">
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
          ></CodeBlocks>
        </div>
      </div>
      {/*Section2 */}
      {/*Section3 */}
      {/*Footer */}
    </div>
  );
}

export default Home 
 