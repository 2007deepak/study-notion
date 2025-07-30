import React from 'react'

function HighlightText(props) {
  return (
    <span className='font-bold text-blue-300'>
      {" "}
        {props.text}
    </span>
  )
}
export default HighlightText
