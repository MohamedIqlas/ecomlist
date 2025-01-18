document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    const loader = document.getElementById("loader");
    const toast = document.getElementById("toast");
    const scrollToTopBtn = document.getElementById("scroll-to-top");
  
    let products = [];
  
    // Load Products from JSON
    async function loadProducts() {
      loader.style.display = "block";
      try {
        const response = await fetch("products.json");
        products = await response.json();
        loader.style.display = "none";
        renderProducts(products);
      } catch (error) {
        loader.style.display = "none";
        console.error("Failed to load products:", error);
      }
    }
  
    // Render Products
    function renderProducts(items) {
      productGrid.innerHTML = "";
      items.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button>Add to Cart</button>
        `;
        productCard.querySelector("button").addEventListener("click", () => addToCart(product));
        productGrid.appendChild(productCard);
      });
    }
  
    function addToCart(product) {
      toast.textContent = `${product.name} added to cart!`;
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 2000);
    }
  
    // Filter and Sort Logic
    document.getElementById("category-filter").addEventListener("change", (e) => {
      const category = e.target.value;
      const filteredProducts = category ? products.filter((p) => p.category === category) : products;
      renderProducts(filteredProducts);
    });
  
    document.getElementById("price-sort").addEventListener("change", (e) => {
      const sortBy = e.target.value;
      const sortedProducts = [...products].sort((a, b) => {
        return sortBy === "low-to-high" ? a.price - b.price : b.price - a.price;
      });
      renderProducts(sortedProducts);
    });
  
    // Scroll-to-Top Button
    window.addEventListener("scroll", () => {
      scrollToTopBtn.style.display = window.scrollY > 200 ? "flex" : "none";
    });
  
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    loadProducts();
  }); 