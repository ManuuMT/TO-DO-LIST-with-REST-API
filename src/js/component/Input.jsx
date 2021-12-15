import React, { useState, useEffect } from "react";
import Item from "./Item.jsx";
import TaskCounter from "./TaskCounter.jsx";

const Input = () => {
	// HOOKS

	const [inputValue, setInputValue] = useState("");
	const [uList, setList] = useState([]);

	//FUNCTIONS
	const getFetch = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/Emanuel";
		const header = {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		};

		// CREAR CAPA DE RED

		fetch(url, header)
			.then(res => res.json())
			.then(data => {
				setList(data);
				return data;
			})
			.catch(error => console.error(error));
	};

	useEffect(() => getFetch(), []);

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
	const validateInput = event => {
		setInputValue(event.target.value);
		if (event.target.value === "")
			console.error("The input can't be empty");
	};

	// Adds a task on the list
	const enterInput = event => {
		if (event.keyCode == 13 && inputValue != "") {
			let myList = uList;
			myList.push({ label: event.target.value, done: false });
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

	const deleteAll = () => {
		let array = [...uList];
		let newArray = array.filter(task => task.done == true);

		if (newArray.length > 0) {
			setList(newArray);
			optimizedFetch("PUT", JSON.stringify(newArray));
		} else alert("You must have at least 1 task done");
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
					placeholder="What needs to be done?"
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
							onClick={() => deleteAll()}
							className="btn btn-primary">
							Delete done tasks
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Input;
