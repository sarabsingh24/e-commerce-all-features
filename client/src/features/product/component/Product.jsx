import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//reducer
import { getProductsByFiltereAsync } from 'features/product/productSlice';

//component
import ProductList from './ProductList';
// import { filters } from 'data/ProductData';
import ProductsMenu from 'common/ProductsMenu';
import MobileFilterOption from 'common/MobileFilterOption';
import TopFilterMenu from 'common/TopFilterMenu';
import Pagination from 'common/Pagination';

import { ITEMS_PER_PAGE } from 'app/constants';
//function
const Product = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [page, setPage] = useState(1);

  const { products, totalItems, categories, brands, colors, sizes } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
    {
      id: 'brand',
      name: 'Brand',
      options: brands,
    },
    {
      id: 'color',
      name: 'Color',
      options: colors,
    },

    {
      id: 'size',
      name: 'Size',
      options: sizes,
    },
  ];

  const filterHandler = (e, section, option) => {
    const key = section.id;
    const value = option.value;
    setPage(1);

    let newFilter = [...filter];
    if (e.target.checked) {
      newFilter.push({ [key]: value });
      setFilter(newFilter);
    } else {
      newFilter = newFilter.filter((product) => product[key] !== value);
      setFilter(newFilter);
    }

    dispatch(getProductsByFiltereAsync(newFilter));
  };

  const sortHandeler = (option) => {
    let newFilter = [
      ...filter,
      { _sort: option.sort },
      { _order: option.order },
      { _page: page },
      { _limit: ITEMS_PER_PAGE },
    ];
    setPage(1);
    dispatch(getProductsByFiltereAsync(newFilter));
  };

  const selectedPage = (page) => {
    setPage(page);
  };

  const pageCountHandeler = (e) => {
    const direction = e.currentTarget.dataset.page;

    if (direction === 'next') {
      if (page < Math.abs(totalItems / ITEMS_PER_PAGE)) {
        selectedPage(page + 1);
      }
    } else {
      if (page > 1) {
        selectedPage(page - 1);
      }
    }
  };

  useEffect(() => {
    let newFilter = [...filter, { _page: page }, { _limit: ITEMS_PER_PAGE }];
    dispatch(getProductsByFiltereAsync(newFilter));
  }, [dispatch, filter, page]);

  useEffect(() => {
    const count = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const dummyPages = Array.from({ length: count }).map((_, ind) => ind + 1);

    setPageCount(dummyPages);
  }, [products]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterOption
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          filterHandler={filterHandler}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* top filter menu */}
          <TopFilterMenu
            sortHandeler={sortHandeler}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters by menu */}
              <ProductsMenu filters={filters} filterHandler={filterHandler} />

              {/* Product display grid */}
              <div className="lg:col-span-3">
                <ProductList />
              </div>
            </div>
          </section>
          <Pagination
            page={page}
            totalItems={totalItems}
            pageCount={pageCount}
            selectedPage={selectedPage}
            pageCountHandeler={pageCountHandeler}
          />
        </main>
      </div>
    </div>
  );
};

export default Product;
