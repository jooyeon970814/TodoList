import React, { useEffect, useState } from "react";
import { useTheme } from "./context/theme";
import {
  ProfileCard,
  RefreshProfileCard,
  InputListProfileCard,
} from "./Componet/Card";
import useTimestamp from "./Module/Timestamp";
import {
  getGeoLocation,
  getWeatherByLocation,
  WeatherData,
} from "./Module/weather";
import { useSpring, animated } from "@react-spring/web";

function Modal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (id: string) => void;
}) {
  const [inputId, setInputId] = useState("");

  return (
    <div style={modalOverlayStyles}>
      <div style={modalContainerStyles}>
        <h2 style={modalTitleStyles}>아이디를 입력하세요</h2>
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="아이디를 입력하세요"
          style={inputStyles}
        />
        <div style={buttonContainerStyles}>
          <button
            onClick={() => {
              onSubmit(inputId);
              onClose();
            }}
            style={buttonStyles}
          >
            로그인
          </button>
          <button
            onClick={onClose}
            style={{ ...buttonStyles, backgroundColor: "4" }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

const modalOverlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContainerStyles: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  width: "350px",
  maxWidth: "90%",
  textAlign: "center",
};

const modalTitleStyles: React.CSSProperties = {};

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonContainerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const buttonStyles: React.CSSProperties = {
  padding: "12px 18px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  width: "48%",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const App = () => {
  const { isTheme } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [Guest, setUser] = useState("Guest");
  const [weather, setWeather] = useState<any>(null); // weather 타입 지정
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingData, setExistingData] = useState<string[]>([]);

  const weatherImages: Record<string, string> = {
    Clear: "./Clear.webp", // 맑은 날씨 이미지 (Unsplash)
    Clouds: "./Clouds.webp", // 구름 낀 날씨 이미지
    Rain: "./Rain.webp", // 비오는 날씨 이미지
    Snow: "./Snow.webp", // 눈 오는 날씨 이미지
  };
  const backgroundAnimation = useSpring({
    backgroundImage: weather?.weather
      ? `url(${weatherImages[weather.weather as keyof typeof weatherImages]})`
      : "none", // 날씨에 맞는 배경 이미지 적용
    backgroundSize: "cover", // 배경 이미지가 화면을 덮도록
    backgroundPosition: "center", // 배경 이미지가 중앙에 오도록
    backgroundRepeat: "no-repeat", // 배경 이미지 반복 방지

    config: { duration: 1000 }, // 애니메이션 지속 시간 설정
  });
  const borderColor =
    weather?.weather === "Clear"
      ? "#87CEEB" // Sky blue for clear weather
      : weather?.weather === "Clouds"
      ? "#B0C4DE" // Light steel blue for cloudy weather
      : weather?.weather === "Rain"
      ? "#708090" // Slate gray for rainy weather
      : weather?.weather === "Snow"
      ? "#F0F8FF" // Alice blue for snowy weather
      : "#DCDCDC"; // Default gray if weather is unknown
  const fetchWeather = async () => {
    try {
      const position = await getGeoLocation();
      const { latitude, longitude } = position.coords;
      const weatherData = await getWeatherByLocation(latitude, longitude);
      setWeather(weatherData);
    } catch (err) {
      setError("위치 정보를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchWeather();

    const userFromStorage = localStorage.getItem("User");
    const userInputValue = localStorage.getItem("UserInput");

    if (userInputValue) {
      setExistingData(JSON.parse(userInputValue));
    }
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, [Guest]);

  const { date, time } = useTimestamp();

  const handleLogin = (id: string) => {
    localStorage.setItem("User", id);
    setUser(id);
    setIsModalOpen(false);
  };

  const handleSubmit = (inputValue: string) => {
    const updatedData = [...existingData, inputValue];
    setExistingData(updatedData);
    localStorage.setItem("UserInput", JSON.stringify(updatedData));
    setInputValue("");
  };

  return (
    <animated.div
      className="App"
      style={{
        ...backgroundAnimation,
        minHeight: "100vh",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 4fr",
        gridTemplateRows: "auto auto",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <ProfileCard
          title={`${Guest}`}
          description={`${Guest}님 안녕하세요`}
          imageUrl="https://landhyun.github.io/momentum/img/user.png"
          buttonText={`${Guest !== "Guest" ? "Logout" : "Login"}`}
          imagePosition="center"
          onClickButton={() => {
            if (Guest === "Guest") {
              setIsModalOpen(true);
            } else {
              localStorage.removeItem("User");
              localStorage.removeItem("UserInput");
              setUser("Guest");
              setInputValue("");
              setExistingData([]);
            }
          }}
          borderColor={borderColor}
        />
        <RefreshProfileCard
          title={`${date}`}
          content={`${time}`}
          borderColor={borderColor}
        />
        <RefreshProfileCard
          title="날씨"
          content={`${weather ? weather.city : ""} \n ${
            weather ? weather.weather : "loading.."
          } \n ${weather ? weather.temp + "°C" : ""}`}
          imageUrl="https://landhyun.github.io/momentum/img/weather-news.png"
          imagePosition="right"
          borderColor={borderColor}
        />
      </div>

      {Guest !== "Guest" ? (
        <InputListProfileCard
          title="투두리스트"
          onSubmit={handleSubmit}
          existingData={existingData}
          borderColor={borderColor}
        />
      ) : (
        <div style={{ margin: "0 auto", marginTop: "15%" }}>
          <RefreshProfileCard
            content={`안녕하세요 ${Guest}님, Todolist 사이트에 방문해주셔서 감사합니다. 
            해당 서비스는 아이디를 등록 해주셔야 사용이 가능하십니다. 
            왼쪽 로그인 버튼을 사용해주세요!`}
            borderColor={borderColor}
          />
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleLogin} />
      )}
    </animated.div>
  );
};

export default App;
