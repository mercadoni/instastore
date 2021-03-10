export const COORDINATES="COORDINATES"

export const  getLocation = (lat,lng)=>{

    return {
        type:COORDINATES,
        lat,
        lng
    }


}