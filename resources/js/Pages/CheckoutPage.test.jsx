import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutPage from "./CheckoutPage";
import { beforeEach, vitest } from "vitest";

describe('CheckoutPage Component', () => {
    const mockCloseCheckout = vitest.fn();
    beforeEach(() => {
        const cart = [
            {
                category: { id: 1, name: "külső kiegészítők" },
                categoryId: 1,
                description: "High-quality front brake pads for BMW E46 models.",
                id: 1,
                models: "E46",
                name: "BMW E46 Front Brake Pads",
                pictureUrl: "img/e46_brake_pads.webp",
                price: 25000,
                quantity: 1
            },
            {
                category: { id: 1, name: "külső kiegészítők" },
                categoryId: 1,
                description: "Durable rear shock absorbers for BMW E90 models.",
                id: 4,
                models: "E90",
                name: "BMW E90 Rear Shock Absorbers",
                pictureUrl: "img/e90-shocks.jpg",
                price: 55000,
                quantity: 2
            },
        ];
        render(<CheckoutPage cart={cart} closeCheckout={mockCloseCheckout}/>);
    })
    test("initial state of CheckoutPage", () => {
        const inputFirstName = screen.getByRole("textbox", { name: /first name/i });
        expect(inputFirstName).toBeInTheDocument();
        const inputLastName = screen.getByRole("textbox", { name: /last name/i });
        expect(inputLastName).toBeInTheDocument();
        const emailAddress = screen.getByRole("textbox", { name: /email/i });
        expect(emailAddress).toBeInTheDocument();
        const address = screen.getByRole("textbox", { name: "Address" });
        expect(address).toBeInTheDocument();
        const city = screen.getByRole("textbox", { name: /city/i });
        expect(city).toBeInTheDocument();
        const postalCode = screen.getByRole("textbox", { name: /postal code/i });
        expect(postalCode).toBeInTheDocument();
        const phoneNumber = screen.getByRole("textbox", { name: /phone/i });
        expect(phoneNumber).toBeInTheDocument();
        const shippingMethod = screen.getByRole("combobox", { name: /shipping method/i });
        expect(shippingMethod).toBeInTheDocument();
        const paymentMethod = screen.getByRole("combobox", { name: /payment method/i });
        expect(paymentMethod).toBeInTheDocument();
        const backToCart = screen.getByRole("button", { name: /back to cart/i });
        expect(backToCart).toBeInTheDocument();
        const proceedToPayment = screen.getByRole("button", { name: /proceed to payment/i });
        expect(proceedToPayment).toBeInTheDocument();
        const total = screen.getByText( /total: 136000 ft/i );
        expect(total).toBeInTheDocument();

    });
    test("clicking back to cart button", async () => {
        const backToCart = screen.getByRole("button", 
            { 
                name: /back to cart/i,
            });
        expect(backToCart).toBeInTheDocument();
        fireEvent.click(backToCart);
        expect(mockCloseCheckout).toHaveBeenCalledTimes(1);
    });

    test("shipping mode change", () => {
        const shippingMethod = screen.getByRole("combobox", { name: /shipping method/i });
        expect(shippingMethod).toBeInTheDocument();
        fireEvent.change(shippingMethod, { target: { value: "2" } });
        expect(shippingMethod.value).toBe("2");
        let total = screen.getByText( /total: 137500 Ft/i );
        expect(total).toBeInTheDocument();
    });

    test("payment mode change", () => {
        const paymentMethod = screen.getByRole("combobox", { name: /payment method/i });
        expect(paymentMethod).toBeInTheDocument();
        fireEvent.change(paymentMethod, { target: { value: "2" } });
        expect(paymentMethod.value).toBe("2");
        let total = screen.getByText( /total: 136500 Ft/i );
        expect(total).toBeInTheDocument();
        fireEvent.change(paymentMethod, { target: { value: "3" } });
        expect(paymentMethod.value).toBe("3");
        total = screen.getByText( /total: 136500 Ft/i );
        expect(total).toBeInTheDocument();
    });
});
