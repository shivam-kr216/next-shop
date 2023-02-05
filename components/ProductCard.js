import Link from 'next/link';
import Image from 'next/image';
export default function ProductCard({ product }) {
    return (
        <div className='border my-4 w-80 shadow hover:shadow-xl '>
            <Link href={`/products/${product.id}`}>
                <Image src={product.pictureUrl} alt="" width={320} height={240} />
                <div className='p2 flex justify-between items-baseline'>
                    <h2 className='text-lg font-bold'>
                        {product.title}
                    </h2>
                    <span>
                        {product.price}
                    </span>
                </div>
            </Link>
        </div>
    );
}