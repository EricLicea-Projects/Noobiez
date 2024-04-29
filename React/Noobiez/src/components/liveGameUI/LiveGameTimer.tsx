import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

interface Props {
  initialSeconds: number;
}

const LiveCardTimer = ({ initialSeconds }: Props) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertSecondsToMMSS = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return <Text mr={10}>Time: {convertSecondsToMMSS(seconds)}</Text>;
};

export default LiveCardTimer;
