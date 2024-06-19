document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = productElement.getAttribute('data-price');
            const stockElement = productElement.querySelector('.stock');
            let stock = parseInt(stockElement.textContent);

            if (stock > 0) {
                stock--;
                stockElement.textContent = stock;

                const existingProductIndex = cart.findIndex(item => item.id === productId);
                if (existingProductIndex !== -1) {
                    cart[existingProductIndex].quantity++;
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                alert('محصول به سبد خرید اضافه شد.');
            } else {
                alert('موجودی محصول به پایان رسیده است.');
            }
        });
    });

    const cartList = document.querySelector('.cart-list');
    if (cartList) {
        if (cart.length > 0) {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>تعداد: ${item.quantity}</p>
                    <p>قیمت: ${item.price} تومان</p>
                `;
                cartList.appendChild(cartItem);
            });
        } else {
            cartList.innerHTML = '<p>سبد خرید شما خالی است.</p>';
        }
    }
});