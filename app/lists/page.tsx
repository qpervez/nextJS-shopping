"use client";

import Product from "@/src/contracts/product";
import productMap from "@/src/helpers/productMapper";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import list from "@/app/lists/list.module.css"
import Category from "@/src/components/categories";

interface selectedRowsResultInterface {
  allSelected: boolean,
  selectedCount: number,
  selectedRows: Product[],
}

export default function Lists() {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const products = useMemo<Product[]>(filterProducts, [apiProducts, activeCategory, query]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(data => {
        setApiProducts(productMap(data.data));
        setPending(false);      
      })
      .catch(e => console.error(e));
  }, []);

  function filterProducts():Product[] {
    return apiProducts
            .filter(product => product.title.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase()))
            .filter(product => product.category === activeCategory || activeCategory === 'all');
  }

  const columns = [
    {
      name: 'Title',
      selector: (row: Product) => row.title,
      sortable: true
    },
    {
      name: 'Description',
      selector: (row: Product) => row.description,
      sortable: true
    },
    {
      name: 'Price',
      selector: (row: Product) => row.price,
      sortable: true
    },
    {
      name: 'Category',
      selector: (row: Product) => row.category,
      sortable: true
    },
  ];

  function handleSearchInput(e: any) {
    setQuery(e.target.value);
  }

  function handleSelectedRowsChange ({ allSelected, selectedCount, selectedRows }: selectedRowsResultInterface) {      
    selectedRows.map((row: Product) => console.log(row.id));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex justify-between w-full py-5 px-8 bg-slate-50">
        <div className="">
          <h1 className="text-4xl text-gray-600">Lists</h1>
        </div>
        <div>
          <input value={query} className="h-9 p-2 text-lg rounded focus:outline-slate-500" type="text" placeholder="Search..." onChange={handleSearchInput} />
        </div>
        <Category setActiveCategory={setActiveCategory} activeCategory={activeCategory} />
      </div>

      <DataTable
        className={list.xyzGivenByMe}
        title="Products" 
        columns={columns}
        data={products}
        progressPending={pending}
        dense={true}
        highlightOnHover={true}
        pointerOnHover={true}
        selectableRows={true}
        onSelectedRowsChange={handleSelectedRowsChange}
        fixedHeader={true}
        pagination={true}
      />
    </main>
  )
}
