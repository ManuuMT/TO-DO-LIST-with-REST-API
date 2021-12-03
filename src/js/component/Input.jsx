import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Item from "./Item.jsx";
import TaskCounter from "./TaskCounter.jsx";

const Input = props => {
	// HOOKS

	// Use state with the value of my input
	const [inputValue, setInputValue] = React.useState("");
	// Use state with the list of tasks
	const [uList, setList] = React.useState([]);

	// Use effect that sets the list for the first and only time
	useEffect(() => getFetch(), []);

	//FUNCTIONS
	const getFetch = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/Emanuel";
		const header = {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		};

		fetch(url, header)
			.then(res => res.json())
			.then(data => {
				setList(data);
				return data;
			})
			.catch(error => console.error(error));
	};

    // Every fetch method (except get)
	const optimizedFetch = (fetchMethod, fetchBody) => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/Emanuel";
		const header = {
			method: fetchMethod,
			body: fetchBody,
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch(url, header)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.error(error));
	};

	// Changes the value of the input
	// and shows a console error when the input is empty
	const validateInput = event => {
		setInputValue(event.target.value);
		if (event.target.value === "")
			console.error("The input can't be empty");
	};

	// Adds a task on the list
	const enterInput = event => {
		if (event.keyCode == 13 && inputValue != "") {
			let myList = uList;
			let myNewTask = { label: event.target.value, done: false };
			myList.push(myNewTask);
			setList(myList);
			setInputValue("");
			optimizedFetch("PUT", JSON.stringify(uList));
		}
	};

	// Function that deletes tasks
	const deleteTask = index => {
		if (uList.length == 1) {
			alert("You can not stay without tasks");
		} else {
			let newArray = [...uList];
			newArray.splice(index, 1);
			optimizedFetch("PUT", JSON.stringify(newArray));
			setList(newArray);
		}
	};

    // Changes the state of the task (done or not done)
	const changeCheck = index => {
		let newArray = [...uList];
		newArray[index].done
			? (newArray[index].done = false)
			: (newArray[index].done = true);
		setList(newArray);
		optimizedFetch("PUT", JSON.stringify(newArray));
	};

	return (
		<>
			<div className="container">
				<div className="title">Emanuel`s TO DO List</div>
				{/* Input */}
				<input
					className="row myInput"
					type="text"
					onChange={validateInput}
					value={inputValue}
					onKeyDown={enterInput}
					placeholder={props.myPlaceHolder}
				/>

				{/* List of tasks */}
				{uList.map((task, i) => (
					<Item
						key={i}
						name={task.label}
						check={task.done}
						click={e => deleteTask(i)}
						changeMyCheck={e => changeCheck(i)}
					/>
				))}

				{/* Tasks counter */}
				<TaskCounter listState={uList} />

				{/* Buttons */}
				<div className="row my-3">
					<div className="col">
						<button
							onClick={() => optimizedFetch("POST", "[]")}
							className="btn btn-primary">
							Create New List
						</button>

						<button
							onClick={() => optimizedFetch("DELETE", null)}
							className="btn btn-primary mx-2">
							Delete All
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

Input.propTypes = {
	myPlaceHolder: PropTypes.string
};

export default Input;
