import React from "react";
import PropTypes from "prop-types";

TodoList.propTypes = {
	todos: PropTypes.array,
	onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
	todo: [],
	onTodoClick: null,
};

function TodoList(props) {
	const { todos, onTodoClick } = props;
	function handleTodoClick(todo) {
		if (onTodoClick) {
			onTodoClick(todo);
		}
	}
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<li key={todo.id} onClick={() => handleTodoClick(todo)}>
					{todo.title}
				</li>
			))}
		</ul>
	);
}

export default TodoList;
