export const searchAddressToCoordinate = (address ,setMessage , text) =>{
    setMessage("");
      naver.maps.Service.geocode({
          query: address
      }, function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return setMessage("저장된 주소가 올바르지 않습니다.");
          }
          if (response.v2.meta.totalCount === 0) {
            return setMessage("저장된 주소가 올바르지 않습니다.");
          }
          var item = response.v2.addresses[0];
          insertAddress(item.roadAddress, item.y, item.x , text);
      });
}

export const insertAddress =(address, latitude, longitude , text) => {
      var map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: 19
      });
      var marker = new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(latitude, longitude),
      });
      
      const infoWindow = new naver.maps.InfoWindow({
        content: `
        <div style="padding:13px;">
            <div style="text-align:center; font-size:13px;">${text}</div>
            <a style=" font-size:13px; text-decoration:underline; margin-top:5px;" href="https://map.naver.com/v5/?c=${longitude},${latitude},15,0,0,0,d" 
               target="_blank" style="color:blue; text-decoration:none;">
               네이버 지도에서 보기 >
            </a>
        </div>
        `,
        borderWidth: 1,
        borderColor:"#ddd",
        backgroundColor: '#fff',
        anchorSize: new naver.maps.Size(20, 20),
        anchorSkew: true
    });

    infoWindow.open(map, marker);

  }


  export const searchAddressToCoordinatereturn = (address ) =>{
      naver.maps.Service.geocode({
          query: address
      }, function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
          }
          if (response.v2.meta.totalCount === 0) {
          }
          var item = response.v2.addresses[0];
          return item
      });
}


export  const openNaverMap = (latitude , longitude) => {
    const url = `https://map.naver.com/v5/?c=${longitude},${latitude},15,0,0,0,d`;
    window.location.href = url;
}