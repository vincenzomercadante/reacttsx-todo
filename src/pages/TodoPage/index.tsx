import { useState } from "react";
import { useFormik } from "formik";

import SaveIcon from "@mui/icons-material/Save";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import EditIcon from "@mui/icons-material/Edit";

import "./style.css";
import MyButton from "../../components/MyButton";

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deleteds, setDeleteds] = useState<Todo[]>([]);
  const [completed, setCompleteds] = useState<Todo[]>([]);

  const validate = (values: any) => {
    const errors: Record<string, string> = {};
    if (!values.todoText) {
      errors.todoText = "You must write something to add a todo";
    } else if (values.todoText.length < 3) {
      errors.todoText = "Write a valid todo title";
    }

    console.log(errors.todoText);
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      todoText: "",
    },
    validate,
    onSubmit: (values) => {
      const todo: Todo = {
        txt: values.todoText,
        status: "todo",
      };

      todos.push(todo);
    },
    onReset: (values) => {
      values.todoText = "";
    },
  });

  interface Todo {
    txt: string;
    status: "todo" | "done" | "deleted";
  }

  return (
    <>
      <div id="todo-app-wrapper">
        <header>
          <h1>Welcome on React TSX Todo App</h1>
          {/* add todo section */}
          <nav className="add-todo">
            <form onSubmit={formik.handleSubmit}>
              {/* text input and error message */}
              <div style={{ flexGrow: 1 }}>
                <div className="input-field">
                  <EditIcon />
                  <input
                    type="text"
                    name="todoText"
                    id="todoText"
                    placeholder="Type your todo"
                    value={formik.values.todoText}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                {/* error message */}
                {formik?.errors && (
                  <>
                    <p className="error-message">{formik?.errors?.todoText}</p>
                  </>
                )}
              </div>

              <div className="button-container">
                {/* reset button */}
                <MyButton
                  txt={<RotateLeftIcon />}
                  onClick={formik.handleReset}
                  type="reset"
                />
                {/* save button */}
                <MyButton txt={<SaveIcon />} type="save" />
              </div>
            </form>
          </nav>
        </header>
      </div>
    </>
  );
};

export default TodoPage;
