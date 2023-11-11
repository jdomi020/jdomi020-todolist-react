import React, { useState } from "react";


//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
 
	//Add into array -> concat
	//Delete from array -> filter
	//Update -> map

	return (
		<div className="container">
			<h1>My Todos</h1>
			<ul>
				<li>
					<input 
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {
							if(e.key === "Enter") {
						 		setTodos(todos.concat([inputValue]));
								setInputValue("");
							}
						}}
						placeholder="What do you need to do?"></input><i class="fa-solid fa-trash-can"></i>
				</li>

				{todos.map((item, index) => (
					<li>
						{item}{""} 
						<i 
							class="fa-solid fa-trash-can"
							onClick ={() =>
								setTodos(
									todos.filter(
										(t, currentIndex) =>
											 index != currentIndex
									)
								)
							}></i>
					</li>
				))}
				
				
			</ul>
			<div>{todos.length} Tasks</div>
		</div>
	);
};

export default Home;
