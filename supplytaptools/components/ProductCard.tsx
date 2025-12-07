import Image from 'next/image'
import Link from 'next/link'


export default function ProductCard({ product }) {
return (
<Link href={`/product/${product.slug}`} className="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
<div className="w-full h-48 relative">
<Image src={product.image} alt={product.name} fill style={{objectFit: 'contain'}} />
</div>
<h3 className="mt-4 font-semibold text-lg">{product.name}</h3>
<p className="text-sm text-gray-600 mt-1">{product.short}</p>
<div className="mt-3 flex items-center justify-between">
<div className="text-lg font-bold">₹{product.price}</div>
<div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">{product.badge}</div>
</div>
</Link>
)
}