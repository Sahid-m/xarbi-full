# Xarbi

**Turn Your API into a Paid Service in Three Steps**

Xarbi is an AI SaaS platform that enables developers to monetize their APIs using the x402 payment protocol. Built on Arbitrum Sepolia, Xarbi handles payment verification, resource access control, and blockchain transaction management seamlessly.

## 🚀 Features

- **x402 Payment Protocol Integration**: Native support for HTTP 402 Payment Required responses
- **Blockchain Payment Verification**: Automated payment verification on Arbitrum Sepolia
- **Custom Facilitator**: Built-in smart contract system for secure payment handling
- **Simple Integration**: Three-step process to monetize your existing API
- **Automatic Resource Protection**: Middleware-based access control for paid endpoints

## 🏗️ Architecture

<img width="1344" height="764" alt="image" src="https://github.com/user-attachments/assets/427b6920-d795-4318-9363-f57617558942" />


Xarbi uses a three-layer architecture:

1. **x402 Client Layer**: Handles client requests and x402 payment requirements
2. **Middleware Layer**: Manages payment verification and API routing
3. **Blockchain Layer**: Smart contracts on Arbitrum Sepolia for payment processing

### Payment Flow

1. Client requests a protected resource
2. x402 middleware requires payment with headers
3. Client submits x402 payment payload
4. Middleware verifies payment completion
5. Upon verification, resources are provided
6. Transaction is submitted on-chain
7. Smart contract validates and transfers payment

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- [Additional prerequisites to be filled]

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Sahid-m/xarbi-full.git
# Navigate to project directory
cd xarbi

# Install dependencies
npm install
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
PORT=3000
API_BASE_URL=

# Blockchain Configuration
ARBITRUM_SEPOLIA_RPC=
PRIVATE_KEY=
CONTRACT_ADDRESS=

# x402 Configuration
PAYMENT_REQUIRED_HEADER=
PAYMENT_AMOUNT=

# Additional configuration
```

## 🚀 Getting Started

### Step 1: [To be filled]

```bash
# Commands and instructions
```

### Step 2: [To be filled]

```bash
# Commands and instructions
```

### Step 3: [To be filled]

```bash
# Commands and instructions
```

## 📖 Usage

### Basic Example

```javascript
// Example code to be added
```

### Protecting an Endpoint

```javascript
// Example code to be added
```

### Custom Payment Configuration

```javascript
// Example code to be added
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📦 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [LICENSE TYPE] - see the LICENSE file for details.

## 🔗 Links

- [Documentation](#)
- [API Reference](#)
- [x402 Protocol Specification](#)
- [Arbitrum Sepolia Testnet](#)

## 💬 Support

For support, email support@xarbi.io or join our Discord community.

## 🙏 Acknowledgments

- x402 Protocol contributors
- Arbitrum team
- [Other acknowledgments to be added]

---

Built with ❤️ by the Xarbi Team
