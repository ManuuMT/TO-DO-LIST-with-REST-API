import React from "react";
import PropTypes from "prop-types";

const Item = props => {
	// Every task on my task list
	return (
		<div className="row taskList d-flex align-items-center">
			<div className="col-2" onClick={props.changeMyCheck}>
				<i
					className={
						props.check
							? "done fas fa-check mx-2"
							: "not-done fas fa-times mx-2"
					}></i>
			</div>
			<div className="col task">{props.name}</div>
			<div className="col" onClick={props.click}>
				<i className="icon fas fa-trash-alt"></i>
			</div>
		</div>
	);
};

Item.propTypes = {
	name: PropTypes.string,
	check: PropTypes.bool,
	click: PropTypes.func,
	changeMyCheck: PropTypes.func
};

export default Item;
