import {AiFillStar, AiOutlineStar} from "react-icons/ai"

type Props = {
    rating:number;
    onClick?:(value:number)=>void;
    style?:{}
}

const Rating = ({rating, onClick, style}: Props) => {
  return (
    <span>
        {
            [...Array(5)].map((_,i)=>{
                return (
                    <span style={style} onClick={()=> onClick && onClick(i)}>
                    {
                        rating > i ?
                        <AiFillStar fontSize="25px"/>
                        :
                        <AiOutlineStar fontSize="25px"/>
                    }
                    </span>
                )
            })
        }

    </span>
  )
}

export default Rating