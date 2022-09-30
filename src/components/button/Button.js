import React from "react";
import "./Button.scss";
function Button({kind, rounded, children, ...props}) {
	return (
		<button className={`${rounded} ${kind}`} {...props}>
			{children}
		</button>
	);
}

export default Button;
