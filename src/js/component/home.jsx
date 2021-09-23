import React, { useState, useEffect } from "react";

const Home = () => {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const urlApi =
		"https://assets.breatheco.de/apis/fake/todos/user/diegomed1411";

	useEffect(() => {
		putTareas();
	}, [taskList]);

	useEffect(() => {
		getTareas();
	}, []);
	const getTareas = () => {
		fetch(urlApi, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setTaskList(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				alert(error);
			});
	};

	const putTareas = () => {
		fetch(urlApi, {
			method: "PUT",
			body: JSON.stringify(taskList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				alert(error);
			});
	};

	const agregarTarea = evento => {
		if (evento.key == "Enter") {
			let newTask = {
				label: task,
				done: false
			};
			setTaskList([...taskList, newTask]);
			setTask("");
		}
	};
	const borrarTarea = indice => {
		let result = taskList.filter((task, index) => index !== indice);
		setTaskList(result);
	};

	return (
		<div className="superContenedor container d-flex justify-content-start flex-column align-items-center">
			<h1>TODOS</h1>
			<div className="contenedorTareas">
				<input
					type="text"
					className="form-control"
					placeholder="Agregar tarea"
					onChange={e => setTask(e.target.value)}
					onKeyPress={f => agregarTarea(f)}
					value={task}
				/>

				<ul>
					{taskList.map((item, index) => {
						return (
							<li key={index}>
								{item.label}{" "}
								<span onClick={() => borrarTarea(index)}>
									&#10006;
								</span>{" "}
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				<p>Task Counter {taskList.length}</p>
			</div>
		</div>
	);
};

export default Home;
