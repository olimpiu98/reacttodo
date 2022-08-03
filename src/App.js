import {
	query,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	addDoc,
	deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./components/Todo";
import { db } from "./firebase";

const style = {
	bg: `h-screen w-screen p-4 bg-gradient-to-r from-blue-500 to-cyan-500`,
	container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
	heading: `text-3xl font-bold text-center text-gray-800 p-2`,
	form: `flex justify-between`,
	input: `border p-2 w-full text-xl`,
	button: `border p-4 ml-2 bg-purple-500 text-slate-500 text-white`,
	count: `text-center p-2`,
	content: `overflow-auto max-h-[300px]`,
};

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [list, setList] = useState(0);
	//create todo
	const createTodo = async (e) => {
		e.preventDefault(e);
		if (input.length === 0 || input.length > 30) {
			alert("You can't add a empty string or longer than 30 char.");
			return;
		}

		await addDoc(collection(db, "todos"), {
			order: list,
			text: input,
			completed: false,
			edited: false,
			new: true,
		});
		setList((e) => (e += 1));
		setInput("");
	};
	console.log(list);
	//read firebase
	useEffect(() => {
		const q = query(collection(db, "todos"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosArr = [];
			querySnapshot.forEach((item) => {
				todosArr.push({ ...item.data(), id: item.id });
			});
			setTodos(todosArr);
		});
		return () => unsubscribe;
	}, []);
	//complete firebase
	const toggleComplete = async (todo) => {
		await updateDoc(doc(db, "todos", todo.id), {
			completed: !todo.completed,
			edited: false,
			new: false,
		});
	};
	//delete
	const deleteTodo = async (id) => {
		await deleteDoc(doc(db, "todos", id));
	};
	//edit
	const editTodo = async (todo) => {
		let word = prompt("New plans ?");
		if (word === "" || word === null) return;

		await updateDoc(doc(db, "todos", todo), {
			text: word,
			edited: true,
			new: false,
		});
	};
	//body
	return (
		<div className={style.bg}>
			<div className={style.container}>
				<h3 className={style.heading}>ToDo App</h3>
				<form onSubmit={createTodo} className={style.form}>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className={style.input}
						type='text'
						placeholder='Add todo'
					/>
					<button className={style.button}>
						<AiOutlinePlus size={30} />
					</button>
				</form>
				<ul className={style.content}>
					{todos.map((todo, index) => (
						<Todo
							key={index}
							order={todo.order}
							todo={todo}
							toggleComplete={toggleComplete}
							deleteTodo={deleteTodo}
							editTodo={editTodo}
						/>
					))}
				</ul>
				{todos.length < 1 ? (
					<p className={style.count}>Add your first task</p>
				) : (
					<p className={style.count}>You have {todos.length} todo</p>
				)}
			</div>
		</div>
	);
}

export default App;
