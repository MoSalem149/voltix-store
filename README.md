# Voltix Store

## Modern Electronics E-commerce Platform

Voltix Store is a modern e-commerce application built with Next.js, React, and Tailwind CSS. It features a robust authentication system using NextAuth.js, product browsing, shopping cart functionality, and a streamlined checkout process.

## Features

- **Product Catalog**: Browse a wide range of electronic products with detailed descriptions.
- **Shopping Cart**: Add, update, and remove items from your cart.
- **User Authentication**: Secure registration and login using NextAuth.js, supporting both credential-based and OAuth (Google, Facebook) authentication.
- **Registration Enforcement**: Users must register an account before they can sign in.
- **Dynamic Metadata**: SEO-friendly pages with dynamically generated metadata for improved search engine visibility.
- **Responsive Design**: A fully responsive user interface built with Tailwind CSS, ensuring a seamless experience across all devices.
- **Vercel Deployment Ready**: Optimized for deployment on the Vercel platform.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/MoSalem149/voltix-store.git
    cd voltix-store
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual keys.

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Google OAuth Credentials
# Obtain these from Google Cloud Console: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth Credentials
# Obtain these from Facebook Developers: https://developers.facebook.com/
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
```

**Note**: The `NEXTAUTH_SECRET` should be a long, random string. You can generate one using `openssl rand -base64 32`.

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/).

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Connect to Vercel**: Import your GitHub repository into Vercel.
3.  **Configure Environment Variables**: Add the environment variables (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`) to your Vercel project settings.
4.  **Deploy**: Vercel will automatically build and deploy your application.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

This project is open-source and available under the MoSalem149 License.
