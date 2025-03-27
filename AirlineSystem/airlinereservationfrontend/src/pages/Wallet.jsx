import React, { useState, useEffect } from "react";
import { FaWallet, FaRupeeSign, FaPlusCircle } from "react-icons/fa";
import PassengerNavbar from "../Components/PassengerNavbar"; // Import Passenger Navbar
import "../styles/Wallet.css";

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const passengerId = localStorage.getItem("passengerId");

  useEffect(() => {
    if (!passengerId) {
      console.error("No passenger ID found in localStorage.");
      return;
    }
  
    fetch(`http://localhost:8080/wallets/${passengerId}`)
      .then((response) => {
        if (response.status === 404) {
          console.log("Wallet not found, creating new one...");
          return fetch(`http://localhost:8080/wallets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passenger: { id: passengerId }, balance: 0 }),
          }).then((res) => res.json());
        }
        return response.json();
      })
      .then((data) => {
        if (data && typeof data.balance === "number") {
          setWalletBalance(data.balance);
        } else {
          console.error("Invalid wallet data received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching wallet balance:", error);
      });
  }, [passengerId]);
  
  

  const handleAddMoney = async () => {
    const enteredAmount = parseFloat(amount);

    if (!passengerId) {
      alert("User not logged in!");
      return;
    }
    if (isNaN(enteredAmount) || enteredAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (enteredAmount > 50000) {
      alert("Maximum limit per transaction is ₹50,000.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/wallets/addMoney/${passengerId}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: enteredAmount }), 
      });

      if (!response.ok) {
        throw new Error("Failed to add money.");
      }

      const updatedWallet = await response.json();
      setWalletBalance(updatedWallet.balance);
      alert(`₹${enteredAmount} added successfully!`);
      setAmount("");
    } catch (error) {
      console.error("Error adding money:", error);
      alert("Failed to add money. Try again later.");
    }
  };

  return (
    <>
      <PassengerNavbar /> {/* Use the Passenger Navbar Component */}
      <div className="wallet-container">
        <h2><FaWallet className="wallet-icon" /> My Wallet</h2>

        <div className="wallet-balance">
          <p>Current Balance:</p>
          <h3><FaRupeeSign /> {walletBalance.toLocaleString()}</h3>
        </div>

        <div className="wallet-input">
          <input
            type="number"
            placeholder="Enter amount (Max ₹50,000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="add-wallet-button" onClick={handleAddMoney}>
            <FaPlusCircle /> Add to Wallet
          </button>
        </div>
      </div>
    </>
  );
};

export default Wallet;
