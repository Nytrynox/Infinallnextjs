# Infinall - Next.js Migration

This project has been fully migrated to the **Next.js App Router**.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to `http://localhost:3000`.

## Project Structure

-   `/app`: Contains all routes and pages (App Router).
    -   `page.tsx`: The main landing page.
    -   `dashboard/page.tsx`: The user dashboard (protected).
    -   `api/projects/route.ts`: API endpoints replacing the old backend.
-   `/components`: Reusable UI components (Client Components).
-   `/lib`: Utility functions.
-   `/utils`: API and helper functions.

## Important Notes

### 1. Asset Imports (`figma:asset`)
This project uses a special `figma:asset` import scheme for images. When running locally in Next.js, you will need to:
1.  Download the actual image files.
2.  Place them in the `/public` directory.
3.  Update the import paths in components like `Navigation.tsx`.
    *Example:* Change `import logo from 'figma:asset/...'` to `import logo from '@/public/logo.png'`.

### 2. Supabase Configuration
Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Cleanup
If you see `App.tsx`, `main.tsx`, or `index.html` in the root directory, you can safely delete them. They were part of the previous Vite setup and are no longer needed for Next.js.
