import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";




const singleSpot = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots)
    console.log("this is spot", spot);


    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch])

    return (
        null
    )
}


export default singleSpot;
