const cartButton = document.getElementById("cartButton");
const closeCartButton = document.getElementById("closeCartButton");
const cartSection = document.getElementById("cartSection");
const main = document.querySelector("main");
const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const totalPriceDisplay = document.getElementById("totalPrice");
const emptyCartButton = document.getElementById("emptyCartButton");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sample product list
const allProducts = [
  { id: 1, name: "Oneplus", category: "Mobiles", price: 20998, description: "OnePlus Nord CE4 Lite 5G (Super Silver, 8GB RAM, 256GB Storage", image: "https://m.media-amazon.com/images/I/61Io5-ojWUL._SX679_.jpg"},
  { id: 2, name: "Samsung Galaxy Book4 Intel Core i7 13th Gen", category: "Laptops", price: 67810, description: "Performance you can count on Conquer your day with the latest Intel processor...", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSeAa1u040jBV8j3DYSmd6RxcNNBwZkmxeEaCMqUkDxCpDEsWvaeEuDsMVMHhbn2aCbrfM05SSDfBoOpoIdbUPZLhursnGlBfj4tDE0XLRv2I54fNGHJX4o&usqp=CAE" },
  { id: 3, name: "HP Pavilion 14 Laptop (12th Gen Core i5 / 16GB", category: "Laptops", price: 66959, description: "The HP Pavilion Laptop Powered by 12th Gen Intel Core i5, works...", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR-TGhekvDriakUsfgLpOOmz5Z1vfomRtSprpYHGiTlSiIH4_hOjHMyI9X2yvxdb8sVrtx2rxcca-o9Kyu4Q1Y7TJhVqoGtOElWVKM_kU6ltUao6WgRr3Ey&usqp=CAE" },
  { id: 4, name: "Infinix GT 20 Pro", category: "Mobiles", price: 22000, description: "High-performance smartphone with fast charging and a smooth...", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSNcrYABZj0sDf5LgXBKvM-Kweehv14Dqrfx5jgM-NkRTm1AOSNo4rMI2N-l2Zss2pjUKiaVDINa8bRSJUjg-tZ3kxIQevj1jI-QaS39YcLkbrvdhBuVEWdbw&usqp=CAE" },
  { id: 5, name: "Macbook", category: "Laptops", price: 366506, description: "Elevate your productivity and creativity with the Apple MacBook Pro ", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSHNf7Cm0vWL4Alkk67dFeLkwE3M6U3o4njTe2WViDEls9V3EdZ8k3OkzYsWwTceT8Q4OjX9aLGBi0NxiW2PF1M9yBqtgrqrkW3e9-miGeHfGWZGXmz7d8Mvg&usqp=CAE" },
  { id: 6, name: "Charger", category: "Accessories", price: 350, description: "Mi 2A Fast Charger with Cable", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSr3CpB9rIMCBbHtCb9Tntc_cCWPBkuMPRVjWZlr6LPYNX_COY71kCOg4l7c5O4GNkj6Q2ReuX53kcvhc-Ishsxmd2aU3C0lQDt2EfV6T0h_-z8LJEI33zXog&usqp=CAE" },
  { id: 7, name: "Readme", category: "Mobiles", price: 12499, description: "Redmi 13 5G 6GB + 128 GB, Orchid Pink", image: "https://i03.appmifile.com/84_item_in/11/07/2024/a81eb2562467b397b488f18bd4cc2506!600x600!85.jpg"},
  { id: 8, name: "IPhone 16", category: "Mobiles", price: 137900, description: "iPhone 16 Pro Max 256 GB: 5G Mobile Phone with Camera Control", image: "https://m.media-amazon.com/images/I/61giwQtR1qL._SX679_.jpg"},
  { id: 9, name: "Acer Nitro V Anv15-41 Amd Ryzen 7 Gaming Laptop", category: "Laptops", price: 75990, description: "AMD Ryzen 7 Processor. Elevate your productivity and creativity.", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTMokev0fBEHwaYRb2WP0gKXwLFB4mKIlYyXo0BtsOO0Sx_3dEDwp9imRPcXooXbK5hWxZR4IzjT525T32T9rKZc8vUx4Z66E5pwNA9McMOTMA6P-AHTOtw&usqp=CAE" },
  { id: 10, name: "HP Victus Windows 11 Home Gaming Laptop", category: "Laptops", price: 78490, description: "Blue Ryzen 7 7840HS + 6GB RTX3050 + 16GB/512GB Features", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQsWW1JtJBqdJlT7U6Q41KhlSZ_n-omxR57xeUXUzqfTj8tbvh9KEh34w64WNZcpMn9VtOZ_nwvR43P0BRBJZpCItOihyse-GFTA7GrK3KdQh-RgdMg0-cW4JU&usqp=CAE"},
  { id: 11, name: "Frames", category: "Accessories", price: 600, description: "Take the beauty of your home to the next level with the amazing range of photo frames", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRsR2BxbPzarq8u89CeQkqVHBNaz_lYB4tnw3GeTw_P5aGvt1nobCycIPycb4bsQ8meQz5iEynFauawrylw4Tr9WIEo-OrJfaAUz-1LJMgQ&usqp=CAE" },
  { id: 12, name: "Headphones", category: "Accessories", price: 1390, description: "boAt Rockerz 450 w/ 40mm Drivers, 15 HRS Playback, Soft Padded Earcups Bluetooth", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQAlwXd4ieri1KrigEmbWcvzEuWcq4dksSsbrpEPdcKVID7CEO4i0KetONit92-XcFPx2NktTxeEBgDBuIJDAsVq3ugqUZ_ff_PPi569OUirfluZ9IiR51X&usqp=CAE" },
  { id: 13, name: "Camera", category: "Electronics", price: 75000, description: "Nikon Z50 Mirrorless Camera With 16-50Mm Lens", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT-Kjes0OEWy3L6kKpoFi2pH6cGAKcKdMHpcBzRHfVEREVQW1nZDTQ4xD8EtUscdKw0CzORF3eQOmlECsH1Pc0toYaHPqg9_DBEjuK1FZKR&usqp=CAE" },
  { id: 14, name: "Speaker", category: "Electronics", price: 2500, description: "boAt Stone 1200 Bluetooth Speaker, with deep bass and long battery life.", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRW3IgyWnuVK4Faf581T9Q-7S_v0Thf2OJnnHHAx3yrr9o-eMJ1upjnVKFrvd-kOQQR2dRdjmKNGvu31zwY_E_-0o218LSkBZkaGQI3-BEiUxf6DN8NvKYAQrg&usqp=CAE" },
  { id: 15, name: "Pizza", category: "Food", price: 150, description: "Pepperoni. Lots of pepperoni, and lots of cheese!", image: "https://www.allrecipes.com/thmb/fFW1o307WSqFFYQ3-QXYVpnFj6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg" }, 
  { id: 16, name: "Fries", category: "Food", price: 200, description: "Perfect Thin and Crispy French Fries", image: "https://static.toiimg.com/thumb/54659021.cms?imgsize=275086&width=800&height=800" },
  { id: 17, name: "Laptop Stand", category: "Accessories", price: 4600, description: "Work in ergonomic comfort with this Curve SE Stand", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQH1BAiJ0dCK9e-cUEyQ6nxNIdJwW-2hkh7hsjwGIz-SR_zsKVSYLS_9XblOaWAzL4XnS-7nWCRIKMoWKodYk7DxgWYuqG3saGUZvg4kHz-o9rxKnJ_hn-srA&usqp=CAE" },
  { id: 18, name: "Realme", category: "Mobiles", price: 6199, description: "Redmi A3X (Olive Green, 64 GB) (4 GB RAM)", image: "https://m.media-amazon.com/images/I/61xsnG6TByL._SX679_.jpg"},
  { id: 19, name: "Bag", category: "Accessories", price: 1600, description: "Cloud 23L Black Laptop Backpack with raincover", image: "https://www.fgear.in/cdn/shop/files/1_9822ae18-0551-41fa-8cc1-1745a1359531.jpg?v=1717826522&width=990" },
  { id: 20, name: "Smart Watch", category: "Electronics", price: 1560, description: "Noise ColorFit Pro 4 Alpha Bluetooth Calling Smart watch", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSnH8AUowQOzDV-8Y91-0SbhDRJi3NUX7fAIi-lzWCzrgnVEAaGfFTMdFx6N8gpRZ02zDJmmShSZAmobD4WuQc9D7dbjvgiu9Ve8xVaAgDndIkz-M8RgWdl5A&usqp=CAE" },
  { id: 21, name: "Mouse", category: "Electronics", price: 400, description: "incredibly lightweight and wireless mouse is convenient to carry and well-suited for everyday use", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRtUjdHzIpoxTey2ZW9Oqcl5zaYMGhbLkYo3LZ0TvY07xM8ABYVlE3NvefHZbBBca4zhJSUolVcr_2cLMYjblRLVeqFHYR7dqhhPXLJzYqzhpdaZ1m21i-G&usqp=CAE" },
  { id: 22, name: "Wrist Watch", category: "Accessories", price: 5000, description: "Titan Brown Analogue Watch with a stylish design.", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT4y0lsXh_bb7FzvJy6KQI4_C-pbCC_Oj5mLYL0_wLsGaKgjIivdKG1aXHTBcFBgK_3XlgJq2A8dZLyzt0QotLTee3L8NyVzuRr3V8HCqE&usqp=CAE" },
  { id: 23, name: "Tshirt", category: "Clothing", price: 200, description: "High-quality cotton T-shirt in multiple sizes.", image: "https://veirdo.in/cdn/shop/files/b_0119493a-9927-4550-8323-baefe5f625c0.jpg?v=1724147309" },
  { id: 24, name: "Jeans", category: "Clothing", price: 900, description: "Stylish blue denim jeans for all occasions.", image: "https://offduty.in/cdn/shop/products/ff2def08-93ae-4984-89e8-8352dea110da_540x.jpg?v=1676893036" },
  { id: 25, name: "Shoes", category: "Accessories", price: 2600, description: "Lightweight and comfortable running shoes for all terrains.", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTimMYXpPfx9rVSDEY328MRp5WVKxQZ7GXFCdhLNpmFLzOD2btZLTCetsYoCArX4vWi7K4JOcd9VwjgWvDRdG3siXokSF3CYG7eKkGtQBsCJGxwcBCEenV&usqp=CAE" },
  { id: 26, name: "Burger", category: "Food", price: 250, description: "Cheesy Aloo Tikki Burger", image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/972a37599772cdc7df93a0855ad87591" },
  { id: 27, name: "KeyBoard", category: "Electronics", price: 2000, description: "mechanical keyboard with tactile switches for smooth typing.", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTDzJgtO94twLOuB0jqssCisT5B_yrtyYgXgFlF6h9dXqAPmhczumhPQ_tMCo2f2OhJ-IkM3kodpRaprCTr41KmQw2EGPe4&usqp=CAY" },
  
  // Additional products...
];

// Filter by category and display products
function filterCategory(category) {
  const filteredProducts = category === "All" ? allProducts : allProducts.filter(p => p.category === category);
  displayProducts(filteredProducts);
}

// Display product items
function displayProducts(productsToDisplay) {
  productList.innerHTML = "";
  productsToDisplay.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>INR:${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });
}

// Add product to cart
function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;  // If already in cart, increase quantity
  } else {
    cart.push({ ...product, quantity: 1 });  // Add new item to cart
  }

  updateCart();
}

// Update cart UI
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${item.name} - INR${item.price} x ${item.quantity}</p>
      <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
      <button class="plus" onclick="updateQuantity(${item.id}, 1)">+</button>
      <button class="minus" onclick="updateQuantity(${item.id}, -1)">-</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  totalPriceDisplay.textContent = `INR ${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));  // Store the updated cart in localStorage
  updateCartButton();
}

// Update quantity of a cart item
function updateQuantity(productId, change) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Toggle cart visibility and adjust main content margin
cartButton.addEventListener("click", () => {
  cartSection.classList.toggle("show");
  main.classList.toggle("cart-open");  // Apply the cart-open class for margin adjustment
  if (cartSection.classList.contains("show")) {
    document.body.classList.add("cart-open");  // Dim the background
  } else {
    document.body.classList.remove("cart-open");  // Remove dimming when cart is closed
  }
});

closeCartButton.addEventListener("click", () => {
  cartSection.classList.remove("show");
  main.classList.remove("cart-open");
  document.body.classList.remove("cart-open");
});

// Empty cart functionality
emptyCartButton.addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Update the cart button with the number of items in the cart
function updateCartButton() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartButton.textContent = `🛒 (${totalItems})`;  // Update cart icon text
}

// Initialize the page with all products and cart status
filterCategory("All");
updateCartButton();
