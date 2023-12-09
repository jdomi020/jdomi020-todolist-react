import React, { useState, useEffect } from "react";

 
//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [userName, setuserName] = useState("")
	const [todos, setTodos] = useState([]);

	// This is where I'm allegedly creating my username in the API
	useEffect (async () => {
		const fetchUsername = async() =>{
			fetch(`https://playground.4geeks.com/apis/fake/todos/user/jdomi020`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
	
		.then(data => {
			console.log(data);
			setTodos(data);
			console.log(todos);
		})
		.catch(error => {
			console.log(error)
		})
		}
	// 	setuserName("jdomi020");
	// fetch(`https://playground.4geeks.com/apis/fake/todos/user/jdomi020`, {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	},
	// 	body: JSON.stringify([])
	// })
	// .then(response => {
		
	// 	if (response.ok){
	// 		console.log("response went through")
	// 	}
	// 	return response.json()
	// })
		
	await fetchUsername();
	console.log(todos);
	},[]);

	// This is where I post my username to the API site

	// 
	
	function addItem() {
			let newTodo = [...todos, {label: inputValue, done: false}];
			fetch("https://playground.4geeks.com/apis/fake/todos/user/jdomi020", {
				method: "PUT",
				headers: {"Content-Type": "application/json",},
				body: JSON.stringify(newTodo)
			})
			.then(response => {
				if(!response.ok) throw Error (response.statusText)
					else{setTodos(newTodo)
						setInputValue("")};
				console.log(newTodo, "newest log");

				return response.json();
			})
			.catch(error => console.log(error))
	}

	function deleteItem() {
		let deleteTodo = todos = [ {label: inputValue, done: false}];
		console.log(deleteTodo);
		fetch("https://playground.4geeks.com/apis/fake/todos/user/jdomi020", {
			method: "PUT",
			headers: {"Content-Type": "application/json",},
			body: JSON.stringify(deleteTodo)
		})
		.then(response => {
			if(!response.ok) throw Error (response.statusText)
				else{setTodos(deleteTodo)
					setInputValue("")};
			console.log(deleteTodo, "newest log");

			return response.json();
		})
		.catch(error => console.log(error))
}


function deleteItem2(index) {
	const updatedTodos = [...todos];
	updatedTodos.splice(index, 1);
	fetch("https://playground.4geeks.com/apis/fake/todos/user/jdomi020", {
	  method: "PUT",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify(updatedTodos),
	})
	  .then((response) => {
		if (!response.ok) throw Error(response.statusText);
		setTodos(updatedTodos);
		console.log(updatedTodos);
		return response.json();
	  })
	  .catch((error) => console.log(error));
  }

  
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
							if(e.key === "Enter")
							{addItem()}
						}}
						placeholder="What do you need to do?"></input><i className="fa-solid fa-trash-can"></i>
				</li>

				{todos.map((item, index) => (
					<li className="todos" key={index}>
						{item.label}{""} 
						<button ><i 
							onClick = 
							{()=> deleteItem2(index)} 
							className="fa-solid fa-trash-can"
							
									// todos.filter(
									// 	(t, currentIndex) =>
									// 		 index != currentIndex
							></i></button>
					</li>
				))}
				
			</ul>
			<div className="tasks">{todos.length} Tasks</div>
		</div>
	);
};

export default Home;
