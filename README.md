# One-Qr-Gen

🚀 **Project Overview**

One-Qr-Gen is a powerful and versatile application designed to simplify the process of generating UPI (Unified Payments Interface) payment QR codes. This tool empowers businesses and individuals to effortlessly create an unlimited number of QR codes, making it incredibly easy to accept digital payments from customers through various UPI-enabled applications.

Whether you're a small business owner, a freelancer, or just need a quick way to generate payment QR codes, One-Qr-Gen provides a seamless and efficient solution.

✨ **Features**

- **Unlimited QR Code Generation**: Generate as many UPI payment QR codes as you need, without any restrictions.
- **UPI Payment Integration**: Create QR codes specifically formatted for UPI payments, ensuring compatibility with all major UPI apps.
- **Frontend & Backend Architecture**: A robust setup with separate frontend and backend components for scalability and maintainability.
- **User-Friendly Interface**: An intuitive interface makes QR code generation quick and straightforward.

🛠️ **Technologies Used**

**Frontend**:
- Next.js
- Typescript

**Backend**:
- Node.js
- JavaScript

📦 **Installation & Setup**

To get One-Qr-Gen up and running on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/devagn611/One-Qr-Gen.git
   cd One-Qr-Gen
   ```

2. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

3. **Install Backend Dependencies**:
   ```bash
   npm install # Or yarn install
   ```

4. **Start the Backend Server**:
   ```bash
   npm start # Or node index.js
   ```
   (Replace `index.js` with the actual entry file for your backend, e.g., `server.js`.)

5. **Navigate to the Frontend Directory**:
   Open a new terminal window and navigate to the frontend folder.
   ```bash
   cd ../frontend
   ```

6. **Install Frontend Dependencies**:
   ```bash
   npm install # Or yarn install
   ```

7. **Start the Frontend Development Server**:
   ```bash
   npm run dev # Or yarn dev
   ```

8. **Open the Frontend**:
   Open your web browser and navigate to `http://localhost:3000` (or the port Next.js is running on).

🚀 **Usage**

Once the backend server is running and you have opened the frontend in your browser:

1. Enter the required UPI payment details (e.g., payee VPA, amount, remarks) into the provided fields on the web interface.
2. Click the "Generate QR Code" button.
3. Your custom UPI payment QR code will be displayed, ready to be scanned by your customers.

📄 **License**

This project is licensed under the Mozilla Public License 2.0 (MPL-2.0). See the [LICENSE](LICENSE) file in the repository for more details.
