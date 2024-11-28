import React, { useState, useEffect } from "react";
import TimestampComponent from "../../Module/Timestamp";

// CardContent Props Interface
interface CardContentProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  onClickButton?: () => void;
  buttonText?: string;
  onSubmit?: (inputValue: string) => void;
  children?: React.ReactNode;
  imagePosition?: "left" | "right" | "center"; // 이미지 위치 속성 추가
  borderColor?: string;
}

// CardWrapper Component
const CardWrapper = ({
  children,
  width = "100%",
  boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderColor,
  style = {}, // Allow for additional custom styles
}: {
  children: React.ReactNode;
  width?: string;
  boxShadow?: string;
  borderColor?: string;
  style?: React.CSSProperties; // Accept style prop
}) => {
  return (
    <div
      style={{
        width,
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow,
        ...style, // Apply the passed custom styles
      }}
    >
      {children}
    </div>
  );
};

// Button Component
const Button = ({
  onClick,
  text,
  style = {},
}: {
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 16px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      ...style,
    }}
  >
    {text}
  </button>
);

// CardContent Component
export const CardContent: React.FC<CardContentProps> = ({
  children,
  imageUrl,
  title,
  description,
  onClickButton,
  buttonText,
  onSubmit,
  borderColor,
  imagePosition = "left", // 기본값은 left
}: CardContentProps): JSX.Element | null => {
  const [inputValue, setInputValue] = useState("");

  // 이미지 스타일을 동적으로 설정
  const imageStyle: React.CSSProperties = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    margin: "16px",
  };

  // 이미지 위치에 따른 스타일 처리
  const containerStyle: React.CSSProperties = {
    border: `${borderColor}`,
    padding: "16px",
    textAlign: "center",
    display: "flex",
    flexDirection: imagePosition === "center" ? "column" : "row",
    alignItems: "center",
    justifyContent:
      imagePosition === "center"
        ? "center"
        : imagePosition === "left"
        ? "flex-start"
        : "flex-end",
  };

  return (
    <div style={containerStyle}>
      {/* Conditionally render image based on position */}
      {imagePosition !== "center" && imageUrl && (
        <img src={imageUrl} alt={title} style={imageStyle} />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: imagePosition === "center" ? "center" : "flex-start", // 텍스트 위치 조정
          justifyContent: "center",
          padding: "8px",
        }}
      >
        {/* 이미지가 "center"일 경우, 이미지를 아래로 배치 */}
        {imagePosition === "center" && imageUrl && (
          <img src={imageUrl} alt={title} style={imageStyle} />
        )}
        {/* Conditionally render title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {title && (
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "1.25rem",
              }}
            >
              {title}
            </h3>
          )}
          {/* Conditionally render description (content) */}
          {description && (
            <p
              style={{
                fontSize: "1rem",
                color: "#555",
                whiteSpace: "pre-line",
                margin: "0 auto",
              }}
            >
              {description}
            </p>
          )}
        </div>
        {/* If onSubmit is passed, show the input and submit button */}
        {onSubmit && (
          <div style={{ padding: "16px" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something..."
              style={{
                width: "50%",
                padding: "8px",
                margin: "20px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <Button onClick={() => onSubmit(inputValue)} text="Submit" />
          </div>
        )}
        {/* Render children if passed */}
        {children}
      </div>
    </div>
  );
};

// GenericCard Component (Reusable Card)
const GenericCard = ({
  children,
  title,
  description,
  imageUrl,
  buttonText,
  onClickButton,
  onSubmit,
  imagePosition,
  borderColor,
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  onClickButton?: () => void;
  onSubmit?: (inputValue: string) => void;
  imagePosition?: "left" | "right" | "center"; // 이미지 위치 prop 추가
  borderColor?: string; // Accept borderColor prop
}) => {
  return (
    <CardWrapper borderColor={borderColor}>
      {/* Pass borderColor to CardWrapper */}
      <CardContent
        title={title}
        description={description}
        imageUrl={imageUrl}
        onClickButton={onClickButton}
        buttonText={buttonText}
        onSubmit={onSubmit}
        imagePosition={imagePosition} // 이미지 위치 prop 전달
        borderColor={borderColor} // borderColor를 CardContent로 전달ded
      />
      {buttonText && onClickButton && (
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button onClick={onClickButton} text={buttonText} />
        </div>
      )}
      {children}
    </CardWrapper>
  );
};

// ProfileCard - Profile + Button
export const ProfileCard = ({
  title,
  description,
  imageUrl,
  buttonText,
  onClickButton,
  imagePosition,
  borderColor,
}: {
  title?: string;
  description?: string;
  imageUrl: string;
  buttonText: string;
  onClickButton: () => void;
  imagePosition?: "left" | "right" | "center"; // 이미지 위치 prop 추가
  borderColor?: string; // borderColor prop 추가
}) => {
  return (
    <GenericCard
      title={title}
      description={description}
      imageUrl={imageUrl}
      buttonText={buttonText}
      onClickButton={onClickButton}
      imagePosition={imagePosition} // 이미지 위치 prop 전달
      borderColor={borderColor} // borderColor를 전달
    />
  );
};

// RefreshProfileCard - 제목, 내용, 이미지, 새로고침 버튼
export const RefreshProfileCard = ({
  title,
  content,
  imageUrl,
  onClickRefresh,
  imagePosition = "left", // default image position
  borderColor,
}: {
  title?: string;
  content?: string;
  imageUrl?: string; // Optional imageUrl
  onClickRefresh?: () => void;
  imagePosition?: "left" | "right" | "center"; // Optional imagePosition
  borderColor?: string;
}) => {
  return (
    <GenericCard
      title={title}
      description={content}
      imageUrl={imageUrl}
      buttonText={onClickRefresh ? "Refresh" : undefined} // Only show button if onClickRefresh is provided
      onClickButton={onClickRefresh}
      imagePosition={imagePosition}
      borderColor={borderColor} // borderColor를 CardContent로 전달
    />
  );
};

// InputListProfileCard - 제목, 입력 필드, 버튼, 리스트
export const InputListProfileCard = ({
  title,
  onSubmit,
  imagePosition,
  existingData,
  borderColor,
}: {
  title: string;
  onSubmit: (inputValue: string) => void;
  imagePosition?: "left" | "right" | "center"; // 이미지 위치 prop 추가
  existingData: string[];
  borderColor?: string;
}) => {
  const [inputValue, setInputValue] = useState(""); // 입력값 상태
  const [list, setList] = useState<string[]>([]); // 리스트 상태

  // existingData가 변경될 때마다 list 상태 업데이트
  useEffect(() => {
    setList(existingData); // 부모 컴포넌트에서 전달된 기존 데이터로 초기화
  }, [existingData]);

  // 입력값을 제출하는 함수
  const handleSubmit = () => {
    if (inputValue.trim()) {
      setList((prevList) => [...prevList, inputValue]); // 리스트에 값 추가
      setInputValue(""); // 입력값 초기화
      onSubmit(inputValue); // 부모 컴포넌트로 전달
    }
  };

  return (
    <GenericCard
      title={title}
      imagePosition={imagePosition}
      onSubmit={onSubmit}
      borderColor={borderColor} // borderColor를 CardContent로 전달
    >
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          style={{
            padding: "8px",
            margin: "10px",
            border: `1px solid ${borderColor}`,
            borderRadius: "4px",
            width: "80%",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </GenericCard>
  );
};
