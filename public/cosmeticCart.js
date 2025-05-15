let cart=[];
function addToCart(button){
const product=button.parentElement;
const id=product.getAttribute('data-id');
const name=product.getAttribute('data-name');
const price=parseFloat(product.getAttribute('data-price'));
const existing=cart.find(item=>item.id===id);
if(existing){
    existing.qty+= 1;
}else{
    cart.push({id,name,price,qty: 1});
}
renderCart();

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
    cart.forEach(item=>{
        const div=
        document.createElement('div');
        div.calssName='cart-item';
        div.innerHTML=`
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6">
                    <img src="" alt="...">
                    <span>${item.name} (x${item.qty})-rs
                </div>
                <div class="col-md-6">
                    ${item.price*item.qty}</span>
                    <button onclick="removeFromCart('${item.id}')">Remove</button>
                <div>
            </div>
        </div>
        
        
       
        `;
        cartDiv.appendChild(div);
    });
    const total=cart.reduce((sum,item)=>sum+item.price*item.qty,0);
    const totalDiv=
    document.createElement('div');
    totalDiv.innerHTML=`<strong>Total: rs${total}</strong>`;
    cartDiv.appendChild(totalDiv);
}