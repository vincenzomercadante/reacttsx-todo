import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import MyButton from "../MyButton";

import "./style.css";

interface Todo {
  txt: string;
  status: "todo" | "done" | "deleted";
}

interface Props {
  todo: Todo;
  onClickFirst?: () => void;
  onClickSecond?: () => void;
}

const Todo: React.FC<Props> = ({ todo, onClickFirst, onClickSecond }) => {
  return (
    <>
      <div className="todo">
        {/* todo text */}
        <h3>{todo.txt}</h3>
        <div className="todo-buttons-container">
          {/* first button */}
          <MyButton
            onClick={onClickFirst}
            txt={
              todo.status === "todo" ? (
                <CheckIcon />
              ) : todo.status === "done" ? (
                <DeleteIcon />
              ) : (
                <RotateLeftIcon />
              )
            }
            type={
              todo.status === "todo"
                ? "check"
                : todo.status === "done"
                ? "danger"
                : "reset"
            }
          />
          {/* second button */}
          <MyButton
            onClick={onClickSecond}
            txt={
              todo.status === "todo" ? (
                <DeleteIcon />
              ) : todo.status === "done" ? (
                <RotateLeftIcon />
              ) : (
                <DeleteIcon />
              )
            }
            type={
              todo.status === "todo"
                ? "danger"
                : todo.status === "done"
                ? "reset"
                : "danger"
            }
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
