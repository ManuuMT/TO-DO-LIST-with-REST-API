import React from "react";
import PropTypes from "prop-types";

const TaskCounter = props => {
	return (
		<div className="row counter">
			{props.listState.length > 0
				? props.listState.length + " item left"
				: "No tasks, add a task"}
		</div>
	);
};

TaskCounter.propTypes = {
	listState: PropTypes.array
};

export default TaskCounter;
