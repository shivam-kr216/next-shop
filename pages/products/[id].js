import { getProducts, getProduct } from '../../lib/products';
import Head from 'next/head';
import Title from '../../components/Title';
import { ApiError } from '../../lib/api';
import Image from 'next/image';

export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map(product => {
            return {
                params: {
                    id: product.id.toString()
                }
            }
        }),
        // If we want to generate a new page when the requested path is not there in list then we need to set fallback with some other value
        // i.e, either true or blocking it will dynamically generate the page
        // fallback: false,
        fallback: 'blocking',
    }
}

export async function getStaticProps(context) {
    console.log('[ProductPage] getStaticProps');
    const { id } = context.params;
    console.log(id);
    try {
        const product = await getProduct(id);
        return {
            props: { product },
            revalidate: 30,
        }
    }
    catch (err) {
        // below line will return 404 not found page
        if (err instanceof ApiError && err.status === 404) {
            return { notFound: true };
        }
        throw err;
    }
}

export default function PrductPage({ product }) {
    console.log(product);
    return (
        <>
            <Head>
                <title>Next Shop</title>
            </Head>
            <main className='p-4'>
                <Title>{product.title}</Title>
                <div className='flex flex-col lg:flex-row'>
                    <div>
                        <Image src={product.pictureUrl} alt="" width={640} height={480} />
                    </div>
                    <div className='flex-1 lg:ml-4'>
                        <p className='text-sm'>
                            {product.description}
                        </p>
                        <p className='text-lg font-bold mt-2'>
                            {product.price}
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}