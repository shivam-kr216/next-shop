import Title from '../components/Title';
import Head from 'next/head';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';


export async function getStaticProps() {
  console.log('[Homepage] getStaticProps');
  const products = await getProducts();
  return {
    props: { products },
    // (ISR) --> it will call the getStaticprops after the specified interval of time hence this will resolve the problem of updation
    // Static page will regenerate periodically (after specified time).
    revalidate: 30, //seconds
  }
}


export default function Homepage({ products }) {
  console.log('[Homepage] render', products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className='p-4'>
        <Title>Next Shop</Title>
        <ul className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {
            products.map((product) => {
              return (
                <li key={product.id}>
                  <ProductCard product={product
                  } />
                </li>
              )
            })
          }
        </ul>
      </main>
    </>
  )
}
