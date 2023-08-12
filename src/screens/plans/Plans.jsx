import React, { useEffect, useState } from "react";
import "./plans.css";
import db from "../../config/firebase";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { message } from "antd";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

function Plans() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    getDocs(collection(db, "customers", userReducer.user?.uid, "subscriptions"))
      .then((querySnapshot) => {
        let subscriptionsData = {};
        querySnapshot.forEach((sub) => {
          subscriptionsData = {
            role: sub.data().role,
            current_period_end: sub.data().current_period_end.seconds,
            current_period_start: sub.data().current_period_start.seconds,
          };
        });
        setSubscription(subscriptionsData);
      })
      .catch((error) => {
        // Handle error
        message.error(error.message);
      });
  }, [userReducer.user?.uid]);

  const productsRef = collection(db, "products");

  const getProducts = () => {
    getDocs(productsRef)
      .then((res) => {
        const promises = res.docs.map((doc) => {
          const pricesRef = collection(productsRef, doc.id, "prices");

          return getDocs(pricesRef)
            .then((data) => {
              const priceOfEachProduct = data.docs.map((price) => {
                return { ...price.data(), priceId: price.id };
              });
              return {
                ...doc.data(),
                id: doc.id,
                prices: priceOfEachProduct,
              };
            })
            .catch((err) => {
              message.error(err.message);
            });
        });

        Promise.all(promises).then((res) => {
          setProducts(res);
        });
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const loadCheckout = async (priceId) => {
    try {
      const docRef = await addDoc(
        collection(db, "customers", userReducer.user?.uid, "checkout_sessions"),
        {
          mode: "subscription",
          price: priceId, // One-time price created in Stripe
          success_url: `${window.location.origin}/home`,
          cancel_url: `${window.location.origin}/home`,
        }
      );
      onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          message.error(error.message);
        }
        if (sessionId) {
          const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
          stripe.redirectToCheckout({
            sessionId,
          });
        }
      });
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="plans">
      {subscription?.role && (
        <div
          style={{
            padding: "2% 0",
            borderBottom: "1px solid #282c2d",
            borderTop: "1px solid #282c2d",
          }}
        >
          <p>
            Renewal Date :
            <span style={{ color: "red" }}>
              {" "}
              {new Date(
                subscription?.current_period_end * 1000
              ).toLocaleDateString()}
            </span>
          </p>
          <p>
            Current Plan:
            <span style={{ color: "red" }}> {subscription?.role}</span>
          </p>
        </div>
      )}
      {products?.map((product) => {
        const isCurrentpackage = product.name
          ?.toLowerCase()
          ?.includes(subscription?.role?.toLowerCase());

        return (
          <div className="plan-box" key={product.id}>
            <div className="info">
              <h5>{product.name}</h5>
              <h6>{product.description}</h6>
            </div>
            <button
              className="sub-btn"
              onClick={() =>
                !isCurrentpackage && loadCheckout(product.prices[0]?.priceId)
              }
              disabled={isCurrentpackage ? true : false}
            >
              {isCurrentpackage ? "Current package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
