export const dayFormat= (date)=>{
    let datearr = date.split(" ")[0].split("-");
    return(datearr[0]+"년 "+Number(datearr[1])+"월 " + Number(datearr[2])+"일" + " " +  date.split(" ")[1]);
}