import { menucountAction, recentReserveAction, weatherSetAction } from "../store/RecentSlice";
import { getCoordinates } from "./citibaming";
import jaxios from "./jwtUtil";



export const getReserveInfo= async(userid ,dispatch)=>{
    const API_KEY = 'aded7a236492c4b574347a7dc6f3a1db';
    let city;
    let url;
    
    let result = await jaxios.get("/api/user/menucountarray" ,{params:{userid}});
    dispatch(menucountAction({menucount:result.data}));
    
    //최근 예약 조회
    let recentrerve = await jaxios.get("/api/space/getreserve",{params:{userid}});
    
    //최근 예약에 날씨 데이터 삽입
    if(recentrerve.data){
      let space = recentrerve.data.space;
      dispatch(recentReserveAction({recentReserve: recentrerve.data}));
      city = await getCoordinates(space.province + " " + space.town + " " + space.village);
      console.log(city);
      
      if(!city){
        city = "Seoul";
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;
      }else{ url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric&lang=kr`; }
      
       fetchForecast();
     }else{
       dispatch(recentReserveAction({}));
     }

     async function fetchForecast() {
       try {
         let response = await fetch(url);
         let data = await response.json();
         displayForecast(data);
       } catch (error) {
         console.error('날씨 예보 정보를 가져오는데 실패했습니다.', error);
       }
     }

     function displayForecast(data) {
       data.list.forEach(item => {
         if( !item.dt_txt.includes(recentrerve.data.reservestart.split(" ")[0]+" 00:00:00")) return false;
         dispatch(weatherSetAction({weather:{
           temp : item.main.temp,
           description:item.weather[0].description,
           icon :`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
         }}));
        
       });
     }
  }