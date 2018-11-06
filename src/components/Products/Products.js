import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from './Product';
import Loader from '../Loader';
import { Row } from 'reactstrap';
const Products = () => (
		<div className="album py-5 bg-light">
			<div className="container">
				<Row className="row">
  <Query
    query={gql`
      {
        products {
          productSlug
          productTitle
          productPrice
          productDescription
          productTags
          productAddedDate
          productImage
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loader/>;
      if (error) return <p>Error :${error.message}</p>;
		return data.products.map((currentProduct) => (
			<Product key={currentProduct.id} product={currentProduct} />
		));

    }}
  </Query>
  				</Row>
			</div>
		</div>
	);
export default Products;
