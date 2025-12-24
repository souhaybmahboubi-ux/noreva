'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // or 'react-router-dom' if likely CRA, but file structure implies Next.js
// However, if this is a raw React app (referenced in package.json as Angular??), user might be using React Router.
// But standard Next.js uses next/navigation or next/router. 
// Given the file path `src/app/...`, I'll assume Next.js App Router hooks.
import { fetchProduct } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
    const { handle } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [buttonText, setButtonText] = useState('Add to Cart');

    useEffect(() => {
        if (handle) {
            const loadProduct = async () => {
                try {
                    const fetchedProduct = await fetchProduct(handle);
                    setProduct(fetchedProduct);
                } catch (error) {
                    console.error('Failed to load product', error);
                } finally {
                    setLoading(false);
                }
            };
            loadProduct();
        }
    }, [handle]);

    const handleAddToCart = async () => {
        if (!product?.variants?.length) return;

        // Default to first variant as requested
        const variantId = product.variants[0].id;

        setAdding(true);
        setButtonText('Adding...');

        await addToCart(variantId, 1);

        setAdding(false);
        setButtonText('Added!');

        setTimeout(() => {
            setButtonText('Add to Cart');
        }, 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                Product not found
            </div>
        );
    }

    // Helper to get image
    const imageSrc = product.images?.[0]?.src;
    const imageAlt = product.images?.[0]?.altText || product.title;
    const price = product.variants?.[0]?.price?.amount || product.variants?.[0]?.price || '0.00';
    const currency = product.variants?.[0]?.price?.currencyCode || 'USD';

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start justify-center">
            {/* Left: Image (Futuristic Frame) */}
            <div className="w-full md:w-1/2 max-w-xl">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-96 flex items-center justify-center bg-zinc-800 text-zinc-500">
                                No Image Available
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 max-w-xl space-y-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                        {product.title}
                    </h1>
                    <p className="mt-4 text-2xl font-light text-purple-400">
                        {currency} {price}
                    </p>
                </div>

                <div
                    className="text-zinc-400 leading-relaxed text-lg prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                />

                <div className="pt-6">
                    <button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className={`
              w-full py-4 px-8 rounded-full font-bold text-lg tracking-wider uppercase transition-all duration-300 transform
              ${adding
                                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95'
                            }
            `}
                    >
                        {buttonText}
                    </button>

                    <p className="mt-4 text-center text-sm text-zinc-600">
                        Secure checkout powered by Shopify
                    </p>
                </div>
            </div>
        </div>
    );
}
