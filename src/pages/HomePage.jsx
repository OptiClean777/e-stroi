import { Container } from "@mui/system";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryMenu from "../components/CategoryMenu";
import { Products } from "../components/Products";
import { fetchCategories, fetchProducts } from "../fetchers/fetch";
import { Breadcrumbs } from "../components/Breadcrumbs";

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

const HomePage = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategory({
        name: "Главная",
        id: undefined,
        childCategories: categories,
      });
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchProducts(categoryId).then((content) => {
        console.log(content);
        setProduct(content);
      });
    }
  }, [categoryId]);

  const currentCategory = useMemo(() => {
    if (!categoryId || !category) return category;
    return findNode(+categoryId, category);
  }, [category, categoryId]);

  const links = useMemo(() => {
    if (!category) return [];

    return getCategoryPath(categoryId, category).map((category) => ({
      label: category.name,
      to: category.id ? "/home?categoryId=" + category.id : "/home",
    }));
  }, [categoryId, category]);

  return (
    <Container>
      <div style={{ marginBottom: "20px" }}>
        <Breadcrumbs links={links} />
      </div>

      <CategoryMenu categories={category?.childCategories ?? []} />
      <Products content={product?.content} product={product} />
    </Container>
  );
};

export default HomePage;
