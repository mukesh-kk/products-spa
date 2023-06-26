import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBNavbar,
  MDBNavbarBrand,
  MDBTypography,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
  MDBTextArea,
} from "mdb-react-ui-kit";
import "./OrderScreen.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderApi } from "../../services/apis";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router";
import empty from "../../assets/empty.svg";
function OrderScreen(props) {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: OrderApi.GET_ORDER,
      params: { userId: props.user?._id },
    })
      .then((res) => {
        console.log(res);
        setOrders(res.data.data);
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Something went wrong");
      });
  }, [deleted]);
  function updateOrderFeedback(order) {
    axios({
      method: "patch",
      url: OrderApi.UPDATE_ORDER + "/" + order._id,
      data: { stars: order.stars || 0, feedback: order.feedback || "" },
    }).then(() => {
      toast.success("Successfully Done");
    });
  }
  const orderDelete = (ord) => {
    axios
      .delete(OrderApi.DELETE_ORDER + "/" + ord._id)
      .then(() => {
        toast.success("Deleted");
        setDeleted((prev) => !prev);
      })
      .catch(() => {
        toast.error("Some thing went wrong");
      });
  };
  return (
    <>
      <MDBNavbar className="sticky-top" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand className="colorgreen2 space-between  " href="#">
            <p
              onClick={() => {
                navigate("/products");
              }}
              style={{ margin: 0 }}
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
      <MDBTypography blockquote className="mb-0 ms-5 mt-5">
        <p>Your order history</p>
      </MDBTypography>
      <MDBContainer fluid>
        {orders?.length > 0 ? (
          orders.map((each) => {
            return (
              <MDBRow key={each._id} className="justify-content-center mb-3">
                <MDBCol md="12" xl="10">
                  <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                          <MDBRipple
                            rippleColor="light"
                            rippleTag="div"
                            className="bg-image rounded hover-zoom hover-overlay"
                          >
                            <MDBCardImage
                              src={each.productId.image}
                              fluid
                              className="w-100"
                            />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.15)",
                                }}
                              ></div>
                            </a>
                          </MDBRipple>
                        </MDBCol>
                        <MDBCol md="4">
                          <h5>{each.productId.name}</h5>
                          <div className="d-flex flex-row w-100">
                            <div className="text-danger mb-1 me-2  d-flex justify-content-between w-100 ">
                              <Rating
                                iconsCount={5}
                                readonly={true}
                                initialValue={each.stars}
                                /* Available Props */
                              />
                              <div style={{ marginLeft: "500px" }}>
                                <MDBBtn
                                  title="Delete from order history"
                                  color="dark-emphasis"
                                  onClick={() => {
                                    orderDelete(each);
                                  }}
                                >
                                  Delete
                                </MDBBtn>
                              </div>
                            </div>
                          </div>

                          <div className="mb-2 text-muted small">
                            <span>Unique design</span>
                            <span className="text-primary"> • </span>
                            <span>For men hairs</span>
                            <span className="text-primary"> • </span>
                            <span>
                              Casual
                              <br />
                            </span>
                            <span>
                              Status: Delivered <br />
                            </span>
                            <span>Your feedback:{each.feedback}</span>
                          </div>
                          <MDBBtn
                            className="mb-4 mt-5 px-5 btngreen "
                            color="#28a745"
                            size="md"
                            onClick={() => {
                              setSelectedOrder(each);
                              setShow(true);
                            }}
                          >
                            {each.feedback ? "Edit Feedback" : "+ Feedback"}
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            );
          })
        ) : (
          <>
            <img
              style={{ width: "60%", display: "block", margin: "auto" }}
              src={empty}
            />
            <p
              style={{
                fontSize: "18px",
                color: "#414440",
                textAlign: "center",
              }}
            >
              Nothing Found In Order History{" "}
            </p>
          </>
        )}
      </MDBContainer>
      <>
        {show ? (
          <MDBModal show={show} setShow={setShow} tabIndex="-1">
            <MDBModalDialog centered>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Your feedback matters</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={() => setShow((prev) => !prev)}
                  ></MDBBtn>
                </MDBModalHeader>
                <div style={{ width: "90%", margin: "auto" }}>
                  <div className="text-danger mb-1 me-2 mt-3">
                    <Rating
                      iconsCount={5}
                      onClick={(rate) => {
                        setSelectedOrder((prev) => {
                          return { ...prev, stars: rate };
                        });
                      }}
                      initialValue={selectedOrder?.stars}

                      /* Available Props */
                    />
                  </div>
                  <div className="text-danger mb-1 me-2 mt-4">
                    <MDBTextArea
                      label="Feedback"
                      id="textAreaExample"
                      rows={4}
                      value={
                        selectedOrder?.feedback ? selectedOrder?.feedback : ""
                      }
                      onChange={(e) => {
                        setSelectedOrder((prev) => {
                          return { ...prev, feedback: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
                <MDBModalFooter>
                  <MDBBtn
                    className="btngreengrey"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    Close
                  </MDBBtn>
                  <MDBBtn
                    className="btngreen4"
                    onClick={() => {
                      setOrders((prev) => {
                        return prev.map((each) => {
                          if (each._id == selectedOrder._id) {
                            return selectedOrder;
                          } else {
                            return each;
                          }
                        });
                      });
                      updateOrderFeedback(selectedOrder);
                      setShow(false);
                    }}
                  >
                    Done
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        ) : (
          <></>
        )}
      </>
    </>
  );
}
OrderScreen.propTypes = {
  user: PropTypes.object,
};

export default OrderScreen;
