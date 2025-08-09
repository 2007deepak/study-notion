import CTAButton from "../HomePage/CTAButton.jsx";
import HighlightText from "../HomePage/HighlightText.jsx";
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from  "react-type-animation";

function CodeBlocks({position,heading,subheading,ctabtn1,ctabtn2,codeblock,gradient,codeColor}) {
  return (
    <div className={`flex  ${position} my-20 justify-between gap-10`}>
      {/*Section 1 */}

      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className=" h-fit flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] relative">
        {/*HW -> BG gradiant*/}
        <div
          className={`absolute -inset-1 rounded-lg blur-2xl opacity-50 z-0 animate-pulse bg-gradient-to-br ${gradient}`}
          
        ></div>

        {/* Actual Code Box */}
        <div className="relative z-10 w-full bg-richblack-800/50 rounded-md p-4 text-sm min-h-[300px] overflow-y-auto ">
          <div className="flex">
            <div className="text-richblack-400 font-inter font-bold pr-4 text-right select-none">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
            </div>

            <div
              className={`w-[90%] flex flex-col gap-2 font-bold text-lg font-mono ${codeColor} pr-2 `}
            >
              <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                  whiteSpace: "pre-line",
                  display:"block",
                }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks
