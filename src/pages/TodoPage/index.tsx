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

  // update the single todo in the state array based on the index. The new status will be specified by newStatus
  const updateTodoinTodos = (
    index: number,
    newStatus: "todo" | "done" | "deleted"
  ) => {
    const updatedTodos: Todo[] = todos.map((todo: Todo, innerIndex: number) =>
      index === innerIndex ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  // delete the todo from the todos array based on its array index
  const deleteTodoFromTodo = (index: number) => {
    const updatedTodos = todos.filter(
      (todo: Todo, innerIndex: number) => innerIndex !== index
    );

    setTodos(updatedTodos);
  };

  // validation rules for the adding todo input
  const validate = (values: any) => {
    const errors: Record<string, string> = {};
    if (!values.todoText) {
      errors.todoText = "You must write something to add a todo";
    } else if (values.todoText.length < 3) {
      errors.todoText = "Write a valid todo title";
    }

    return errors;
  };

  // form rule with formik
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

      setTodos([...todos, todo]);
      values.todoText = "";
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
                      todo &&
                      todo.status === "todo" && (
                        <React.Fragment key={index}>
                          <Todo
                            todo={todo}
                            onClickFirst={() =>
                              updateTodoinTodos(index, "done")
                            }
                            onClickSecond={() =>
                              updateTodoinTodos(index, "deleted")
                            }
                          />
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
                      todo &&
                      todo.status === "done" && (
                        <React.Fragment key={index}>
                          <Todo
                            todo={todo}
                            onClickFirst={() =>
                              updateTodoinTodos(index, "deleted")
                            }
                            onClickSecond={() =>
                              updateTodoinTodos(index, "todo")
                            }
                          />
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
                      todo &&
                      todo.status === "deleted" && (
                        <React.Fragment key={index}>
                          <Todo
                            todo={todo}
                            onClickFirst={() =>
                              updateTodoinTodos(index, "todo")
                            }
                            onClickSecond={() => deleteTodoFromTodo(index)}
                          />
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
