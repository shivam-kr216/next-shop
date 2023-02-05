import Title from '../components/Title';
import Head from 'next/head';
import { getProducts } from '@/lib/products';

//Server-side-props 
export async function getServerSideProps() {
  console.log('[Homepage] getStaticProps');
  const products = await getProducts();
  return {
    props: { products },
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
