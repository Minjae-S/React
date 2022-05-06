import logo from "./logo.svg";
import "./App.css";
import { useState } from "react"; // state 변동시 자동으로 html에 반영되게 만들고 싶을 때 사용

function App() {
  let post = "강남 우동맛집";
  let [글제목, 글제목변경] = useState([
    "호텔 추천",
    "장난감 추천",
    "좋아하는 사료",
  ]); //자주 변동될거 같은 내용에만 state 활용
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);

  // let [블로그제목, setLogo] = useState("Minjae's blog");
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input, setInput] = useState(""); //초기값
  // let [현재시간, 현재시간변경] = useState("");
  let time = new Date().getHours();
  let minute = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  let day = String(time) + ":" + String(minute) + ":" + String(seconds);

  console.log(day);

  let [현재시간, 현재시간변경] = useState([day, day, day]);

  return (
    <div className="App">
      <div className="navbar">
        <h4>Blog</h4>
      </div>

      {글제목.map(function (a, i) {
        //파라미터 2개 사용 가능
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setTitle(i);
              }}
            >
              {글제목[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  //e 를 넣고 상위 html로 퍼지는 이벤트 버블링을 막고싶을때 e.stopPropagiation

                  let copy = [...좋아요];
                  copy[i] = copy[i] + 1;

                  좋아요변경(copy);
                }}
              >
                👍
              </span>
              {좋아요[i]}
            </h4>

            <p>{현재시간[i]} 발행</p>
            <button
              className="btn-del"
              onClick={() => {
                let copy = [...글제목];
                copy.splice(i, 1); // i라는 변수 지정 , 1개 지움

                글제목변경(copy);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      {/* <button
        onClick={() => {
          setTitle(0);
        }}
      >
        글제목0
      </button>
      <button
        onClick={() => {
          setTitle(1);
        }}
      >
        글제목1
      </button>
      <button
        onClick={() => {
          setTitle(2);
        }}
      >
        글제목2
      </button>

      <button
        onClick={() => {
          let copy = [...글제목]; //state가 array /object면 shell copy 를 만들어서 수정해야함
          copy[0] = "팡이바보";

          글제목변경(copy);
        }}
      >
        버튼
      </button> */}
      <button
        onClick={() => {
          let array = [...글제목];
          array.sort();
          글제목변경(array);
        }}
      >
        정렬
      </button>

      <input
        onChange={(e) => {
          setInput(e.target.value); //state 변경함수는 늦게처리됨 (비동기처리)
          // console.log(input);
        }}
      ></input>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.unshift(input); //unshift 맨앞에 배열을 추가해주는 함수

          글제목변경(copy);

          let copy2 = [...좋아요];
          copy2.unshift(parseInt(0));

          좋아요변경(copy2);

          let copy3 = [...현재시간];
          copy3.unshift(day);

          현재시간변경(copy3);
        }}
      >
        새 글 등록
      </button>

      {modal == true ? (
        <Modal
          글제목변경={글제목변경}
          color={"#eee"}
          글제목={글제목}
          title={title}
          setTitle={setTitle}
          현재시간={현재시간}
          좋아요={좋아요}
        />
      ) : null}
    </div> //<자식 컴포넌트 작명 = {state 이름}> 작명과 이름은 보통 같게 사용
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.글제목[props.title]}</h4>
      <p>{props.현재시간[props.title]}</p>
      <p>{props.좋아요[props.title]}</p>
      <button
        style={{ background: "white" }}
        onClick={() => {
          let copy1 = [...props.글제목];
          copy1[0] = "팡이바보";
          props.글제목변경(copy1);
        }}
      >
        글수정
      </button>
    </div>
  );
}
//함수 밖에 만들기 , 대문자로 시작

export default App;
