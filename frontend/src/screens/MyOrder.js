import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderDatas, setorderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  let order = orderDatas.orderData?.order_data;

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <h3 className="mt-5">Order Details</h3>
          {order?.map((orderDetails, index) => (
            <div key={index}>
              <div className="m-auto mt-5">
                <h4>Order Date: {orderDetails[0].order_date}</h4>
                <table border={{ color: "white" }}>
                  <thead style={{ padding: "15px" }}>
                    <tr>
                      <th style={{ padding: "15px" }}>Name</th>
                      <th style={{ padding: "15px" }}>Quantity</th>
                      <th style={{ padding: "15px" }}>Size</th>
                      <th style={{ padding: "15px" }}>Price</th>
                    </tr>
                  </thead>
                  <tbody style={{ padding: "15px" }}>
                    {orderDetails.slice(1).map((item, index) => (
                      <tr key={index} style={{ padding: "15px" }}>
                        <td style={{ padding: "15px" }}>{item.name}</td>
                        <td style={{ padding: "15px" }}>{item.qty}</td>
                        <td style={{ padding: "15px" }}>{item.size}</td>
                        <td style={{ padding: "15px" }}>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
