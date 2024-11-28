import React, { useState, useEffect } from "react";

// Function to return the current timestamp in "년 월 일" and "시간:분:초" format
const useTimestamp = (): { date: string; time: string } => {
  const [timestamp, setTimestamp] = useState<{ date: string; time: string }>({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateTimestamp = () => {
      const currentTimestamp = new Date();

      // "2024년 11월 27일" 형식으로 날짜 포맷팅
      const date = `${currentTimestamp.getFullYear()}년 ${String(
        currentTimestamp.getMonth() + 1
      ).padStart(2, "0")}월 ${String(currentTimestamp.getDate()).padStart(
        2,
        "0"
      )}일`;

      // "14:31:36" 형식으로 시간 포맷팅
      const time = `${String(currentTimestamp.getHours()).padStart(
        2,
        "0"
      )}:${String(currentTimestamp.getMinutes()).padStart(2, "0")}:${String(
        currentTimestamp.getSeconds()
      ).padStart(2, "0")}`;

      // 날짜와 시간을 상태로 업데이트
      setTimestamp({ date, time });
    };

    updateTimestamp(); // Set the initial timestamp
    const intervalId = setInterval(updateTimestamp, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return timestamp;
};

export default useTimestamp;
