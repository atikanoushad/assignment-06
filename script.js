//all categories
const categoryContainer = document.getElementById('categoryContainer');
const allTrees = document.getElementById('allTrees')

// spinner
// const manageSpinner = (status) => {
//   if(status == true ){
//     document.getElementById("spinner").classList.remove("hiddenn");
//     document.getElementById("plants-container").classList.add("hidden")
//   }
//   else{
//     document.getElementById("plants-container").classList.remove("hiddenn");
//     document.getElementById("spinner").classList.add("hiddenn")
//   }
// }

const loadDetails =(id)=>{
//    console.log("details")
const urll = `https://openapi.programming-hero.com/api/plant/${id}`
// console.log(urll)
fetch(urll)
    .then((res) => res.json())
    .then((data) => {
       displayModal(data.plants);

})
}
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
const displayModal=(plant) =>{
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML=`
    <div class="bg-white p-2   " >
           
              <img class=" pt-2  " src="${plant.image}" alt="">
              <h4 class="font-bold pt-2">${plant.name}</h4>
              <p class="text-sm text-gray-500">${plant.description}</p>
              <div class="flex justify-between pt-1">
                <p class="bg-[#DCFCE7] px-2 py-1 text-sm rounded-2xl text-green-800">${plant.category}</p>
                <p class="font-bold pt-2">${plant.price}</p>
              </div>
              <div class="pt-1">
                <button class=" bg-green-800 pt-2  text-white px-43 pb-1 rounded-full ">Add to Cart</button>
              </div>
              </div>
    </div>
    `
    document.getElementById("my_modal_3").showModal()


}
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.categories);
        const categories = data.categories;
        // console.log(categories)
            showCategory(categories);     
        });
    }
 
loadCategories();
// const loadAllTrees = () => {
//     fetch("https://openapi.programming-hero.com/api/plants")
//     .then((res) => res.json())
//     .then((data) => {
//         // console.log(data.categories);
//         const plants = data.data;
//         console.log(plants);
//         // console.log(categories)
//             showAllTrees(plants);     
//         });
//     }
 
// loadAllTrees();
const loadTrees=(id)=>{
  // manageSpinner(true)
    // console.log("Trees",id);
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    // console.log(url)
     fetch(url)
    .then((res) => res.json())
    .then((data) => {
        displayTrees(data.plants) 
        });
      
}

const displayTrees = (plants) => {
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML=""
  plants.forEach((plant)=>{
    const plantCard = document.createElement("div")
    plantCard.innerHTML=`
    <div  class="bg-white p-2 h-[390px] w-[295px]  " >
           
              <img class="w-[290px] h-[186px] pt-2 " src="${plant.image}" alt="">
              <h4 onclick="loadDetails(${plant.id})" class="font-bold pt-2 plant-tittle">${plant.name}</h4>
              <p class="text-sm text-gray-500">${plant.description}</p>
              <div class="flex justify-between pt-1">
                <p class="bg-[#DCFCE7] px-2 py-1 text-sm rounded-2xl text-green-800">${plant.category}</p>
                <p class="plant-price font-bold pt-2">${plant.price}</p>
              </div>
              <div class="pt-3 pb-3">
                <button onclick="addToCart(this)" class=" bg-green-800 pt-2  text-white px-24 pb-1 rounded-full ">Add to Cart</button>
              </div></div>
    `
    plantsContainer.append(plantCard)
      
  })
// manageSpinner(false)
    
}

const showCategory = (categories) => {
          categories.forEach(cat => {
               categoryContainer.innerHTML += `
             <li onclick="loadTrees(${cat.id})" id="${cat.id}" class="pt-2 hover:bg-green-800 hover:text-white">${cat.category_name} </li>`
     });


// const showCategory = (categories) => {
//   const categoryContainer = document.getElementById("categoryContainer")
//   categoryContainer.innerHTML = ""
//   categories.forEach((cate)=>{
//     // const allTree = document.createElement("li")
//     // allTree.innerHTML=`
//     // <p id="allTrees" class="pt-2 hover:bg-green-800 hover:text-white">    <a href="">All Trees</a> </p>
//     // `
//     // const li = document.createElement("li")
//     // li.className = "pt-2 hover:bg-green-800 hover:text-white"
//     // li.innerHTML = `<a href="#">All trees</a>`

//     categoryContainer.append(li)
//   })
// }

             categoryContainer.addEventListener('click' , (e) =>{
                const allLi = document.querySelectorAll('li')
                allLi.forEach(li => {
                    li.classList.remove(' bg-green-800')
                })
                if(e.target.localName === 'li'){
                    console.log(e.target)
                    e.target.classList.add(' bg-green-800')
                }
             })
           
   
}

// document.getElementById("plants-container").addEventListener('click' ,(e) => {
//   console.log(e.target)
// })

let cart = []
let total = 0


const addToCart = (btn,event) =>{
  // event.stopImmediatePropagation();
  // console.log("clicked",btn)
  const card = btn.parentNode.parentNode 
  const plantTittle = card.querySelector(".plant-tittle").innerText ;
  const plantPrice = card.querySelector(".plant-price").innerText ;
  const plantPriceNum = Number(plantPrice)

  console.log(plantTittle,plantPriceNum)

  const selectedItem = {
    plantTittle : plantTittle, 
    plantPrice : plantPriceNum,
  };
  cart.push(selectedItem);
  total = total + plantPriceNum
  displayCart(cart);
  displayTotal(total)
}
  //cart-card
   const displayTotal=(val)=>{
    document.getElementById("cart-total").innerHTML = val ;

   }

 const  displayCart = (cart) =>{
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML=""
for(let item of cart){
  const newItem = document.createElement("div")
  newItem.innerHTML = `
  <div  class= "bg-[#F0FDF4] m-3 flex justify-between p-5">
            <div>
               <h2 class="font-bold text-[16px] plant-tittle">${item.plantTittle}</h2>
            <p class="plant-price">${item.plantPrice} x 1</p>
            </div>
           <div onclick="removeCart(this)">
            <i class="fa-solid fa-xmark"></i>

           </div>
          </div>
  `
  cartContainer.append(newItem)
}
  }
   
const removeCart = (btn) => {
  const item = btn.parentNode;
  const plantTittle = item.querySelector(".plant-tittle").innerText
  const plantPrice = item.querySelector(".plant-price").innerText

  cart = cart.filter((item)=> item.plantTittle != plantTittle);
  displayCart(cart)
}




// const showAllTrees = (plants) =>{
//      categories.forEach(cat => {
//               allTrees.innerHTML += `<li onclick="loadTrees()"  class="pt-2 hover:bg-green-800 hover:text-white"> <a href="">All Trees</a> </li>
//              `
//      });
// }