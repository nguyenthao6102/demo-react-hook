import { useState } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
const initialState = [
	{ id: 1, title: "I love Easy FrontEnd!" },
	{ id: 2, title: "We love Easy FrontEnd!" },
	{ id: 3, title: "They love Easy FrontEnd!" },
];

function App() {
	const [todos, setTodos] = useState(initialState);
	function handleTodoClick(todo) {
		const index = todos.findIndex((x) => x.id === todo.id);
		if (index === -1) {
			return;
		}
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	}
	function handleTodoFormSubmit(formValue) {
		const newTodo = {
			id: uuidv4(),
			...formValue,
		};
		const newTodos = [...todos];
		newTodos.push(newTodo);
		setTodos(newTodos);
	}
	return (
		<div className="App">
			<h1>Hello</h1>
			<ColorBox />
			<TodoForm onSubmit={handleTodoFormSubmit} />
			<TodoList todos={todos} onTodoClick={handleTodoClick} />
		</div>
	);
}

export default App;
