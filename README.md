This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and integrated with [Sanity CMS](https://www.sanity.io/).

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Sanity

#### Option A: Create a New Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign up/login
2. Create a new project at [sanity.io/manage](https://www.sanity.io/manage)
3. Note your Project ID and Dataset name (usually "production")

#### Option B: Use Sanity CLI (Recommended)

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize your project (if starting fresh)
sanity init
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2026-02-08
   ```

   You can find your Project ID and Dataset in your [Sanity project settings](https://www.sanity.io/manage).

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Access Sanity Studio

Once the dev server is running, access the Sanity Studio at:
- [http://localhost:3000/studio](http://localhost:3000/studio)

Here you can:
- Create and manage Posts, Authors, and Categories
- Upload images
- Edit content using the rich text editor

## Sanity Schema

This project includes the following content types:
- **Post** - Blog posts with title, slug, author, main image, categories, and rich text body
- **Author** - Author profiles with name, slug, image, and bio
- **Category** - Content categories with title, slug, and description
- **Block Content** - Rich text content with support for headings, lists, links, and images

You can find the schema definitions in `src/sanity/schemaTypes/`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Sanity Documentation](https://www.sanity.io/docs) - learn about Sanity CMS
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router) - integration guide

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
