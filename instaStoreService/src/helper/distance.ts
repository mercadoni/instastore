const rad   = (x:any)=> {return x*Math.PI/180;}


export default (lat1:any,lon1:any,lat2:any,lon2:any) =>{

  const R:number = 6378.137; //Radio de la tierra en km 
  const dLat = rad( lat2 - lat1 );
  const dLong = rad( lon2 - lon1 );
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
  Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  //aquí obtienes la distancia en metros por la conversion 1Km =1000m
  const d = (R * c )
  return d.toFixed(2) ; 
}