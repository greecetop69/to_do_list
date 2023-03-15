import { Button, Input } from 'antd';
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
	useAddProductMutation,
	useGetGoodsQuery,
	useDeleteProductMutation,
	useChangeProductMutation,
} from './redux';

function App() {
	const { data = [], isLoading } = useGetGoodsQuery();
	const [newProduct, setNewProduct] = useState('');
	const [addProduct, { isError }] = useAddProductMutation();
	const [deleteProduct] = useDeleteProductMutation();
	const [changeProduct] = useChangeProductMutation();

	const handleAddProduct = async () => {
		if (newProduct) {
			await addProduct({ name: newProduct }).unwrap();
			setNewProduct('');
		}
	};

	const handlerDeleteProduct = async (id) => {
		await deleteProduct(id);
	};

	const handlerChangeProduct = async (item) => {
		const text = prompt('hello');
		await changeProduct({ ...item, name: text });
	};

	if (isLoading) return <h1> loading..</h1>;

	return (
		<div className='flex items-center justify-center '>
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
						onChange={(e) => setNewProduct(e.target.value)}
						value={newProduct}
					/>
					<Button onClick={handleAddProduct} className='ml-3 w-30 h-10 bg-blue-700 text-white	'>
						Add Product
					</Button>
				</div>
				<ul className='mt-5'>
					{data.map((item) => (
						<li key={item.id} className='mt-2'>
							{item.name}{' '}
							<Button
								prefix={<EditOutlined />}
								className='text-black pr-2'
								type='primary'
								shape='circle'
								onClick={() => handlerDeleteProduct(item.id)}>
								<DeleteOutlined />
							</Button>
							<Button
								onClick={() => handlerChangeProduct(item)}
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

export default App;
