
export const url="http://localhost:4000/api/";

export const get= async (path) =>{

        return await fetch(`${url}${path}`, {
            method: 'GET',

        })

    }

