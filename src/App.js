import { useEffect, useState } from "react";
import queryString from "query-string";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
const initialState = [
	{ id: 1, title: "I love Easy FrontEnd!" },
	{ id: 2, title: "We love Easy FrontEnd!" },
	{ id: 3, title: "They love Easy FrontEnd!" },
];

function App() {
	const [todos, setTodos] = useState(initialState);
	const [postList, setPostList] = useState([]);
	const [pagination, setPagination] = useState({
		_page: 1,
		_limit: 10,
		_totalRows: 1,
	});
	const [filters, setFilters] = useState({
		_limit: 10,
		_page: 1,
	});
	useEffect(() => {
		async function fetchPostList() {
			try {
				//_limit=10&_page=1
				const paramString = queryString.stringify(filters); //convert filter ==> string
				const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
				const response = await fetch(requestUrl);
				const responseJSON = await response.json();

				const { data, pagination } = responseJSON;
				setPostList(data);
				setPagination(pagination);
			} catch (error) {
				console.log("Failed to fetch post list", error.message);
			}
		}
		fetchPostList();
	}, [filters]);
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
	function handlePageChange(newPage) {
		setFilters({
			...filters,
			_page: newPage,
		});
	}
	return (
		<div className="App">
			<h2>Color box change</h2>
			<ColorBox />
			<h2>TodoApp (Render, add, delete todo)</h2>
			<TodoForm onSubmit={handleTodoFormSubmit} />
			<TodoList todos={todos} onTodoClick={handleTodoClick} />
			<h2>Post List (Fetch data from api)</h2>
			<PostList posts={postList} />
			<Pagination pagination={pagination} onPageChange={handlePageChange} />
		</div>
	);
}

export default App;
