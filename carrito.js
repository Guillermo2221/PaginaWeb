document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.getElementById('cart');
    const closeCart = document.getElementById('close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const proceedToPayment = document.getElementById('proceed-to-payment');

    let cartItems = [];

    const saveCart = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const loadCart = () => {
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        renderCart();
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
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
                <button class="decrease-quantity" data-product-id="${item.id}">-</button>
                <button class="increase-quantity" data-product-id="${item.id}">+</button>
                <button class="remove-from-cart" data-product-id="${item.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                cartItems = cartItems.map(item => {
                    if (item.id === productId) {
                        item.quantity++;
                    }
                    return item;
                });
                saveCart();
                renderCart();
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                cartItems = cartItems.map(item => {
                    if (item.id === productId && item.quantity > 1) {
                        item.quantity--;
                    }
                    return item;
                });
                saveCart();
                renderCart();
            });
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                cartItems = cartItems.filter(item => item.id !== productId);
                saveCart();
                renderCart();
            });
        });
    };

    cartIcon.addEventListener('click', () => {
        cart.classList.toggle('open');
    });

    closeCart.addEventListener('click', () => {
        cart.classList.remove('open');
    });

    proceedToPayment.addEventListener('click', () => {
        window.location.href = 'cesta.html';
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productDescription = button.getAttribute('data-product-description');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));
            const productImage = button.getAttribute('data-product-image');

            const existingItem = cartItems.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                const newItem = {
                    id: productId,
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
                cartItems.push(newItem);
            }

            saveCart();
            renderCart();
        });
    });

    loadCart();
});

