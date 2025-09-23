import { useState } from "react"

import { StarIcon } from "components/icons"


const StarRating = ({ setRating, inActive, initialValue, sm }) => {
    const _initial = [
        { filled: true },
        { filled: false },
        { filled: false },
        { filled: false },
        { filled: false }
    ]
    const initial = initialValue ? _initial.map((item, index) => {
      return   initialValue >= (index + 1) ? {filled: true} : { filled: false }
    }) : _initial

    const [ stars, setStars] = useState(initial);

    const handleOver = (i) => {
        if (inActive) return;
        setStars(stars.map((star, index)=> (i >= index ? {filled: true} : { filled: false }) ))
        setRating(i + 1)
    }

    const width = sm ? '16px' : '28px'
    const styles = { width: width, color: '#FFB74D', transition: 'all 0.2s', cursor: 'pointer' }
    const makeStyles = (elem) => ({ ...styles, color: elem.filled ? '#FFB74D' : '#616161' })

    return (
        <div className="flex flex-row items-center my-1">
            {stars.map((elem, i) => {
                return (
                    <span key={i} onMouseEnter={() => handleOver(i)} className="m-[2px] text-xl ">
                        <StarIcon   style={ makeStyles(elem)} />
                    </span>
                )
            })}
        </div>
    )
}

export default StarRating

// const StarRating = ({ setRating }) => {
//     const initial = [
//         { filled: true },
//         { filled: false },
//         {  filled: false },
//         { filled: false },
//         { filled: false }
//     ]
//     const [ stars, setStars] = useState(initial);

//     const handleOver = (i) => {
//         setStars(stars.map((star, index)=> (i >= index ? {filled: true} : { filled: false }) ))
//         setRating(i + 1)
//     }

//     const styles = { width: '28px', color: '#FFB74D', transition: 'all 0.2s', cursor: 'pointer' }
//     const makeStyles = (elem) => ({ ...styles, color: elem.filled ? '#FFB74D' : '#616161' })

//     return (
//         <div className="flex flex-row items-center my-2">
//             {stars.map((elem, i) => {
//                 return (
//                     <span key={i} onMouseEnter={() => handleOver(i)} className="m-1 text-xl ">
//                         <StarIcon   style={ makeStyles(elem)} />
//                     </span>
//                 )
//             })}
//         </div>
//     )
// }

// export default StarRating