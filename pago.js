document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const itbmsAmountElement = document.getElementById('itbms-amount');
    const totalWithItbmsElement = document.getElementById('total-with-itbms');
    const completePurchaseButton = document.getElementById('complete-purchase');
    const paymentForm = document.getElementById('payment-form');
    const paymentDetailsForm = document.getElementById('payment-details');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Precio: $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalAmount += item.price * item.quantity;
        });

        const itbms = totalAmount * 0.07;
        const totalWithItbms = totalAmount + itbms;

        totalAmountElement.textContent = totalAmount.toFixed(2);
        itbmsAmountElement.textContent = itbms.toFixed(2);
        totalWithItbmsElement.textContent = totalWithItbms.toFixed(2);
    };

    completePurchaseButton.addEventListener('click', () => {
        paymentForm.style.display = 'block';
    });

    paymentDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (name && email && address) {
            localStorage.removeItem('cartItems');
            window.location.href = 'index.html';
        }
    });

    renderCart();
});