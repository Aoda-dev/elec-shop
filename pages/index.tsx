import { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Image from 'next/image';

export default function Gallery({ data }) {
  const [activeProduct, setActiveProduct] = useState<{
    img: string;
    text: string;
    name: string;
    price: string;
  } | null>(null);

  return (
    <>
      <Header />

      {activeProduct && (
        <div className="flex h-screen w-screen fixed top-0 left-0 bg-white z-50 flex-col justify-between">
          <div className="mx-auto relative mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div
              className="text-3xl cursor-pointer"
              onClick={() => {
                setActiveProduct(null);
              }}
            >
              X
            </div>

            <div className="mx-auto flex flex-col sm:flex-row">
              <Image
                alt="coffee"
                className="rounded-lg"
                src={activeProduct.img}
                width={560}
                height={640}
              />
              <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
                <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
                  {activeProduct.name}
                </h1>
                <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
                  ${activeProduct.price}
                </h1>

                <p className="max-w-xl mt-14">{activeProduct.text}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              Все товары
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data &&
            data.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer"
                onClick={() => setActiveProduct(product)}
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const env =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://elecstore-shop.vercel.app';

  const res = await fetch(`${env}/api/get`, {
    method: 'GET',
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
