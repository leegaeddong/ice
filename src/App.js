import { useState } from "react";

function App() {
  return (
    <div>
      <Todo />
    </div>
  );
}

const Todo = () => {
  const [title, setTitle] = useState("");
  // <-- 유저의 입력값을 담을 상태
  const [content, setContent] = useState("");
  // <-- 유저의 입력값을 담을 상태
  const [todo, setTodo] = useState([
    { id: 1, title: "제목입니다", content: "내용입니다", isDone: false },
    { id: 2, title: "스파르타", content: "할수있다", isDone: false },
    //클릭을 했을때 추가하는 아이템을 모아주기위해 state를 하나 더 만들어주고 데이터타입으로 배열을 만든다.
  ]);

  // state = 상태
  // setState = 이 상태를 변경시켜주는 함수

  const onAddTodo = () => {
    if (title === "" && content === "") return;
    //리로딩 방지
    let newData = {
      id: todo.length + 1,
      //
      title: title,
      content: content,
      isDone: false,
    };
    let copy = [...todo, newData];
    setTodo(copy);
    //그냥 가져올수 없으니까 카피를해서 todo의 내용을 가져오고 기존의 데이터를 가져오기 위해
    //...을 붙어줘서 뿌려주고 newDate를 넣어준다
  };

  const onDeleteTodo = (id) => {
    const newArray = todo.filter((td) => td.id !== id);
    setTodo(newArray);
    console.log(id);
  };
  //todo 삭제함수

  const onFinishTodo = (id) => {
    const idx = todo.findIndex((td) => td.id === id);
    let copy = [...todo];
    copy[idx].isDone = !copy[idx].isDone;
    setTodo(copy);
  };
  //todo 완료 취소 함수

  return (
    <div>
      <div>My Todo List</div>
      <div
        style={{
          display: "flex",
          borderRadius: "10px",
          background: "lightgrey",
          margin: "auto",
        }}
      >
        <h1>제목</h1>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          //input 안에 변화해서 들어갈수 있는값 넣기
          //변화된 setTitle값 넣어주기
          style={{
            marginRight: "20px",
          }}
        />
        <h1>내용</h1>
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          //input 안에 변화해서 들어갈수 있는값 넣기
          //변화된 setContent값 넣어주기

          style={{
            marginRight: "200px",
          }}
        />
        <button onClick={onAddTodo} style={{ background: "lightblue" }}>
          추가하기
        </button>
      </div>

      <br />

      <div>
        <div>
          <h1>working..</h1>
          <div style={{ display: "flex" }}>
            {todo.map((td) =>
              td.isDone === false ? (
                <TodoCard
                  td={td}
                  onDeleteTodo={onDeleteTodo}
                  onFinishTodo={onFinishTodo}
                />
              ) : null
            )}
          </div>
        </div>
        <div>
          <h1>done..</h1>
          <div style={{ display: "flex" }}>
            {todo.map((td) =>
              td.isDone === true ? (
                <TodoCard
                  td={td}
                  onDeleteTodo={onDeleteTodo}
                  onFinishTodo={onFinishTodo}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TodoCard = (props) => {
  const { td, onDeleteTodo, onFinishTodo } = props;
  return (
    <div
      style={{
        border: "1px solid blue",
        width: "300px",
        height: "180px",
      }}
    >
      <h2>{td.title}</h2>
      <p>{td.content}</p>
      <div style={{ display: "flex" }}>
        <button onClick={() => onFinishTodo(td.id)}>완료하기</button>
        <button onClick={() => onDeleteTodo(td.id)}>삭제하기</button>
      </div>
    </div>
  );
};

export default App;
