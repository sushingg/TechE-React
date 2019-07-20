import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Segment,
  Input,
  Image,
  Message,
  Checkbox,
  Modal
} from "semantic-ui-react";
import { CartContext } from "../../CartContext";
import Upload from './File-Upload'
import Editor from "../../Editor/Editor";
var Carousel = require("react-responsive-carousel").Carousel;
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation(
    $id: ID!
    $slug: String!
    $title: String!
    $price: Int!
    $quantity: Int!
    $description: String!
    $descriptionHtml: String!
    $published: Boolean!
  ) {
    updateProduct(
      id: $id
      slug: $slug
      title: $title
      price: $price
      quantity: $quantity
      description: $description
      descriptionHtml: $descriptionHtml
      published: $published
    ) {
      id
      slug
    }
  }
`;

/*const ADD_ORDER_MUTATION = gql`
  mutation AddCategoryMutation($categorySlug: String!, $categorySlug: String!, $tags:[tagsInput]!) {
  addCategory(categorySlug: $categorySlug, categorySlug: $categorySlug, tags: $tags) {
    id
    }
  }
`*/

/*function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}*/
class Checkout extends Component {
  state = {
    id: this.props.product.id,
    slug: this.props.product.slug,
    title: this.props.product.title,
    price: this.props.product.price || 0,
    quantity: this.props.product.quantity || 0,
    description: this.props.product.description || "",
    descriptionHtml: this.props.product.descriptionHtml || "",
    published: this.props.product.published || false,
    showError: false,
    isLogged: false,
    value: [],
    imageOptions: []
  };
  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    });
  };

  handleChange = (e, { value }) => this.setState({ currentValues: value });
  componentWillMount() {}
  render() {
    const {
      id,
      slug,
      title,
      price,
      description,
      descriptionHtml,
      quantity,
      published,
      errorMessage
    } = this.state;
    return (
      <CartContext.Consumer>
        {cart => (
          <div>
            {this.state.showError && (
              <Segment basic textAlign="center">
                <Message
                  warning
                  onDismiss={e => this.setState({ showError: false })}
                  compact
                >
                  {errorMessage}
                </Message>
              </Segment>
            )}

            <h3 className="ui header">Edit Product</h3>
            <Form size="large">
              <Segment basic>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Product Slug"
                    placeholder="productSlug"
                    value={slug}
                    onChange={e => this.setState({ slug: e.target.value })}
                  />
                  <Form.Field
                    control={Input}
                    label="Product Title"
                    placeholder="productTitle"
                    value={title}
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    type="number"
                    label="Price"
                    labelPosition="right"
                    placeholder="productPrice"
                    value={price}
                    onChange={e =>
                      this.setState({ price: parseInt(e.target.value) })
                    }
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    type="number"
                    label="Quantity"
                    labelPosition="right"
                    placeholder="จำนวน"
                    value={quantity}
                    onChange={e =>
                      this.setState({
                        quantity: parseInt(e.target.value)
                      })
                    }
                  />
                </Form.Group>
                <Form.Field
                  control={Input}
                  label="Description"
                  placeholder="productDescription"
                  value={description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
                <Form.Field
                  control={Checkbox}
                  label="Published"
                  placeholder="productPublished"
                  onChange={e => this.setState({ published: !published })}
                />
                <Form.Field label="Product Image" />
                <Form.Group>
                  <Modal
                    trigger={
                      <Form.Field control={Button} content="Add Image" />
                    }
                  >
                    <Modal.Header>Select a Image</Modal.Header>
                    <Modal.Content image>
                      <Upload product={this.props.product} refetch={this.props.refetch}/>
                    </Modal.Content>
                  </Modal>
                </Form.Group>

                <Form.Field>
                  {!this.props.product.image.length && (
                    <Image
                      bordered
                      rounded
                      size="medium"
                      src="/image/test.jpg"
                    />
                  )}
                  <div style={{ width: "300px", height: "300px" }}>
                    <Carousel
                      showArrows={true}
                      showThumbs={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      emulateTouch={true}
                    >
                      {this.props.product.image.map((keyName, i) => (
                        <div key={i}>
                          <img
                            alt={this.props.product.image[i].name}
                            src={
                              "https://sushingg-api.herokuapp.com/images/" +
                              this.props.product.image[i].name
                            }
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </Form.Field>

                <Form.Field label="DescriptionHtml" />
                <Form.Field>
                  <Editor
                    htmltext={this.editorText}
                    html={this.state.descriptionHtml}
                  />
                </Form.Field>

                <Mutation
                  mutation={UPDATE_PRODUCT_MUTATION}
                  variables={{
                    id,
                    slug,
                    title,
                    price,
                    quantity,
                    description,
                    descriptionHtml,
                    published
                  }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                >
                  {mutation => (
                    <Button color="blue" fluid size="large" onClick={mutation}>
                      Edit Product
                    </Button>
                  )}
                </Mutation>
              </Segment>
            </Form>
          </div>
        )}
      </CartContext.Consumer>
    );
  }
  editorText = htmltext => {
    this.setState({
      descriptionHtml: htmltext
    });
  };
  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true };
    });
    console.log(this.state.productPublished);
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false };
    });
  };
  _confirm = async data => {
    const order = data.updateProduct;
    console.log(order);
    this.props.refetch()
    //window.location = "/admin/listproduct";
  };
  _error = async error => {
    //alert(error);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

export default Checkout;
