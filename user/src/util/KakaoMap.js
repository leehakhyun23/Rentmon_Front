import React, { useEffect } from "react";

const KakaoMap = ({ address }) => {
  useEffect(() => {
    const initializeMap = (lat, lng) => {
      const { kakao } = window;

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 2,
      };

      const map = new kakao.maps.Map(container, options);

      const markerPosition = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    };

    const loadMap = () => {
        const { kakao } = window;
  
        // Geocoder 객체 생성
        if (kakao && kakao.maps && kakao.maps.services) {
            const geocoder = new kakao.maps.services.Geocoder();

            // 주소를 좌표로 변환
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const { y, x } = result[0];
                    initializeMap(y, x);
                } else {
                    console.error("Geocode was not successful for the following reason: " + status);
                }
            });
        } else {
            console.error("Kakao Maps API의 Geocoder 객체를 로드할 수 없습니다.");
        }
    };
    loadMap();
  }, [address]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
      }}
    ></div>
  );
};

export default KakaoMap;
