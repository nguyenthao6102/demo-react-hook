import React, { useState } from "react";
import "./ColorBox.scss";
// import PropTypes from "prop-types";

ColorBox.propTypes = {};
function getRandomColor() {
	const COLOR_LIST = ["deeppink", "green", "yellow", "black", "blue"];
	const randomIndex = Math.trunc(Math.random() * 5);
	return COLOR_LIST[randomIndex];
}
function ColorBox() {
	const [color, setColor] = useState(() => {
		const initColor = localStorage.getItem("box_color") || "deeppink"; // chỉ chạy một lần
		return initColor;
	});
	function handelBoxClick() {
		const newColor = getRandomColor();
		setColor(newColor);
		localStorage.setItem("box_color", newColor);
	}
	return (
		<div
			className="color-box"
			style={{ backgroundColor: color }}
			onClick={handelBoxClick}
		></div>
	);
}

export default ColorBox;
