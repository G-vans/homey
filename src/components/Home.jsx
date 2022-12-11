import React from "react";
import { Button } from "./Button";

export default function Home() {
  return (
    <div className="hero-container">
      <h1>Estate- Intel</h1>
      <p>What property intel are you looking for?</p>
      <div className="hero-btns">
        <Button
          className="btns"

        >
         LET'S GET STARTED
        </Button>
      </div>
    </div>
  );
}
