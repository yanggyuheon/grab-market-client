// state를 사용하기 위해 React라이브러리의 useState 사용
import React from "react";

function TimerComponent() {
  let [time, setTime] = React.useState(0); // 인자인 0이 time에 대입

  // useEffect의 2번째 인자에 아무것도 안넣어주면 1번만 실행
  React.useEffect(function () {
    setTime(time + 1);
  }, []);

  return (
    <div>
      <h3>{time}초</h3>
      <button>1씩 증가</button>
    </div>
  );
}

export default TimerComponent;
