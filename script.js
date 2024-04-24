document.addEventListener("DOMContentLoaded", async () => {
    // Product data source
    const productUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448';
  
    // DOM elements
    const vendorNameElement = document.getElementById("vendor-name");
    const productTitleElement = document.getElementById("product-title");
    const productPriceElement = document.getElementById("product-price");
    const percentageOffElement = document.getElementById("percentage-off");
    const comparePriceElement = document.getElementById("compare-price");
    const photoListElement = document.getElementById("photo-list");
    const mainPhotoElement = document.getElementById("main-photo");
    const colorOptionsElement = document.getElementById("color-options");
    const sizeOptionsElement = document.getElementById("size-options");
    const counterValueElement = document.getElementById("counter-value");
    const cartAdElement = document.getElementById("cart-ad");
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const productDescriptionElement = document.getElementById("product-description");

    // Counter logic
    let count = 1;
    const incrementBtn = document.getElementById("increment-btn");
    const decrementBtn = document.getElementById("decrement-btn");
  
    incrementBtn.addEventListener("click", () => {
      count += 1;
      counterValueElement.textContent = count;
    });
  
    decrementBtn.addEventListener("click", () => {
      if (count > 1) {
        count -= 1;
        counterValueElement.textContent = count;
      }
    });
  
    // Fetch product data
    const fetchProductData = async () => {
      const response = await fetch(productUrl);
      const json = await response.json();
      const product = json.product;
  
      // Set product details
      vendorNameElement.textContent = product.vendor;
      productTitleElement.textContent = product.title;
      productPriceElement.textContent = product.price;
      comparePriceElement.textContent = `${product.compare_at_price}.00`;
  
      // Calculate percentage difference
      const priceNumeric = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      const compareAtPriceNumeric = parseFloat(product.compare_at_price.replace(/[^0-9.]/g, ''));
      const difference = compareAtPriceNumeric - priceNumeric;
      const percentageReduction = (difference / compareAtPriceNumeric) * 100;
  
      percentageOffElement.textContent = `${percentageReduction.toFixed(0)}% Off`;
  
      // Set product images
      mainPhotoElement.src = product.images[0].src;
  
      product.images.forEach((image, index) => {
        const listItem = document.createElement("li");
        const imgElement = document.createElement("img");
        imgElement.src = image.src;
        listItem.appendChild(imgElement);
        photoListElement.appendChild(listItem);
      });
  
      // Set color options
      product.options[0].values.forEach((value) => {
        const colorName = Object.keys(value)[0];
        const hexColor = value[colorName];
  
        const listItem = document.createElement("li");
        listItem.style.backgroundColor = hexColor;
        listItem.addEventListener("click", () => {
          selectedColor = colorName;
        });
  
        colorOptionsElement.appendChild(listItem);
      });
  
      // Set size options
      product.options[1].values.forEach((size) => {
        const listItem = document.createElement("li");
        const input = document.createElement("input");
        const label = document.createElement("label");
  
        input.type = "radio";
        input.id = `size-${size}`;
        input.name = "size";
        input.value = size;
  
        label.htmlFor = `size-${size}`;
        label.textContent = size;
  
        listItem.appendChild(input);
        listItem.appendChild(label);
  
        sizeOptionsElement.appendChild(listItem);
      });

      productDescriptionElement.innerHTML = product.description;;
    };
  
    fetchProductData();
  
    // Handle add to cart
    let selectedColor = null;
    let selectedSize = null;
  
    addToCartBtn.addEventListener("click", () => {
      const productTitle = productTitleElement.textContent;
      const colorText = selectedColor ? `with Color ${selectedColor}` : "";
      const sizeText = selectedSize ? `and Size ${selectedSize}` : "";
      const quantityText = `Quantity ${count}`;
  
      cartAdElement.style.display = "block";
      cartAdElement.textContent = `${productTitle} ${colorText} ${sizeText} ${quantityText} added to cart`;
    });
  });
  