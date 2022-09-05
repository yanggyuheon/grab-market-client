// name과 age를 props로 받아서 destructuring 이용해서 name,age 넘겨준다
function ChildComponent(props) {
  const { name, age } = props;
  return (
    <div>
      <p>
        이름은 {name}이고 {age}살입니다.
      </p>
    </div>
  );
}

export default ChildComponent;
