import React, { useState } from "react";
import { useFormik } from "formik";

import SaveIcon from "@mui/icons-material/Save";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import EditIcon from "@mui/icons-material/Edit";
import { Grid2 as Grid } from "@mui/material";

import "./style.css";
import MyButton from "../../components/MyButton";
import Todo from "../../components/Todo";

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

        <main style={{ marginTop: 40 }}>
          <Grid container spacing={2}>
            {/* todo section */}
            <Grid size={4}>
              <section className="todos-container">
                <h2 className="section-title">To Do</h2>
                {todos &&
                  todos.map((todo: Todo, index: number) => {
                    return (
                      todo.status === "todo" && (
                        <React.Fragment key={index}>
                          <Todo todo={todo} />
                        </React.Fragment>
                      )
                    );
                  })}
              </section>
            </Grid>

            {/* completed section */}
            <Grid size={4}>
              <section className="todos-container">
                <h2 className="section-title">Completed</h2>
                {todos &&
                  todos.map((todo: Todo, index: number) => {
                    return (
                      todo.status === "done" && (
                        <React.Fragment key={index}>
                          <Todo todo={todo} />
                        </React.Fragment>
                      )
                    );
                  })}
              </section>
            </Grid>

            {/* deleted section */}
            <Grid size={4}>
              <section className="todos-container">
                <h2 className="section-title">Deleted</h2>
                {todos &&
                  todos.map((todo: Todo, index: number) => {
                    return (
                      todo.status === "deleted" && (
                        <React.Fragment key={index}>
                          <Todo todo={todo} />
                        </React.Fragment>
                      )
                    );
                  })}
              </section>
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  );
};

export default TodoPage;
