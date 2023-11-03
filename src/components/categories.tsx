import axios from "axios";
import { useEffect, useState } from "react";
import categoryComponent from '@/src/components/categoryComponent.module.css';

export default function Category ({ activeCategory, setActiveCategory }: any) {

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(data => setCategories(data.data))
            .catch(e => console.error(e));
    }, []);

    return (
        <div>
            <button className={ `bg-blue-500 py-1 px-2 mx-1 border-blue-600 border text-slate-200 rounded hover:bg-blue-600 hover:border-blue-700 active:bg-blue-900 ${activeCategory === 'all' ? categoryComponent.active : ''}` } onClick={() => setActiveCategory('all') }>All</button>
            { categories.map( category => {
                return (
                    <button
                        key={category} 
                        className={`bg-blue-500 py-1 px-2 mx-1 border-blue-600 border text-slate-200 rounded hover:bg-blue-600 hover:border-blue-700 active:bg-blue-900 ${activeCategory === category ? categoryComponent.active : ''}` } 
                        onClick={() => setActiveCategory(category)}
                        >
                            { category }
                    </button>
                );
            }) }
        </div>
    );
} 