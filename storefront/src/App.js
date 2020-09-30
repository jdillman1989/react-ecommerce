import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {

	const [products, setProducts] = useState( [] );
	const [readError, setReadError] = useState( [] );

	useEffect( () => {
		setReadError( null );
		try {
			fetch('http://localhost:3030/products?$limit=10')
			.then((resp) => resp.json())
			.then((data) => {
				let items = [];
				data.data.forEach( ( item ) => {
					items.push( item );
				} );
				setProducts( items );
			})
			.catch((err) => console.error("Error fetching products: " + err));
		} catch ( error ) {
			setReadError( error.message );
		}
	} );

	return (
		<div className="App">
			{readError}
			{ products.map( product => {
				return (
					<div key={product.id}>
						<h3>{product.name}</h3>
						<p>{product.price}</p>
					</div>
				)
			} ) }
		</div>
	);
}

export default App;
