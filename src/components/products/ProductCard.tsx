/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Rating } from "@mui/material";
import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const navigate = useNavigate();

    const ProductRating = data.reviews.reduce((acc: number, item: any) => 
        item.rating + acc, 0) / data.reviews.length;

    return (
        <div onClick={() => navigate(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">                
            </div>
            <div className="aspect-square overflow-hidden relative w-full">
                <img src={data.images[0].image} alt={data.name} className="w-full h-full object-contain"/>
            </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={ProductRating} readOnly/>
            </div>
            <div>{ data.reviews.length } reviews</div>
            <div className="font-semibold">{formatPrice(data.price)}</div>
        </div>
    );
}

export default ProductCard;
