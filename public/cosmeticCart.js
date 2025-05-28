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
        div.className='cart-item';
        div.innerHTML=`
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-4">
                    <img src="#" alt="...">
                </div>
                <div class="col-md-4">
                    <span>${item.name}
                </div>
                <div class="col-md-2">
                    (x${item.qty}) 
                </div>
                <div class="col-md-2">
                    Rs. ${item.price*item.qty}</span>
                    <button style="border:none;background-color: rgb(253,252,252);" onclick="removeFromCart('${item.id}')"><i class="bi bi-trash" style="color:red;"></i></button>
                </div>
            </div>
        </div>
        `;
        cartDiv.appendChild(div);
    });
    const total=cart.reduce((sum,item)=>sum+item.price*item.qty,0);
    const totalDiv=
    document.createElement('div');
    totalDiv.innerHTML=`<strong>Total: Rs${total}</strong>`;
    cartDiv.appendChild(totalDiv);
}