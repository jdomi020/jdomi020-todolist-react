import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	// This is where I'm allegedly creating my username in the API

	useEffect (() => 
	fetch("https://playground.4geeks/apis/fake/todos/user/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(resp => {
		console.log(resp.ok);
		console.log(resp.status);
		console.log(resp.text());
		return resp.json();
	})
	.then(data => {
		setTodos(data);
	})
	.catch(error => {
		console.log(error)
	})
	, []);
	

	// This would be where I'm putting whatever comes up in the to-list, probably in the body

	useEffect (() =>
	fetch("https://playground.4geeks/apis/fake/todos/user/jdomi020", {
		method: "POST",
		body: JSON.stringify({label: inputValue}),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(resp => resp.json ()
		// console.log(resp.ok),
		// console.log(resp.status),
		// console.log(resp.text()),
		// return resp.json()
	)
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		console.log(error)
	}) 
	, [inputValue]);
	

	// and this would allegedly be where i would be deleting the things that I input
	
	// useEffect (() => 
	// fetch("https://playground.4geeks/apis/fake/todos/user/jdomi020", {
	// 	method: "DELETE",
	// 	body: [],
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
	// .then(resp => {
	// 	console.log(resp.ok);
	// 	console.log(resp.status);
	// 	console.log(resp.text());
	// 	return resp.json();
	// })
	// .then(data => {
	// 	console.log(data);
	// })
	// .catch(error => {
	// 	console.log(error)
	// })
	// ,[]);
 
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
						onKeyDown={(e) => {
							if(e.key === "Enter") {
						 		setTodos(todos.concat([inputValue]));
								setInputValue("");
							}
						}}
						placeholder="What do you need to do?"></input><i class="fa-solid fa-trash-can"></i>
				</li>

				{todos.map((item, index) => (
					<li className="todos">
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
			<div className="tasks">{todos.length} Tasks</div>
		</div>
	);
};

export default Home;
