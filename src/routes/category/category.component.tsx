import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Spinner from "../../components/spinner/spinner.component"

import "./category.styles.scss"

import React from 'react'
import ProductCard from "../../components/product-card/product-card.component"
import { useSelector } from "react-redux"
import { selectCategoiesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector"

type CategoryRouteParams = {
    category: string;
}

const Category = () => {

    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoiesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
      setProducts(categoriesMap[category])
    }, [category, categoriesMap]);

    return ( 
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            {
                isLoading ? (
                <Spinner/>
                ) :
                (
                <div className="category-container">
                    {products &&
                        products.map((product) => <ProductCard key={product.id}  product={product}/>)
                    }
                </div>
                )
            }
            
        </>
    ) 
  
}

export default Category