import { Button, Input } from 'antd';
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useRootStore } from './mst/store/RootStore';

function App() {
	const [newTodo, setNewTodo] = useState('');
	const { addTodo, removeTodoById, fetchProducts, todos } = useRootStore();

	const handleAddTodo = () => {
		if (newTodo) {
			addTodo(newTodo);
			setNewTodo('');
		}
	};

	const handlerDeleteProduct = (id) => {
		removeTodoById(id);
	};

	const handlerChangeTodo = (item) => {
		const text = prompt('hello', item.title);
		if (text) {
			const todoChange = todos.find((el) => el.id === item.id);
			todoChange.setName(text);
		} else {
			alert('text must have at least 1 character');
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='flex items-center justify-center  bg-white'>
			<div className='w-[1000px]  h-[670px] mt-6 rounded-[32px] flex-col text-center bg-white border border-solid shadow shadow-blue-500/40 hover:shadow-indigo-500/40'>
				<p className='w-[360px] h-[57px] mt-[72px] ml-[300px] font-bold	 text-3xl leading-7 tracking-widest text-regal-blue		'>
					Daily To Do List
				</p>
				<div>
					<Input
						style={{
							width: 400,
						}}
						size='large'
						placeholder='Product'
						prefix={<AppstoreAddOutlined />}
						type='text'
						onChange={(e) => setNewTodo(e.target.value)}
						value={newTodo}
					/>
					<Button onClick={handleAddTodo} className='ml-3 w-30 h-10 bg-blue-700 text-white	'>
						Add addTodo
					</Button>
				</div>
				<ul className='mt-5'>
					{todos.map((item) => (
						<li key={item.id} className='mt-2'>
							{item.title}
							{'  '}
							<Button
								prefix={<EditOutlined />}
								className='text-black pr-2'
								type='primary'
								shape='circle'
								onClick={() => handlerDeleteProduct(item.id)}>
								<DeleteOutlined />
							</Button>
							<Button
								onClick={() => handlerChangeTodo(item)}
								type='primary'
								shape='quard'
								className='text-black'>
								<EditOutlined />
							</Button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default observer(App);
