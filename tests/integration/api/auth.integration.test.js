/**
 * @file tests/integration/api/auth.integration.test.js
 * @description Integration tests for the authentication middleware.
 * These tests verify that the middleware correctly restricts access
 * to admin and user routes based on user roles.
 */

// tests/integration/api/auth.integration.test.js
jest.mock("next-auth/middleware", () => ({
  withAuth: (fn /*, opts */) => fn,
}));

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: (url) => ({ redirected: true, url: String(url) }),
  },
}));

describe("middleware (auth) integration tests", () => {
  const loadMiddleware = () => {
    jest.resetModules();
    // require the middleware after mocks to ensure mocks are used
    // path from this test file to project root middleware.js
    return require("@/middleware");
  };

  test("exports config.matcher with expected routes", () => {
    const { config } = loadMiddleware();
    expect(Array.isArray(config.matcher)).toBe(true);
    expect(config.matcher).toEqual(
      expect.arrayContaining([
        "/dashboard/user/:path*",
        "/dashboard/admin/:path*",
        "/api/user/:path*",
        "/api/admin/:path*",
      ])
    );
  });

  test("redirects to / when non-admin accesses admin route", async () => {
    const { default: middleware } = loadMiddleware();

    const req = {
      nextUrl: { pathname: "/dashboard/admin/settings" },
      url: "http://localhost/dashboard/admin/settings",
      // simulate nextauth token with non-admin role
      nextauth: { token: { user: { role: "user" } } },
    };

    const res = await middleware(req);
    expect(res).toEqual({ redirected: true, url: "http://localhost/" });
  });

  test("allows admin to access admin route (no redirect)", async () => {
    const { default: middleware } = loadMiddleware();

    const req = {
      nextUrl: { pathname: "/dashboard/admin/metrics" },
      url: "http://localhost/dashboard/admin/metrics",
      nextauth: { token: { user: { role: "admin" } } },
    };

    const res = await middleware(req);
    expect(res).toBeUndefined();
  });

  test("redirects to / when non-user accesses user route", async () => {
    const { default: middleware } = loadMiddleware();

    const req = {
      nextUrl: { pathname: "/dashboard/user/profile" },
      url: "http://localhost/dashboard/user/profile",
      nextauth: { token: { user: { role: "admin" } } }, // admin isn't 'user'
    };

    const res = await middleware(req);
    expect(res).toEqual({ redirected: true, url: "http://localhost/" });
  });

  test("allows user to access user route (no redirect)", async () => {
    const { default: middleware } = loadMiddleware();

    const req = {
      nextUrl: { pathname: "/dashboard/user/profile" },
      url: "http://localhost/dashboard/user/profile",
      nextauth: { token: { user: { role: "user" } } },
    };

    const res = await middleware(req);
    expect(res).toBeUndefined();
  });
});
