import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

const style = {
	li: `flex justify-between bg-slate-200 p-4 mb-2 capitalize`,
	liComplete: `flex justify-between bg-slate-300 p-4 mb-2 capitalize`,
	row: `flex`,
	rowEdited: `flex decoration-sky-500 underline font-semibold`,
	text: `ml-2 cursor-pointer`,
	textComplete: `ml-2 cursor-pointer line-through`,
	buttons: `text-neutral-focus cursor-pointer flex item-right space-x-3`,
	checkbox: `checkbox checkbox-accent border-slate-300`,
};

const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
	return (
		<li className={todo.completed ? style.liComplete : style.li}>
			<div className={todo.edited ? style.rowEdited : style.row}>
				<input
					className={style.checkbox}
					onChange={() => toggleComplete(todo)}
					type='checkbox'
					checked={todo.completed ? "checked" : ""}
				/>
				<p
					onClick={() => toggleComplete(todo)}
					className={todo.completed ? style.textComplete : style.text}
				>
					{todo.text}
				</p>
			</div>
			<div className={style.buttons}>
				{todo.completed ? (
					<button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
				) : (
					<button onClick={() => editTodo(todo.id)}>{<AiFillEdit />}</button>
				)}
			</div>
		</li>
	);
};

export default Todo;
