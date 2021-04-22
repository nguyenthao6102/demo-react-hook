import React, { useState } from "react";
import PropTypes from "prop-types";

TodoForm.propTypes = {
	onSubmit: PropTypes.func,
};
TodoForm.defaultProps = {
	onSubmit: null,
};
function TodoForm(props) {
	const { onSubmit } = props;
	const [value, setValue] = useState("");

	function handleValueChange(e) {
		setValue(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (!onSubmit) {
			return;
		}
		const formValue = {
			title: value,
		};
		onSubmit(formValue);
		setValue("");
	}
	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<input type="text" value={value} onChange={handleValueChange} />
			<input type="submit" value="Add todo" />
		</form>
	);
}

export default TodoForm;
