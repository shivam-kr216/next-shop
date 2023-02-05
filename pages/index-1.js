// use useEffect if we want to fetch data at client side
import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Head from 'next/head';
import { getProducts } from '@/lib/products';


export default function Homepage() {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     console.log('[Homepage] useEffect');
    //     getProducts()
    //     .then(products => setProducts(products))
    //     .catch(e => console.log(e.message));
    
    // }, []);

    useEffect(() => {
        console.log('[Homepage] useEffect');
        // declaring anoynmous fn. and immediately calling it with () 
        (async () => {
            const response = await fetch('./api/products');
            const products = await response.json();
            setProducts(products);
        })();

    }, []);

    return (
        <>
            <Head>
                <title>Next Shop</title>
            </Head>
            <main className='p-4'>
                <Title>Next Shop</Title>
                <ul>
                    {
                        products.map((product) => {
                            return (
                                <li key={product.id}>
                                    {product.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </>
    )
}

