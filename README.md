# PerpoDia - Client Side (Frontend)

-   **Live Server**: https://perpodia.vercel.app/

## **Project Overview**

PerpoDia Client is a modern web application built with Next.js, utilizing its powerful features like dynamic routing, API integration, and server-side rendering (SSR) to create a seamless user experience. The platform allows users to easily create, manage, and showcase personal projects and blog posts. With Next.js and TypeScript, it ensures a robust, scalable, and maintainable codebase. Users can manage their content through an authenticated dashboard with features like project and blog CRUD operations, while also interacting with the content through an intuitive frontend built with Tailwind CSS. Secure authentication is handled via NextAuth for social login integration, and the platform offers a responsive design suitable for both desktop and mobile devices. PerpoDia integrates MongoDB to store projects, blogs, and messages, making it a fully functional portfolio and blog management tool.

## **Tech Stack**

-   **Frontend Framework:** NextJS (React + TypeScript)
-   **State Management:** Redux Toolkit
-   **UI Library:** Shadcn & Tailwind CSS
-   **Routing:** NextJS Pages Router
-   **API Requests:** RTK Query
-   **Authentication:** NextAuth

## **Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/mahfuzzayn/perpodia-client.git
cd perpodia-client
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret
NEXTAUTH_SECRET=your_nextauth_secret
BACKEND_URL=http://localhost:5000/api/v1
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Your app will be available at `http://localhost:3000`.

## **Features**

-   Public routes: Home, Projects, Blogs, Project & Blog Detail, Contact
-   Private routes: User Dashboard, Projects, Blogs & Messages Managment
-   Responsive design, error handling, and UI enhancements

## **Build & Deployment**

To build the project for production:

```sh
npm run build
```

For deployment, use **Vercel**, **Netlify**, or other static hosting services.

Developed by [Mahfuz Zayn](https://mahfuzzayn.netlify.app/).
