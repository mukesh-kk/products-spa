import axios from "axios";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { OrderApi, ProductApi } from "../../services/apis";
import { toast } from "react-toastify";
import "./ProductsScreen.css";
export default function ProductsScreen(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      url: ProductApi.GET_PRODUCTS,
      method: "get",
    })
      .then((res) => {
        console.log(res);
        setProducts(res.data.data);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);
  async function createOrder(prod) {
    axios({
      url: OrderApi.POST_ORDER,
      method: "post",
      data: {
        productId: prod._id,
        userId: props?.user?._id,
      },
    })
      .then(() => {
        toast.success("Successfully placed order");
      })
      .catch(() => {
        toast.error("Couldn't place order");
      });
  }
  return (
    <>
      <MDBNavbar light bgColor="light" className="sticky-top">
        <MDBContainer fluid>
          <MDBNavbarBrand className="colorgreen2 space-between  " href="#">
            <p
              style={{ margin: 0 }}
              onClick={() => {
                navigate("/products");
              }}
            >
              Traya.
            </p>
          </MDBNavbarBrand>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ margin: 0, marginRight: "20px" }}>
              Welcome {props?.user?.name} !
            </p>
            <MDBBtn
              className="btngreen4"
              onClick={() => {
                navigate("/your-orders");
              }}
            >
              Orders
            </MDBBtn>
            <MDBBtn
              className=" ms-2 "
              color="dark-emphasis"
              onClick={() => {
                navigate("/");
              }}
            >
              LogOut
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBNavbar>
      <MDBTypography blockquote className="mb-0 ms-5 mt-3">
        <p>Our products: Place your orders here</p>
      </MDBTypography>
      <MDBRow className="row-cols-1 row-cols-md-4  mt-5 ms-5 me-5">
        {products.map((each, i) => {
          return (
            <MDBCol key={i} className="mt-4">
              <MDBCard className="h-auto  boxss">
                <MDBCardImage
                  className="h-50 "
                  src={each?.image}
                  alt="..."
                  position="top"
                />
                <MDBCardBody className="h-50">
                  <MDBCardTitle>{each?.name}</MDBCardTitle>
                  <MDBCardText>{each?.description}</MDBCardText>
                  <MDBBtn
                    className="btngreen4"
                    onClick={() => {
                      createOrder(each);
                    }}
                  >
                    Place Order
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          );
        })}
      </MDBRow>
    </>
  );
}

ProductsScreen.propTypes = {
  user: PropTypes.object,
};
