import React from "react";
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import CartPage from "./CartPage";

describe("CartPage Component", () => {
  beforeEach(() => {
    render(<CartPage />);
  });

  it("renders the heading", () => {
    const headingElement = screen.getByText(/Items Added To The Food/i);
    expect(headingElement).to.be.ok; // Check if heading is in the document
  });

  it("renders the table headers", () => {
    const headers = ["#", "Food", "Item name", "Quantity", "Price", "Action"];

    headers.forEach((header) => {
      const headerElement = screen.getByText(header);
      expect(headerElement).to.be.ok; // Check if each header is in the document
    });
  });

  it("renders the food item", () => {
    const foodItem = screen.getByText(/Hart Hagerty/i);
    expect(foodItem).to.be.ok; // Check if the food item is present
  });

  it("renders the details button", () => {
    const buttonElement = screen.getByRole("button", { name: /details/i });
    expect(buttonElement).to.be.ok; // Check if the details button is present
  });
});
