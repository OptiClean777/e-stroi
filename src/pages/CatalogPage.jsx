import { useEffect, useMemo, useState } from "react";

import Container from "../components/Container";
import { useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

import { fetchCategories, fetchProducts } from "../fetchers/fetch";
import { Products } from "../components/Products";
import { CatalogCategoryMenu } from "../components/CatalogCategoryMenu";

import { CatalogGrid } from "../components/CatalogGrid";

export const CatalogPage = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  function findNode(id, category) {
    if (category?.id + "" === id + "") {
      return category;
    }
    if (category?.childCategories) {
      for (let childCategory of category.childCategories) {
        const node = findNode(id, childCategory);
        if (node) {
          return node;
        }
      }
    }
  }

  function getCategoryPath(id, category) {
    const node = findNode(id, category);
    if (!id || !node) {
      return [category];
    }
    return [...getCategoryPath(node.parentId, category), node];
  }

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategory({
        name: "Каталог",
        id: undefined,
        childCategories: categories,
      });
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchProducts(categoryId).then((content) => {
        setProduct(content);
      });
    }
  }, [categoryId]);

  const currentCategory = useMemo(() => {
    if (!categoryId || !category) return category;
    return findNode(+categoryId, category);
  }, [category, categoryId]);

  const currentProduct = useMemo(() => {
    if (!categoryId || !product) return product;
    return findNode(+categoryId, product);
  }, [product, categoryId]);

  const links = useMemo(() => {
    if (!category) return [];
    return getCategoryPath(categoryId, category).map((category) => ({
      label: category.name,
      to: category.id ? "/catalog?categoryId=" + category.id : "/catalog",
    }));
  }, [categoryId, category]);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Breadcrumbs links={links} />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div>
            <CatalogCategoryMenu
              categories={currentCategory?.childCategories ?? []}
            />
          </div>
          <CatalogGrid
            categories={currentCategory?.childCategories ?? []}
            category={category}
          />
          <Products
            content={product?.content}
            product={product}
            category={category}
          />
        </div>
      </Container>
    </>
  );
};
