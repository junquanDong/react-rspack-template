import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import WithPage from "@/components/hoc/with-page";

// Helper function to get component name from file path
function getComponentName(filePath: string) {
  const fileName = filePath.split('/').pop() as string;
  return fileName.split('.')[0]
    .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()); // Convert kebab-case to CamelCase
}

/**
 * Generate a route element from a path.
 * @param {string} path
 * @returns {React.ReactElement}
 */
function genRouterElement(path: string) {
  // Lazy load the component and wrap it with WithPage
  const Component = lazy(() => import(`@/pages/${path}`).then((module) => ({ default: WithPage(module.default) })));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

/**
 * Convert paths to routes.
 * @param {__WebpackModuleApi.RequireContext} ctx
 * @returns {RouteObject[]}
 */
function convertPathsToRoutes(ctx: __WebpackModuleApi.RequireContext) {
  const paths = ctx.keys().filter(url => !url.includes('components') && /(index|layout)\.(j|t)sx?$/.test(url));

  // Initialize the root structure
  const root: RouteObject = {
    path: "/",
    children: []
  };

  paths.forEach(path => {
    const parts = path.split('/').slice(1); // Remove the leading '.'
    let currentLevel: RouteObject[] = root.children || [];
    let currentParent: RouteObject = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      const componentName = getComponentName(part);

      if (isLast) {
        const Element = genRouterElement(parts.join('/'));
        if (componentName == 'layout') {
          currentParent.element = Element;
        } else {
          const route = {
            path: componentName === 'index' ? "" : componentName,
            element: Element
          };
          currentLevel.push(route);
        }

      } else {
        let existing = currentLevel.find(route => route.path === part);
        if (!existing) {
          existing = {
            path: part,
            children: []
          };
          currentLevel.push(existing);
        }
        currentLevel = existing.children || [];
        currentParent = existing;
      }
    });
  });

  return [root];
}

const router = createBrowserRouter(  // createHashRouter
  convertPathsToRoutes(require.context('@/pages', true, /\.(j|t)sx?$/)),
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

/**
 * Router component.
 * @returns {JSX.Element}
 */
function Router() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default Router;

