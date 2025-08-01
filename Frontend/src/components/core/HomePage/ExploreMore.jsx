import React, { useState } from 'react'
import HighlightText from './HighlightText';

import { HomePageExplore } from "../../../data/homepage-explore.js";

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill Paths",
    "Career paths"
];
function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const[courses, setCourses] = useState(HomePageExplore[0].courses);
    const[currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses[0].heading);
         setCurrentCard(result[0].courses[0].heading);
    } 

  return (
    <div>
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>

      <p className="text-center text-richblack-300 text-sm text-[16px] mt-3 mb-5">
        Learn to build anything you can imagine
      </p>
      <div className='flex flex-box rounded-full bg-richblack-800 gap-4 mb-4 px-2 py-2'>
            {tabName.map((element, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 
                        ${
                          currentTab === element
                            ? " font-medium"
                            : "text-richblack-200"
                        } rounded-full tramsition-all duration-200 cursor-pointer 
                     hover:bg-richblack-900 hover:text-richblack-5 px-4 py-2`}
              key={index}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreMore
