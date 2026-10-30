import './style.css'

type DrinkSize = {
  size: string
  price: number
}

type Drink = {
  id: number
  name: string
  image: string
  price?: number
  sizes?: DrinkSize[]
}

type CartItem = {
  id: number
  size: string
  price: number
  quantity: number
}

const app = document.querySelector<HTMLDivElement>('#app')

const drinks: Drink[] = [
  {
    id: 1,
    name: 'Fanta Blackcurrant',
    image: '/images/fanta-blackcurrant.jpg',
    sizes: [
      { size: '300ml', price: 60 },
      { size: '500ml', price: 80 },
      { size: '1L', price: 120 },
      { size: '2L', price: 200 }
    ]
  },
  {
    id: 2,
    name: 'Chocolate Smoothie',
    price: 200,
    image: '/images/chocolate-smoothie.jpg'
  },
  {
    id: 3,
    name: 'Minute Maid Apple',
    image: '/images/minute-maid-apple.jpg',
    sizes: [
      { size: '300ml', price: 80 },
      { size: '500ml', price: 120 },
      { size: '1L', price: 200 }
    ]
  },
  {
    id: 4,
    name: 'Minute Maid Tropical',
    image: '/images/minute-maid-tropical.jpg',
    sizes: [
      { size: '300ml', price: 80 },
      { size: '500ml', price: 120 },
      { size: '1L', price: 200 }
    ]
  },
  {
    id: 5,
    name: 'Minute Maid Mango',
    image: '/images/minute-maid-mango.jpg',
    sizes: [
      { size: '300ml', price: 80 },
      { size: '500ml', price: 120 },
      { size: '1L', price: 200 }
    ]
  },
  {
    id: 6,
    name: 'Strawberry-Banana Smoothie',
    price: 250,
    image: '/images/strawberry-banana-smoothie.jpg'
  },
  {
    id: 7,
    name: 'Sprite',
    image: '/images/sprite.jpg',
    sizes: [
      { size: '300ml', price: 60 },
      { size: '500ml', price: 80 },
      { size: '1L', price: 120 },
      { size: '2L', price: 200 }
    ]
  }
]

const cart: CartItem[] = []

if (app) {
  app.innerHTML = `
    <header>
      <h1>🥤 Fresh Drinks Store</h1>
      <p>Freshness in every sip!</p>
    </header>

    <nav>
      <a href="#home">Home</a>
      <a href="#products">Our Drinks</a>
      <a href="#customer-details">Customer Details</a>
      <a href="#cart">Shopping Cart 🛒</a>
      <a href="#contact">Contact</a>
    </nav>

    <main id="home">
      <h2>Welcome to Fresh Drinks Store</h2>
      <p>Enjoy our refreshing juices and delicious smoothies.</p>
      <a class="shop-link" href="#products">Shop Now</a>
    </main>

    <section id="products">
      <h2>Our Drinks</h2>
      <div class="products">
        ${drinks.map(drink => `
          <article class="product">
            <img
              src="${drink.image}"
              alt="${drink.name}"
              onerror="this.style.display='none'"
            >
            <h3>${drink.name}</h3>
            ${
              drink.sizes
                ? `
                  <label for="size-${drink.id}">Choose size:</label>
                  <select id="size-${drink.id}" class="size-select">
                    ${drink.sizes.map((option, index) => `
                      <option value="${index}">
                        ${option.size} - KSh ${option.price}
                      </option>
                    `).join('')}
                  </select>
                `
                : `<p class="price">KSh ${drink.price}</p>`
            }
            <button class="add-to-cart" data-id="${drink.id}">
              Add to Cart
            </button>
          </article>
        `).join('')}
      </div>
    </section>

    <section id="customer-details">
      <h2>Customer Details</h2>
      <p>Enter your details to place your drinks order.</p>

      <form id="order-form">
        <label for="customer-full-name">Full Name:</label>
        <input
          id="customer-full-name"
          type="text"
          placeholder="Enter your full name"
          required
        >

        <label for="customer-phone">Phone Number:</label>
        <input
          id="customer-phone"
          type="tel"
          placeholder="e.g. 0712345678"
          required
        >

        <label for="delivery-address">Delivery Address:</label>
        <textarea
          id="delivery-address"
          placeholder="Enter your delivery address"
          required
        ></textarea>

        <button type="submit">Place Order on WhatsApp</button>
      </form>

      <p id="order-form-message"></p>
    </section>

    <section id="cart">
      <h2>Your Shopping Cart 🛒</h2>
      <div id="cart-items">Your cart is empty.</div>
      <h3 id="cart-total">Total: KSh 0</h3>
      <button id="checkout">Generate Receipt</button>
      <p id="order-message"></p>
    </section>

    <section id="contact">
      <h2>Contact Us</h2>
      <form id="contact-form">
        <input
          id="customer-name"
          type="text"
          placeholder="Your name"
          required
        >
        <input
          id="customer-email"
          type="email"
          placeholder="Your email"
          required
        >
        <textarea
          id="customer-message"
          placeholder="Your message"
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <p id="contact-result"></p>
    </section>

    <footer>
      <p>&copy; 2026 Fresh Drinks Store</p>
    </footer>
  `

  function getTotal(): number {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }

  function updateCart(): void {
    const cartItems =
      document.querySelector<HTMLDivElement>('#cart-items')!

    const totalElement =
      document.querySelector<HTMLHeadingElement>('#cart-total')!

    if (cart.length === 0) {
      cartItems.textContent = 'Your cart is empty.'
    } else {
      cartItems.innerHTML = cart.map((item, index) => {
        const drink = drinks.find(d => d.id === item.id)!

        const sizeText =
          item.size === 'Regular' ? '' : ` (${item.size})`

        return `
          <div class="cart-item">
            <span>${drink.name}${sizeText} × ${item.quantity}</span>
            <span>KSh ${item.price * item.quantity}</span>
            <button class="remove-item" data-index="${index}">
              Remove
            </button>
          </div>
        `
      }).join('')
    }

    totalElement.textContent = `Total: KSh ${getTotal()}`
  }

  document.querySelectorAll<HTMLButtonElement>('.add-to-cart')
    .forEach(button => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.id)
        const drink = drinks.find(d => d.id === id)

        if (!drink) return

        let selectedSize = 'Regular'
        let selectedPrice = drink.price

        if (drink.sizes) {
          const selector =
            document.querySelector<HTMLSelectElement>(`#size-${id}`)

          if (!selector) return

          const selectedOption =
            drink.sizes[Number(selector.value)]

          if (!selectedOption) return

          selectedSize = selectedOption.size
          selectedPrice = selectedOption.price
        }

        if (selectedPrice === undefined) return

        const existing = cart.find(item =>
          item.id === id && item.size === selectedSize
        )

        if (existing) {
          existing.quantity++
        } else {
          cart.push({
            id,
            size: selectedSize,
            price: selectedPrice,
            quantity: 1
          })
        }

        document.querySelector<HTMLParagraphElement>(
          '#order-message'
        )!.textContent = ''

        updateCart()
      })
    })

  document.querySelector<HTMLDivElement>('#cart-items')!
    .addEventListener('click', event => {
      const target = event.target as HTMLElement

      if (target.matches('.remove-item')) {
        const index = Number(target.dataset.index)

        if (index >= 0 && index < cart.length) {
          cart.splice(index, 1)
        }

        updateCart()
      }
    })

  document.querySelector<HTMLButtonElement>('#checkout')!
    .addEventListener('click', () => {
      const message =
        document.querySelector<HTMLParagraphElement>(
          '#order-message'
        )!

      if (cart.length === 0) {
        message.textContent =
          'Please add a drink to your cart first.'
        return
      }

      const customerName =
        document.querySelector<HTMLInputElement>(
          '#customer-full-name'
        )!.value.trim()

      const customerPhone =
        document.querySelector<HTMLInputElement>(
          '#customer-phone'
        )!.value.trim()

      const deliveryAddress =
        document.querySelector<HTMLTextAreaElement>(
          '#delivery-address'
        )!.value.trim()

      if (!customerName || !customerPhone || !deliveryAddress) {
        message.textContent =
          'Please enter customer details before generating the receipt.'
        document.querySelector('#customer-details')!
          .scrollIntoView({ behavior: 'smooth' })
        return
      }

      const total = getTotal()
      const receiptWindow = window.open('', '_blank')

      if (!receiptWindow) {
        message.textContent =
          'Allow pop-ups in your browser to open your receipt.'
        return
      }

      const escapeHTML = (value: string) =>
        value.replace(/[&<>"']/g, character => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        })[character]!)

      const receiptItems = cart.map(item => {
        const drink = drinks.find(d => d.id === item.id)!

        return `
          <tr>
            <td>${escapeHTML(drink.name)}</td>
            <td>${escapeHTML(item.size)}</td>
            <td>${item.quantity}</td>
            <td>KSh ${item.price}</td>
            <td>KSh ${item.price * item.quantity}</td>
          </tr>
        `
      }).join('')

      receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Fresh Drinks Store Receipt</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 25px;
              line-height: 1.5;
              color: #222;
            }
            h1, .thanks { text-align: center; }
            .customer-details {
              margin-top: 25px;
              padding: 15px;
              background: #f2f2f2;
              overflow-wrap: anywhere;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 25px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            .total {
              text-align: right;
              font-size: 20px;
              font-weight: bold;
            }
            button {
              display: block;
              margin: 25px auto;
              padding: 12px 20px;
              cursor: pointer;
            }
            @media print {
              button { display: none; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <h1>Fresh Drinks Store</h1>
          <p class="thanks">Thank you for shopping with us!</p>
          <p>Receipt date: ${new Date().toLocaleString()}</p>

          <div class="customer-details">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${escapeHTML(customerName)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(customerPhone)}</p>
            <p><strong>Delivery Address:</strong> ${escapeHTML(deliveryAddress)}</p>
          </div>

          <h3>Order Details</h3>
          <table>
            <tr>
              <th>Drink</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
            ${receiptItems}
          </table>

          <p class="total">Total: KSh ${total}</p>
          <button onclick="window.print()">Print Receipt</button>
        </body>
        </html>
      `)

      receiptWindow.document.close()
      message.textContent =
        'Your receipt has been generated successfully!'
    })

  document.querySelector<HTMLFormElement>('#order-form')!
    .addEventListener('submit', async event => {
      event.preventDefault()

      const formMessage =
        document.querySelector<HTMLParagraphElement>(
          '#order-form-message'
        )!

      if (cart.length === 0) {
        formMessage.textContent =
          'Please add drinks to your cart before placing an order.'
        return
      }

      const customerName =
        document.querySelector<HTMLInputElement>(
          '#customer-full-name'
        )!.value.trim()

      const customerPhone =
        document.querySelector<HTMLInputElement>(
          '#customer-phone'
        )!.value.trim()

      const deliveryAddress =
        document.querySelector<HTMLTextAreaElement>(
          '#delivery-address'
        )!.value.trim()

      if (!customerName || !customerPhone || !deliveryAddress) {
        formMessage.textContent =
          'Please complete all customer details.'
        return
      }

      const total = getTotal()

      const databaseOrder = {
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        items: cart.map(item => {
          const drink = drinks.find(d => d.id === item.id)!

          return {
            drink_id: item.id,
            drink_name: drink.name,
            size: item.size,
            quantity: item.quantity,
            unit_price: item.price,
            subtotal: item.price * item.quantity
          }
        }),
        total_amount: total
      }

      const orderItems = cart.map(item => {
        const drink = drinks.find(d => d.id === item.id)!

        return `${drink.name} (${item.size}) x ${item.quantity} - KSh ${item.price * item.quantity}`
      }).join('\n')

      const whatsappMessage = `
NEW FRESH DRINKS ORDER

Customer: ${customerName}
Customer Phone: ${customerPhone}
Delivery Address: ${deliveryAddress}

ORDER DETAILS:
${orderItems}

TOTAL: KSh ${total}

Please confirm this order.
      `.trim()

      const whatsappURL =
        `https://wa.me/254701521517?text=${encodeURIComponent(whatsappMessage)}`

      // Open a window immediately so the browser is less likely to block it.
      const whatsappWindow = window.open('about:blank', '_blank')

      if (!whatsappWindow) {
        formMessage.textContent =
          'Please allow pop-ups in your browser, then place the order again.'
        return
      }

      formMessage.textContent = 'Saving your order...'

      try {
        const response = await fetch(
          'http://localhost/fresh-drinks-api/save_order.php',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(databaseOrder)
          }
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Could not save the order.')
        }

        formMessage.textContent =
          `Order #${result.order_id} saved successfully. Opening WhatsApp...`
      } catch (error) {
        console.error('Database order error:', error)

        formMessage.textContent =
          'Could not save the order to the database. Opening WhatsApp so you can still send your order.'
      }

      // Continue to WhatsApp whether or not the database request succeeds.
      whatsappWindow.location.href = whatsappURL
    })

  document.querySelector<HTMLFormElement>('#contact-form')!
    .addEventListener('submit', event => {
      event.preventDefault()

      document.querySelector<HTMLParagraphElement>(
        '#contact-result'
      )!.textContent =
        'Thank you for contacting Fresh Drinks Store!'
    })

  updateCart()
}