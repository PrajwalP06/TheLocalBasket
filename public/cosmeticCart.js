let cart=[];
function addToCart(button){
const product=button.parentElement;
const id=product.getAttribute('data-id');
const name=product.getAttribute('data-name');
const price=parseFloat(product.getAttribute('data-price'));
const existing=cart.find(item=>item.id===id);
const img=product.getAttribute('data-image');
if(existing){
    existing.qty+= 1;
}else{
    cart.push({id,name,price,qty: 1});
}
renderCart();

}
function increaseQty(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty += 1;
        renderCart();
    }
}
function decreaseQty(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            renderCart();
        }
    }
}
function removeFromCart(id) {
    cart=cart.filter(item=>item.id!==id);
    renderCart();
}
function renderCart() {
    const cartDiv=
    document.getElementById('cart');
    cartDiv.innerHTML="";
    if(cart.length===0){
        cartDiv.innerHTML='<p> Your cart is empty.</p>';
        return;
    }
     cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="row mb-2">
                <div class="col-md-4">${item.name}</div>
                <div class="col-md-2">
                    <button onclick="decreaseQty('${item.id}')">-</button>
                    ${item.qty}
                    <button onclick="increaseQty('${item.id}')">+</button>
                </div>
                <div class="col-md-2">Rs. ${item.price}</div>
                <div class="col-md-2">Rs. ${item.price * item.qty}</div>
                <div class="col-md-2">
                    <button onclick="removeFromCart('${item.id}')">
                        <i class="bi bi-trash" style="color:red; border: none;"></i>
                    </button>
                </div>
            </div>
            <div>
                <button class=Btn-Checkout id=checkout>Checkout</button>
            </div>
        `;
        cartDiv.appendChild(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: Rs. ${total}</strong>`;
    cartDiv.appendChild(totalDiv);
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Proceeding to checkout with total amount: Rs. " + cart.reduce((sum, item) => sum + item.price * item.qty, 0));
    // You can add backend integration or redirect here.
}