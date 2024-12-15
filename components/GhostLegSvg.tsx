import {
  characterColorArr,
  characterImageArr,
  globalColor,
} from "@/styles/globalStyle";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import styled from "styled-components/native";

const GhostLegSvg = ({ cases }: { cases: string[] }) => {
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [numPlayers, setNumPlayers] = useState(cases.length); // 기본 인원 수
  const [horizontalLines, setHorizontalLines] = useState<boolean[][]>([]); // 랜덤 수평선 데이터
  const [paths, setPaths] = useState<{ color: string; path: string }[]>([]);

  // 사다리 생성 함수
  const generateLadder = () => {
    const lines = [];
    const levels = 10; // 사다리의 높이 레벨

    for (let i = 0; i < levels - 1; i++) {
      // 마지막 레벨에는 선 긋지 않기
      const horizontal: boolean[] = [];
      for (let j = 0; j < numPlayers - 1; j++) {
        // 이전 수평선의 값을 확인하여 중복 방지
        const hasLeftLine: boolean = j > 0 ? horizontal[j - 1] : false; // 이전 수직선 확인
        horizontal.push(!hasLeftLine && Math.random() > 0.5); // 겹치지 않게 수평선 생성
      }
      lines.push(horizontal);
    }
    setHorizontalLines(lines);
  };

  // 경로 추적 함수
  const tracePath = (startIndex: number) => {
    let currentX = startIndex;
    const path = [];
    const gapX = svgSize.width / (numPlayers - 1);
    const gapY = svgSize.height / 10;

    let currentY = 0;
    path.push(`M${currentX * gapX},${currentY}`); // 시작점

    for (let level = 0; level < horizontalLines.length; level++) {
      const nextY = currentY + gapY;

      // 수직선 따라 아래로 이동
      path.push(`L${currentX * gapX},${nextY}`);
      currentY = nextY;

      // 수평선을 만나면 90도 이동
      if (currentX > 0 && horizontalLines[level][currentX - 1]) {
        // 왼쪽으로 이동
        currentX -= 1;
        path.push(`L${currentX * gapX},${currentY}`);
      } else if (
        currentX < numPlayers - 1 &&
        horizontalLines[level][currentX]
      ) {
        // 오른쪽으로 이동
        currentX += 1;
        path.push(`L${currentX * gapX},${currentY}`);
      }
    }

    // 마지막 수직선 따라 아래로 이동
    path.push(`L${currentX * gapX},${svgSize.height}`);

    return path.join(" ");
  };

  useEffect(() => {
    generateLadder();
  }, []);

  return (
    <SvgContainer
      width="90%"
      height="60%"
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setSvgSize({ width, height }); // 동적으로 사다리 생성
      }}
    >
      {/* 수직선 그리기 */}
      {Array.from({ length: numPlayers }).map((_, index) => {
        const gap = svgSize.width / (numPlayers - 1); // 동적으로 계산된 너비 사용
        return (
          <Line
            key={`vertical-${index}`}
            x1={index * gap}
            y1={0}
            x2={index * gap}
            y2={svgSize.height} // 동적으로 계산된 높이 사용
            stroke="black"
            strokeWidth={2}
          />
        );
      })}

      {/** 수평선 그리기 */}
      {horizontalLines.map((level, i) =>
        level.map((hasLine, j) => {
          if (!hasLine) return null; // 수평선이 없으면 건너뛰기

          // 인접한 두 수직선 사이에만 수평선을 그리도록 좌표 계산
          const gap = svgSize.width / (numPlayers - 1); // 수직선 간 간격
          const x1 = j * gap; // 현재 수직선 위치
          const x2 = (j + 1) * gap; // 다음 수직선 위치
          const y = (i + 1) * (svgSize.height / 10); // 수평선 높이 위치

          return (
            <Line
              key={`horizontal-${i}-${j}`}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="black"
              strokeWidth={2}
            />
          );
        })
      )}

      {/* 경로 그리기 */}
      {Array.from({ length: numPlayers }).map((_, index) => (
        <Path
          key={`path-${index}`}
          d={tracePath(index)}
          stroke={characterColorArr[index]} // 각 경로에 다른 색상 적용
          strokeWidth={2}
          fill="none"
        />
      ))}

      {/** 아이콘 추가 */}
      {Array.from({ length: numPlayers }).map((_, index) => {
        const gap = svgSize.width / (numPlayers - 1);
        const iconSize = 40; // 아이콘 크기

        return (
          <Image
            key={`icon-${index}`}
            source={characterImageArr[index]}
            style={{
              width: iconSize,
              height: iconSize,
              position: "absolute",
              left: index * gap - iconSize / 2, // 아이콘을 수직선 중심에 배치
              top: -30, // 맨 위에 배치
            }}
            resizeMode="contain" // 아이콘 비율 유지
          />
        );
      })}
    </SvgContainer>
  );
};

export default GhostLegSvg;

const SvgContainer = styled(Svg)`
  /* background-color: pink; */
  margin-top: 25%;
  padding: 16px;
`;
