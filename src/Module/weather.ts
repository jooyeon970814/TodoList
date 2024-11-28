// weatherModule.ts

export interface WeatherData {
  city: string;
  weather: string;
  temp: number;
}

// 날씨 정보를 가져오는 함수
export const getWeatherByLocation = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const API_KEY = "3af745e55c0152da567c5ffd089f9e00";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    city: data.name,
    weather: data.weather[0].main,
    temp: Math.round(data.main.temp),
  };
};

// 위치 정보를 가져오는 함수
export const getGeoLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("위치 서비스가 지원되지 않습니다."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치 정보 성공적으로 가져옴
          resolve(position); // position 객체를 resolve
        },
        (err) => {
          // 위치 정보 가져오기 실패
          console.error("위치 정보 오류: ", err);
          reject(new Error("위치 정보를 가져오는 데 실패했습니다.")); // 오류 메시지 반환
        }
      );
    }
  });
};
