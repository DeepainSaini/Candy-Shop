addEventListener("DOMContentLoaded",function(event){

    axios.get('http://localhost:3000'+"/products/data")
    .then((res)=>{
        for(let i=0;i<res.data.length;i++){
            displayOnScreen(res.data[i]);
        }
    })
    .catch((err)=>{console.log(err)});
})


function handleFormSubmit(event){
    event.preventDefault();
    
    const candyDetails = {

        name : event.target.candyname.value,
        description: event.target.description.value,
        price : event.target.candyprice.value,
        quantity : event.target.candyquantity.value
    }

    console.log(candyDetails);
   
    axios.post('http://localhost:3000'+"/products",
        candyDetails
    )
    .then((res)=>{
        displayOnScreen(res.data.product);
    })
    .catch((err)=>{console.log(err)});

    document.getElementById("candyname").value = "";
    document.getElementById("description").value = "";
    document.getElementById("candyprice").value = "";
    document.getElementById("candyquantity").value = "";
}

function displayOnScreen(candyDetails){

    const listItem = document.createElement('li');
    const listItemText = document.createTextNode(
         `${candyDetails.name}  ${candyDetails.description}   Rs:${candyDetails.price}    pieces:${candyDetails.quantity}   `
    );
    listItem.appendChild(listItemText);

    listItem.id = candyDetails.id;

    const inputBtn = document.createElement('input');
    inputBtn.type = "number";
    listItem.appendChild(inputBtn);

    
    const buyBtn = document.createElement('button');
    buyBtn.appendChild(document.createTextNode('Buy'));
    listItem.appendChild(buyBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('delete'));
    listItem.appendChild(deleteBtn);

    listItem.style.gridColumn = "10px";
    listItem.style.margin = "10px";

    const children = listItem.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.marginLeft = '10px';
    }

    const list = document.querySelector('ul');
    list.appendChild(listItem);



    buyBtn.addEventListener("click",function(event){
        
        
        const candyToUpdate = event.target.parentElement.firstChild;
        const candyId = event.target.parentElement.id;
        const currentQuantity = candyDetails.quantity;
        const buyQuantity = event.target.previousSibling.value;
        const leftQuantity = currentQuantity-buyQuantity;
        
        if (candyDetails.quantity - buyQuantity < 0) {
            

            const error = document.createTextNode("Enter Valid Quantity");
            event.target.parentElement.appendChild(error);
            setTimeout(() => {
                event.target.parentElement.removeChild(event.target.parentElement.lastChild);
            }, 3000);
            return;
        }
        
        candyDetails.quantity = leftQuantity;
        
        

        axios.put('http://localhost:3000'+`/products/${candyId}`,{
           
            "name" : candyDetails.name,
            "description" : candyDetails.description,
            "price" : candyDetails.price,
            "quantity" : leftQuantity
        })
        .then((res)=>{
           candyToUpdate.textContent =  `${candyDetails.name}  ${candyDetails.description}   Rs:${candyDetails.price}   pieces:${leftQuantity} `;
          
        })
        .catch((err)=>{console.log(err)});

        event.target.previousSibling.value = "";
    })

    deleteBtn.addEventListener("click",function(event){
        
        candyToDelete = event.target.parentElement;
        candyToDeleteId = event.target.parentElement.id;
        

        axios.delete('http://localhost:3000'+`/products/${candyToDeleteId}`)
               .then((res)=>{
                list.removeChild(candyToDelete);
               })
               .catch((err)=>{console.log(err)});

    })


}

