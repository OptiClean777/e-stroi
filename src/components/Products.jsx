import { ProductItem } from "./CategoryItem";
import styled from "@emotion/styled";
import { LinkBase } from "./LinkBase";
import firstImage from "../firstImage.svg";

export function Products({ content, product }) {
  const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 20%);
    gap: 38px;
    max-width: 800px;
    margin-left: 425px;
    margin-top: 0px;
    margin-bottom: 50px;
    
  `;

  return (
    <Grid>
      {!product?.content.length > 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5em 20em",
            flexWrap: "wrap",
            
          }}
        >
          <img src={firstImage} alt="" style={{width:'300px'}}  />
          <h2 style={{ paddingLeft: "2em", textAlign: "center" }}>
            Нет товаров
          </h2>
        </div>
      ) : (
        content.map((item) => (
          <LinkBase to={`/home?categoryId=${item.id}`}>
            <ProductItem>{item.name}</ProductItem>
          </LinkBase>
        ))
      )}
    </Grid>
  );
}
