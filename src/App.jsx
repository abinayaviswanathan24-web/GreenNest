import "./App.css"
import { useState, useEffect } from "react"

import heroImg from "./assets/image.png"

// =========================
// CATEGORY IMAGES
// =========================

import flowerCategory from "./assets/flowers/flower.webp"
import vegetableCategory from "./assets/vegetables/vegetables.jpg"
import fruitCategory from "./assets/fruits/fruit.jpg"
import herbCategory from "./assets/herbs/herbs.jpg"
import indoorCategory from "./assets/indoor/indoor.webp"
import cactusCategory from "./assets/cactus/cactus.avif"
import seedCategory from "./assets/seeds/seed.jpg"
import potCategory from "./assets/pots/pot.webp"

// =========================
// FLOWER IMAGES
// =========================

import asianSnowJasmine from "./assets/flowers/Asian snow jasmine.webp"
import belleOfIndiaJasmine from "./assets/flowers/belle of india jasmine.webp"
import blueButterfly from "./assets/flowers/bluebutterflypeaplant.png"
import buttonRose from "./assets/flowers/buttonrose.png"
import ixora from "./assets/flowers/ixora.png"
import jasmine from "./assets/flowers/Jasmine.jpg"
import kundaJasmine from "./assets/flowers/kundajasmine.png"
import madhumalti from "./assets/flowers/madhumalti.png"
import multiRose from "./assets/flowers/multi rose.avif"
import parijat from "./assets/flowers/parijat.png"
import purpleAllamanda from "./assets/flowers/purpleallamanda.png"
import rose from "./assets/flowers/rose.webp"
import tuberose from "./assets/flowers/tuberose.png"
import zinniaHybrid from "./assets/flowers/zinniahybrid.png"
import hibiscus from "./assets/flowers/hibiscus.png"

// =========================
// VEGETABLE IMAGES
// =========================

import capsicum from "./assets/vegetables/capsicum.png"
import carrot from "./assets/vegetables/carrot.webp"
import coriander from "./assets/vegetables/coriander.png"
import eggPlant from "./assets/vegetables/egg plant.png"
import lettuce from "./assets/vegetables/lettuce.webp"
import tomato from "./assets/vegetables/tomato.webp"

// =========================
// FRUIT IMAGES
// =========================

import blackJamun from "./assets/fruits/blackjamun.png"
import dragonFruit from "./assets/fruits/dragonfruit.png"
import guava from "./assets/fruits/guava.png"
import jackfruit from "./assets/fruits/jackfruit.png"
import papaya from "./assets/fruits/papaya.png"
import sapota from "./assets/fruits/sapota.png"
import sugarApple from "./assets/fruits/sugarapple.png"

// =========================
// HERB IMAGES
// =========================

import ashwagandha from "./assets/herbs/ashvagantha.png"
import garlicChives from "./assets/herbs/garlic chives.png"
import lemonBalm from "./assets/herbs/lemon balm.png"
import rosemary from "./assets/herbs/rosemary.png"
import thyme from "./assets/herbs/thymus vulgaris.png"
import tulsi from "./assets/herbs/tulsi.png"

// =========================
// INDOOR IMAGES
// =========================

import moneyPlant from "./assets/indoor/moneyplant.jpeg"
import snakePlant from "./assets/indoor/snakeplant.jpeg"
import luckyBamboo from "./assets/indoor/luckybamboo.png"
import pureAirMoneyPlant from "./assets/indoor/pureairmoneyplant.png"

// =========================
// CACTUS IMAGES
// =========================

import adenium from "./assets/cactus/adenium.png"
import cactusPlantImage from "./assets/cactus/cactus.jpeg"
import heartleafIceplant from "./assets/cactus/Heartleaficeplant.png"
import succulent from "./assets/cactus/succulent.png"
import succulentCombo from "./assets/cactus/succulentcombo.png"

// =========================
// POT IMAGES
// =========================

import comboPot from "./assets/pots/combo pot.webp"
import potCombo from "./assets/pots/pot combo.webp"
import poty from "./assets/pots/poty.webp"

// =========================
// GARDEN PRODUCT IMAGES
// =========================

import cocoHusk from "./assets/products/coco.png"
import cocopeat from "./assets/products/cocopit.png"
import combo from "./assets/products/combo.png"
import gardenTool from "./assets/products/gardentool.png"
import neemOilCombo from "./assets/products/neemoilcombo.png"
import organicManure from "./assets/products/organicmanure.png"
import perlite from "./assets/products/perlite.png"
import phosphate from "./assets/products/phosphate.png"
import pumiceStone from "./assets/products/pumicestone.png"
import pumper from "./assets/products/pumper.png"

// =========================
// SEED IMAGES
// =========================

import capsicumSeed from "./assets/seeds/capsicum.png"
import carrotSeed from "./assets/seeds/carrot.png"
import corianderSeed from "./assets/seeds/coriander.png"
import eggPlantSeed from "./assets/seeds/eggplant.png"
import lettuceSeed from "./assets/seeds/lettuce.png"
import broccoliSeed from "./assets/seeds/broccoli.png"
import cabbageSeed from "./assets/seeds/cabbage.png"
import chilliSeed from "./assets/seeds/chilli.png"

function App() {

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [cart, setCart] = useState([])
    const [apiProducts, setApiProducts] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState("")
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  

  // =========================
  // LOGIN STATES
  // =========================

  const [showLogin, setShowLogin] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [loginError, setLoginError] = useState("")

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("greennestLoggedIn") === "true"
  )

  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("greennestUser") || ""
  )
    // =========================
  // REST API
  // =========================

  useEffect(() => {
  fetch("http://localhost:8080/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch GreenNest products")
      }

      return response.json()
    })
    .then((data) => {
      setApiProducts(data)
      setApiLoading(false)
    })
    .catch((error) => {
      console.error("GreenNest API Error:", error)
      setApiError("Unable to load GreenNest products.")
      setApiLoading(false)
    })
}, [])
  // =========================
  // LOGIN FUNCTION
  // =========================

  const handleLogin = (e) => {

    e.preventDefault()

    setLoginError("")

    if (!loginEmail.trim() || !loginPassword.trim()) {

      setLoginError(
        "Please enter your email and password."
      )

      return
    }

    if (loginPassword.length < 6) {

      setLoginError(
        "Password must contain at least 6 characters."
      )

      return
    }

    // Frontend demo login
    localStorage.setItem(
      "greennestLoggedIn",
      "true"
    )

    localStorage.setItem(
      "greennestUser",
      loginEmail
    )

    setIsLoggedIn(true)
    setLoggedInUser(loginEmail)

    setLoginEmail("")
    setLoginPassword("")
    setLoginError("")

    setShowLogin(false)

  }


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem(
      "greennestLoggedIn"
    )

    localStorage.removeItem(
      "greennestUser"
    )

    setIsLoggedIn(false)
    setLoggedInUser("")

  }


  // =========================
  // OPEN CATEGORY
  // =========================

  const openCategory = (category) => {

    setSelectedCategory(category)

    setTimeout(() => {

      document
        .getElementById("category-products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })

    }, 100)

  }


  // =========================
  // PRODUCTS
  // =========================

  const flowerProducts = [

    {
      name: "Asian Snow Jasmine",
      image: asianSnowJasmine,
      price: 299,
      description: "Beautiful flowering plant"
    },

    {
      name: "Belle of India Jasmine",
      image: belleOfIndiaJasmine,
      price: 349,
      description: "Fragrant flowering plant"
    },

    {
      name: "Blue Butterfly Pea",
      image: blueButterfly,
      price: 249,
      description: "Beautiful blue flowering plant"
    },

    {
      name: "Button Rose",
      image: buttonRose,
      price: 299,
      description: "Colorful rose plant"
    },

    {
      name: "Ixora",
      image: ixora,
      price: 279,
      description: "Beautiful flowering plant"
    },

    {
      name: "Jasmine",
      image: jasmine,
      price: 299,
      description: "Fragrant white flower plant"
    },

    {
      name: "Kunda Jasmine",
      image: kundaJasmine,
      price: 329,
      description: "Beautiful jasmine variety"
    },

    {
      name: "Madhumalti",
      image: madhumalti,
      price: 349,
      description: "Colorful flowering climber"
    },

    {
      name: "Multi Colour Rose",
      image: multiRose,
      price: 349,
      description: "Beautiful rose plant"
    },

    {
      name: "Parijat",
      image: parijat,
      price: 299,
      description: "Traditional flowering plant"
    },

    {
      name: "Purple Allamanda",
      image: purpleAllamanda,
      price: 329,
      description: "Beautiful purple flowers"
    },

    {
      name: "Rose",
      image: rose,
      price: 299,
      description: "Classic flowering plant"
    },

    {
      name: "Tuberose",
      image: tuberose,
      price: 279,
      description: "Fragrant flowering plant"
    },

    {
      name: "Zinnia Hybrid",
      image: zinniaHybrid,
      price: 249,
      description: "Colorful hybrid flowering plant"
    }

  ]


  const vegetableProducts = [

    {
      name: "Capsicum",
      image: capsicum,
      price: 199,
      description: "Fresh capsicum plant"
    },

    {
      name: "Carrot",
      image: carrot,
      price: 179,
      description: "Fresh carrot plant"
    },

    {
      name: "Coriander",
      image: coriander,
      price: 149,
      description: "Fresh coriander plant"
    },

    {
      name: "Egg Plant",
      image: eggPlant,
      price: 199,
      description: "Healthy brinjal plant"
    },

    {
      name: "Lettuce",
      image: lettuce,
      price: 169,
      description: "Fresh leafy vegetable plant"
    },

    {
      name: "Tomato",
      image: tomato,
      price: 179,
      description: "Fresh tomato plant"
    }

  ]


  const fruitProducts = [

    {
      name: "Black Jamun Plant",
      image: blackJamun,
      price: 399,
      description: "Healthy Black Jamun plant"
    },

    {
      name: "Dragon Fruit Plant",
      image: dragonFruit,
      price: 449,
      description: "Easy to grow dragon fruit plant"
    },

    {
      name: "Guava Plant",
      image: guava,
      price: 349,
      description: "Fresh and healthy guava plant"
    },

    {
      name: "Jackfruit Plant",
      image: jackfruit,
      price: 399,
      description: "Healthy jackfruit plant"
    },

    {
      name: "Papaya Plant",
      image: papaya,
      price: 299,
      description: "Fast-growing papaya plant"
    },

    {
      name: "Sapota Plant",
      image: sapota,
      price: 399,
      description: "Healthy sapota plant"
    },

    {
      name: "Sugar Apple Plant",
      image: sugarApple,
      price: 399,
      description: "Beautiful sugar apple plant"
    }

  ]


  const herbProducts = [

    {
      name: "Ashwagandha Plant",
      image: ashwagandha,
      price: 249,
      description: "Healthy ashwagandha plant"
    },

    {
      name: "Garlic Chives Plant",
      image: garlicChives,
      price: 199,
      description: "Fresh garlic chives plant"
    },

    {
      name: "Lemon Balm Plant",
      image: lemonBalm,
      price: 199,
      description: "Aromatic lemon balm plant"
    },

    {
      name: "Rosemary Plant",
      image: rosemary,
      price: 249,
      description: "Fresh rosemary plant"
    },

    {
      name: "Thyme Plant",
      image: thyme,
      price: 199,
      description: "Easy-to-grow thyme plant"
    },

    {
      name: "Tulsi Plant",
      image: tulsi,
      price: 149,
      description: "Healthy Tulsi plant"
    }

  ]


  const decorProducts = [

    {
      name: "Lucky Bamboo Plant",
      image: luckyBamboo,
      price: 249,
      description: "Beautiful indoor plant"
    },

    {
      name: "Money Plant",
      image: moneyPlant,
      price: 199,
      description: "Easy-to-grow indoor plant"
    },

    {
      name: "Snake Plant",
      image: snakePlant,
      price: 299,
      description: "Low-maintenance indoor plant"
    },

    {
      name: "Pure Air Money Plant",
      image: pureAirMoneyPlant,
      price: 249,
      description: "Beautiful indoor greenery"
    }

  ]


  const cactusProducts = [

    {
      name: "Adenium Plant",
      image: adenium,
      price: 299,
      description: "Beautiful flowering desert plant"
    },

    {
      name: "Cactus Plant",
      image: cactusPlantImage,
      price: 249,
      description: "Easy-care cactus"
    },

    {
      name: "Heart Leaf Plant",
      image: heartleafIceplant,
      price: 299,
      description: "Beautiful decorative plant"
    },

    {
      name: "Succulent Plant",
      image: succulent,
      price: 249,
      description: "Small easy-care succulent"
    },

    {
      name: "Succulent Combo",
      image: succulentCombo,
      price: 399,
      description: "Beautiful succulent combination"
    }

  ]


  const gardenKitProducts = [

    {
      name: "Combo Pot",
      image: comboPot,
      price: 399,
      description: "Beautiful pot combo"
    },

    {
      name: "Pot Combo",
      image: potCombo,
      price: 449,
      description: "Stylish pots for home"
    },

    {
      name: "Decorative Pot",
      image: poty,
      price: 249,
      description: "Beautiful decorative pot"
    },

    {
      name: "Coco Husk",
      image: cocoHusk,
      price: 199,
      description: "Natural growing medium"
    },

    {
      name: "Cocopeat",
      image: cocopeat,
      price: 149,
      description: "Lightweight growing medium"
    },

    {
      name: "Garden Combo",
      image: combo,
      price: 499,
      description: "Useful garden care combination"
    },

    {
      name: "Garden Tool",
      image: gardenTool,
      price: 299,
      description: "Useful gardening tool"
    },

    {
      name: "Neem Oil Combo",
      image: neemOilCombo,
      price: 349,
      description: "Neem oil plant care combo"
    },

    {
      name: "Organic Manure",
      image: organicManure,
      price: 249,
      description: "Organic manure"
    },

    {
      name: "Perlite",
      image: perlite,
      price: 199,
      description: "Improves soil aeration"
    },

    {
      name: "Phosphate",
      image: phosphate,
      price: 199,
      description: "Plant nutrient"
    },

    {
      name: "Pumice Stone",
      image: pumiceStone,
      price: 199,
      description: "Useful for drainage"
    },

    {
      name: "Plant Water Pumper",
      image: pumper,
      price: 299,
      description: "Useful watering tool"
    }

  ]


  const seedProducts = [

    {
      name: "Capsicum Seeds",
      image: capsicumSeed,
      price: 79,
      description: "Fresh capsicum seeds"
    },

    {
      name: "Carrot Seeds",
      image: carrotSeed,
      price: 69,
      description: "Quality carrot seeds"
    },

    {
      name: "Coriander Seeds",
      image: corianderSeed,
      price: 49,
      description: "Fresh coriander seeds"
    },

    {
      name: "Egg Plant Seeds",
      image: eggPlantSeed,
      price: 69,
      description: "Healthy brinjal seeds"
    },

    {
      name: "Lettuce Seeds",
      image: lettuceSeed,
      price: 69,
      description: "Fresh lettuce seeds"
    },

    {
      name: "Broccoli Seeds",
      image: broccoliSeed,
      price: 79,
      description: "Quality broccoli seeds"
    },

    {
      name: "Cabbage Seeds",
      image: cabbageSeed,
      price: 69,
      description: "Fresh cabbage seeds"
    },

    {
      name: "Chilli Seeds",
      image: chilliSeed,
      price: 59,
      description: "Quality chilli seeds"
    }

  ]


  // =========================
  // ALL PRODUCTS
  // =========================

  const allProducts = [
    ...flowerProducts,
    ...vegetableProducts,
    ...fruitProducts,
    ...herbProducts,
    ...decorProducts,
    ...cactusProducts,
    ...gardenKitProducts,
    ...seedProducts
  ]

  const getApiProductImage = (imageName) => {
  const imageMap = {
    "rose.jpg": rose,
    "moneyplant.jpeg": moneyPlant,
    "snakeplant.jpeg": snakePlant,
     "hibiscus.jpg": hibiscus,
    "tomato.jpg": tomato,
    "cactus.jpeg": cactusPlantImage,
  }

  return imageMap[imageName] || ""
}

  // =========================
  // SEARCH
  // =========================

 const combinedProducts = [
  ...allProducts,
  ...apiProducts
]

const searchResults = searchText.trim()
  ? combinedProducts.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
  : []


  // =========================
  // CART
  // =========================

  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct = currentCart.find(
        (item) => item.name === product.name
      )

      if (existingProduct) {

        return currentCart.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )

      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ]

    })

  }


  const increaseQuantity = (name) => {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )

  }


  const decreaseQuantity = (name) => {

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )

  }


  const removeFromCart = (name) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.name !== name
      )
    )

  }


  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )


  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )


  // =========================
  // CHECKOUT
  // =========================

  const placeOrder = () => {

    setShowCheckout(false)
    setShowCart(false)
    setCart([])
    setOrderPlaced(true)

    setTimeout(() => {
      setOrderPlaced(false)
    }, 4000)

  }


  // =========================
  // PRODUCT CARD
  // =========================

  const ProductCard = ({ product }) => {

    return (

      <div className="category-product-card">

        <div className="category-product-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="category-product-info">

          <h3>
            {product.name}
          </h3>

          <p>
            {product.description}
          </p>

          <div className="category-product-price">
            ₹{product.price}
          </div>

          <button
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    )

  }


  // =========================
  // CATEGORY CONTENT
  // =========================

  const renderCategoryProducts = () => {

    let products = []
    let subtitle = ""
    let title = ""

    if (selectedCategory === "flowers") {
      products = flowerProducts
      subtitle = "FLOWER PLANTS"
      title = "Explore Our Flower Collection"
    }

    if (selectedCategory === "vegetables") {
      products = vegetableProducts
      subtitle = "VEGETABLE PLANTS"
      title = "Explore Our Vegetable Collection"
    }

    if (selectedCategory === "fruits") {
      products = fruitProducts
      subtitle = "FRUIT PLANTS"
      title = "Explore Our Fruit Collection"
    }

    if (selectedCategory === "herbs") {
      products = herbProducts
      subtitle = "HERBS"
      title = "Choose Your Herb Plant"
    }

    if (selectedCategory === "decor") {
      products = decorProducts
      subtitle = "DECOR PLANTS"
      title = "Choose Your Indoor Plant"
    }

    if (selectedCategory === "cactus") {
      products = cactusProducts
      subtitle = "CACTUS & SUCCULENTS"
      title = "Explore Our Cactus Collection"
    }

    if (selectedCategory === "seeds") {
      products = seedProducts
      subtitle = "GREENNEST SEEDS"
      title = "Grow Your Garden From Seeds"
    }

    if (selectedCategory === "gardenkit") {
      products = gardenKitProducts
      subtitle = "GARDEN KIT"
      title = "Pots & Gardening Essentials"
    }

    if (!products.length) {
      return null
    }

    return (

      <>

        <div className="section-title">

          <p>
            {subtitle}
          </p>

          <h2>
            {title}
          </h2>

        </div>

        <div className="category-products-container">

          {products.map((product, index) => (

            <ProductCard
              product={product}
              key={index}
            />

          ))}

        </div>

      </>

    )

  }


  return (

    <div className="app">


      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => {
            setSelectedCategory(null)
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          }}
        >
          🌱 GreenNest
        </div>


        <div className="nav-links">

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setSelectedCategory(null)
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }}
          >
            Home
          </a>

          <a
            href="#categories"
            onClick={() => setSelectedCategory(null)}
          >
            Plants
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              openCategory("seeds")
            }}
          >
            Seeds
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              openCategory("gardenkit")
            }}
          >
            Garden Kit
          </a>

          <a href="#offers">
            Offers
          </a>

        </div>


        {/* SEARCH */}

        <div className="nav-search">

          <input
            type="text"
            placeholder="Search plants, seeds, pots..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />

          <button>
            🔍
          </button>

        </div>


        {/* =========================
            NAV ICONS
        ========================= */}

        <div className="nav-icons">

          <button
            className="cart-icon"
            onClick={() => setShowCart(true)}
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}

          </button>


          {/* LOGIN / USER */}

          <button
            className="user-icon-button"
            onClick={() => {

              if (isLoggedIn) {
                handleLogout()
              } else {
                setShowLogin(true)
              }

            }}
            title={
              isLoggedIn
                ? "Click to logout"
                : "Login"
            }
          >

            {isLoggedIn ? "👋" : "👤"}

          </button>

        </div>

      </nav>


      {/* =========================
          LOGGED IN USER BAR
      ========================= */}

      {isLoggedIn && (

        <div className="login-status-bar">

          <span>
            Welcome back, <strong>{loggedInUser}</strong> 🌱
          </span>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      )}


      {/* =========================
          SEARCH RESULTS
      ========================= */}

      {searchText.trim() && (

        <section className="search-results-section">

          <div className="search-results-header">

            <h2>
              Search Results
            </h2>

            <button
              onClick={() => setSearchText("")}
            >
              ✕
            </button>

          </div>

          {searchResults.length > 0 ? (

            <div className="search-results-grid">

              {searchResults.map((product, index) => (

                <ProductCard
                  product={product}
                  key={index}
                />

              ))}

            </div>

          ) : (

            <div className="no-results">

              <span>🌱</span>

              <h3>
                No products found
              </h3>

              <p>
                Try searching for plants, seeds or garden products.
              </p>

            </div>

          )}

        </section>

      )}


      {/* =========================
          HERO
      ========================= */}

      <section className="hero-section">

        <img
          src={heroImg}
          alt="GreenNest plants"
          className="hero-image"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO GREENNEST
          </p>

          <h1>
            <span>Bring Nature</span>
            <br />
            <span>Into Your Home </span>
          </h1>

          <p className="hero-text">
            Discover beautiful plants, seeds, pots and
            gardening essentials for your home and garden.
          </p>

          <button
            className="shop-button"
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Shop Now
          </button>

        </div>

      </section>


      {/* =========================
          BENEFITS
      ========================= */}

      <section className="benefits-section">

        <div className="benefit-box">

          <span>🚚</span>

          <div>
            <h3>
              Free Delivery
            </h3>

            <p>
              On orders above ₹500
            </p>
          </div>

        </div>


        <div className="benefit-box">

          <span>🎁</span>

          <div>
            <h3>
              Free Gifts
            </h3>

            <p>
              Special gifts with selected plants
            </p>
          </div>

        </div>


        <div className="benefit-box">

          <span>🌱</span>

          <div>
            <h3>
              Healthy Plants
            </h3>

            <p>
              Carefully selected plants
            </p>
          </div>

        </div>


        <div className="benefit-box">

          <span>🇮🇳</span>

          <div>
            <h3>
              All India Delivery
            </h3>

            <p>
              We deliver across India
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          CATEGORIES
      ========================= */}

      <section
        className="categories-section"
        id="categories"
      >

        <div className="section-title">

          <p>
            EXPLORE OUR COLLECTION
          </p>

          <h2>
            Shop By Category
          </h2>

        </div>


        <div className="categories-container">


          <div
            className="category-card"
            onClick={() => openCategory("flowers")}
          >

            <div className="category-icon">

              <img
                src={flowerCategory}
                alt="Flower Plants"
              />

            </div>

            <h3>
              Flower Plants
            </h3>

            <p>
              Beautiful flowering plants
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("flowers")
              }}
            >
              Explore
            </button>

          </div>


          <div
            className="category-card"
            onClick={() => openCategory("vegetables")}
          >

            <div className="category-icon">

              <img
                src={vegetableCategory}
                alt="Vegetable Plants"
              />

            </div>

            <h3>
              Vegetable Plants
            </h3>

            <p>
              Grow fresh vegetables
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("vegetables")
              }}
            >
              Explore
            </button>

          </div>


          <div
            className="category-card"
            onClick={() => openCategory("fruits")}
          >

            <div className="category-icon">

              <img
                src={fruitCategory}
                alt="Fruit Plants"
              />

            </div>

            <h3>
              Fruit Plants
            </h3>

            <p>
              Grow fresh fruits at home
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("fruits")
              }}
            >
              Explore
            </button>

          </div>


          <div
            className="category-card"
            onClick={() => openCategory("herbs")}
          >

            <div className="category-icon">

              <img
                src={herbCategory}
                alt="Herbs"
              />

            </div>

            <h3>
              Herbs
            </h3>

            <p>
              Fresh herbs for your home
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("herbs")
              }}
            >
              Explore
            </button>

          </div>


          <div
            className="category-card"
            onClick={() => openCategory("decor")}
          >

            <div className="category-icon">

              <img
                src={indoorCategory}
                alt="Decor Plants"
              />

            </div>

            <h3>
              Decor Plants
            </h3>

            <p>
              Greenery for your interiors
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("decor")
              }}
            >
              Explore
            </button>

          </div>


          <div
            className="category-card"
            onClick={() => openCategory("seeds")}
          >

            <div className="category-icon">

              <img
                src={seedCategory}
                alt="Seeds"
              />

            </div>

            <h3>
              Seeds
            </h3>

            <p>
              Start growing from seeds
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("seeds")
              }}
            >
              Explore
            </button>

          </div>


          <div
            className="category-card"
            onClick={() => openCategory("cactus")}
          >

            <div className="category-icon">

              <img
                src={cactusCategory}
                alt="Cactus"
              />

            </div>

            <h3>
              Cactus
            </h3>

            <p>
              Easy-care plants
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("cactus")
              }}
            >
              Explore
            </button>

          </div>


          <div
            className="category-card"
            onClick={() => openCategory("gardenkit")}
          >

            <div className="category-icon">

              <img
                src={potCategory}
                alt="Garden Kit"
              />

            </div>

            <h3>
              Garden Kit
            </h3>

            <p>
              Pots and gardening essentials
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                openCategory("gardenkit")
              }}
            >
              Explore
            </button>

          </div>

        </div>

      </section>


      {/* =========================
          CATEGORY PRODUCTS
      ========================= */}

      {selectedCategory && (

        <section
          className="category-products-section"
          id="category-products"
        >

          {renderCategoryProducts()}

        </section>

      )}

{/* =========================
    REST API PRODUCTS
========================= */}

<section className="products-section">

  <div className="section-title">
  <p>GREENNEST COLLECTION</p>
  <h2>New Arrivals </h2>
</div>

  {apiLoading && (
    <p style={{ textAlign: "center" }}>
      Loading products...
    </p>
  )}

  {apiError && (
    <p style={{ textAlign: "center", color: "red" }}>
      {apiError}
    </p>
  )}

  {!apiLoading && !apiError && (
    <div className="products-container">
      {apiProducts.slice(0, 8).map((product, index) => (
        <div className="product-card" key={index}>

          <div className="product-image">
            <img
  src={getApiProductImage(product.image)}
  alt={product.name}
/>
          </div>

          <div className="product-info">

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <div className="product-price">
              <span>₹{product.price}</span>
            </div>

            <button
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

          </div>

        </div>
      ))}
    </div>
  )}

</section>

      {/* =========================
          TRENDING PLANTS
      ========================= */}

      <section className="products-section">

        <div className="section-title">

          <p>
            OUR PLANT COLLECTION
          </p>

          <h2>
            Trending Plants
          </h2>

        </div>


        <div className="products-container">


          <div className="product-card">

            <div className="product-image">

              <img
                src={moneyPlant}
                alt="Money Plant"
              />

            </div>

            <div className="product-info">

              <h3>
                Money Plant
              </h3>

              <p>
                Indoor Plant
              </p>

              <div className="product-price">

                <span>
                  ₹299
                </span>

                <del>
                  ₹399
                </del>

              </div>

              <button
                onClick={() =>
                  addToCart({
                    name: "Money Plant",
                    image: moneyPlant,
                    price: 299,
                    description: "Indoor Plant"
                  })
                }
              >
                Add to Cart
              </button>

            </div>

          </div>


          <div className="product-card">

            <div className="product-image">

              <img
                src={snakePlant}
                alt="Snake Plant"
              />

            </div>

            <div className="product-info">

              <h3>
                Snake Plant
              </h3>

              <p>
                Air Purifying Plant
              </p>

              <div className="product-price">

                <span>
                  ₹499
                </span>

                <del>
                  ₹599
                </del>

              </div>

              <button
                onClick={() =>
                  addToCart({
                    name: "Snake Plant",
                    image: snakePlant,
                    price: 499,
                    description: "Air Purifying Plant"
                  })
                }
              >
                Add to Cart
              </button>

            </div>

          </div>


          <div className="product-card">

            <div className="product-image">

              <img
                src={multiRose}
                alt="Multi Colour Rose"
              />

            </div>

            <div className="product-info">

              <h3>
                Multi Colour Rose
              </h3>

              <p>
                Flowering Plant
              </p>

              <div className="product-price">

                <span>
                  ₹349
                </span>

                <del>
                  ₹449
                </del>

              </div>

              <button
                onClick={() =>
                  addToCart({
                    name: "Multi Colour Rose",
                    image: multiRose,
                    price: 349,
                    description: "Flowering Plant"
                  })
                }
              >
                Add to Cart
              </button>

            </div>

          </div>


          <div className="product-card">

            <div className="product-image">

              <img
                src={cactusPlantImage}
                alt="Cactus Plant"
              />

            </div>

            <div className="product-info">

              <h3>
                Cactus Plant
              </h3>

              <p>
                Easy Care Plant
              </p>

              <div className="product-price">

                <span>
                  ₹249
                </span>

                <del>
                  ₹299
                </del>

              </div>

              <button
                onClick={() =>
                  addToCart({
                    name: "Cactus Plant",
                    image: cactusPlantImage,
                    price: 249,
                    description: "Easy Care Plant"
                  })
                }
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          OFFERS
      ========================= */}

      <section
        className="offers-section"
        id="offers"
      >

        <div className="offers-heading">

          <span>
            ✨ SPECIAL OFFERS
          </span>

          <h2>
            Grow More, Save More 🌱
          </h2>

          <p>
            Give your garden a little more love with our special
            GreenNest offers.
          </p>

        </div>


        <div className="offers-container">


          <div className="offer-card offer-green">

            <div className="offer-icon">
              🌿
            </div>

            <div className="offer-content">

              <span className="offer-tag">
                PLANT OFFER
              </span>

              <h3>
                Buy Any Plant
              </h3>

              <strong>
                Get a Free Gift 🎁
              </strong>

              <p>
                Selected plants come with a special
                gardening gift.
              </p>

              <button
                onClick={() => openCategory("flowers")}
              >
                Shop Plants →
              </button>

            </div>

          </div>


          <div className="offer-card offer-orange">

            <div className="offer-icon">
              🛍️
            </div>

            <div className="offer-content">

              <span className="offer-tag">
                DELIVERY OFFER
              </span>

              <h3>
                Orders Above ₹500
              </h3>

              <strong>
                FREE DELIVERY 🚚
              </strong>

              <p>
                Enjoy free delivery on qualifying
                orders across India.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({
                      behavior: "smooth"
                    })
                }
              >
                Start Shopping →
              </button>

            </div>

          </div>


          <div className="offer-card offer-purple">

            <div className="offer-icon">
              🌱
            </div>

            <div className="offer-content">

              <span className="offer-tag">
                GARDEN CARE
              </span>

              <h3>
                Garden Essentials
              </h3>

              <strong>
                Special Prices
              </strong>

              <p>
                Pots, soil helpers, manure and
                gardening essentials.
              </p>

              <button
                onClick={() =>
                  openCategory("gardenkit")
                }
              >
                Explore Kit →
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FREE DELIVERY BANNER
      ========================= */}

      <section className="delivery-banner">

        <div>

          <span>
            🚚
          </span>

          <div>

            <h2>
              Free Delivery on Orders Above ₹500
            </h2>

            <p>
              Shop your favourite plants and gardening
              essentials from GreenNest.
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            document
              .getElementById("categories")
              ?.scrollIntoView({
                behavior: "smooth"
              })
          }
        >
          Shop Now
        </button>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <div className="footer-column">

          <h2>
            🌱 GreenNest
          </h2>

          <p>
            Bring nature into your home with beautiful
            plants and gardening essentials.
          </p>

        </div>


        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <a href="#">
            Home
          </a>

          <a href="#categories">
            Plants
          </a>

          <a href="#offers">
            Offers
          </a>

          <a href="#categories">
            Garden Kit
          </a>

        </div>


        <div className="footer-column">

          <h3>
            Categories
          </h3>

          <button onClick={() => openCategory("flowers")}>
            Flower Plants
          </button>

          <button onClick={() => openCategory("vegetables")}>
            Vegetable Plants
          </button>

          <button onClick={() => openCategory("fruits")}>
            Fruit Plants
          </button>

          <button onClick={() => openCategory("seeds")}>
            Seeds
          </button>

        </div>


        <div className="footer-column">

          <h3>
            Contact
          </h3>

          <p>
            📍 Chennai, Tamil Nadu
          </p>

          <p>
            📧 greennest@example.com
          </p>

          <p>
            🚚 Delivery Across India
          </p>

        </div>

      </footer>


      <div className="footer-bottom">

        © 2026 GreenNest. All Rights Reserved.

      </div>


      {/* =========================
          CART OVERLAY
      ========================= */}

      {showCart && (

        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >

          <div
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-header">

              <h2>
                Your Cart 🛒
              </h2>

              <button
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>

            </div>


            {cart.length === 0 ? (

              <div className="empty-cart">

                <div>
                  🛒
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some beautiful plants to your cart.
                </p>

                <button
                  onClick={() => {
                    setShowCart(false)

                    document
                      .getElementById("categories")
                      ?.scrollIntoView({
                        behavior: "smooth"
                      })

                  }}
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={item.name}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₹{item.price}
                        </p>

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.name)
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.name)
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                      <button
                        className="remove-cart"
                        onClick={() =>
                          removeFromCart(item.name)
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  ))}

                </div>


                <div className="cart-summary">

                  <div className="summary-row">

                    <span>
                      Subtotal
                    </span>

                    <strong>
                      ₹{cartTotal}
                    </strong>

                  </div>

                  <div className="summary-row">

                    <span>
                      Delivery
                    </span>

                    <strong>
                      {cartTotal >= 500
                        ? "FREE"
                        : "₹49"}
                    </strong>

                  </div>

                  <div className="summary-row total-row">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{
                        cartTotal >= 500
                          ? cartTotal
                          : cartTotal + 49
                      }
                    </strong>

                  </div>


                  <button
                    className="checkout-button"
                    onClick={() =>
                      setShowCheckout(true)
                    }
                  >
                    Proceed to Checkout
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}


      {/* =========================
          CHECKOUT
      ========================= */}

      {showCheckout && (

        <div className="checkout-overlay">

          <div className="checkout-modal">

            <div className="checkout-header">

              <h2>
                Checkout 🌱
              </h2>

              <button
                onClick={() =>
                  setShowCheckout(false)
                }
              >
                ✕
              </button>

            </div>


            <div className="checkout-body">

              <h3>
                Delivery Details
              </h3>

              <input
                type="text"
                placeholder="Full Name"
              />

              <input
                type="text"
                placeholder="Mobile Number"
              />

              <textarea
                placeholder="Delivery Address"
                rows="3"
              ></textarea>

              <input
                type="text"
                placeholder="City"
              />

              <input
                type="text"
                placeholder="Pincode"
              />


              <h3 className="payment-title">
                Payment Method
              </h3>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />

                <span>
                  Cash on Delivery
                </span>

              </label>


              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                />

                <span>
                  UPI / Online Payment
                </span>

              </label>


              <div className="checkout-total">

                <span>
                  Order Total
                </span>

                <strong>
                  ₹{
                    cartTotal >= 500
                      ? cartTotal
                      : cartTotal + 49
                  }
                </strong>

              </div>


              <button
                className="place-order-button"
                onClick={placeOrder}
              >
                Place Order 🎉
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =========================
          LOGIN MODAL
      ========================= */}

      {showLogin && (

        <div
          className="login-overlay"
          onClick={() => setShowLogin(false)}
        >

          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="login-close"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>


            <div className="login-logo">
              🌱
            </div>

            <h2>
              Welcome to GreenNest
            </h2>

            <p className="login-subtitle">
              Login to continue shopping
            </p>


            <form onSubmit={handleLogin}>

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
              />


              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
              />


              {loginError && (

                <p className="login-error">
                  {loginError}
                </p>

              )}


              <button
                type="submit"
                className="login-submit"
              >
                Login
              </button>

            </form>


            <p className="login-note">
              New to GreenNest? Enter your email and
              create a password of 6+ characters to continue.
            </p>

          </div>

        </div>

      )}


      {/* =========================
          ORDER SUCCESS
      ========================= */}

      {orderPlaced && (

        <div className="order-success">

          <div className="success-icon">
            ✓
          </div>

          <div>

            <h3>
              Order Placed Successfully!
            </h3>

            <p>
              Thank you for shopping with GreenNest 🌱
            </p>

          </div>

        </div>

      )}

    </div>

  )

}

export default App