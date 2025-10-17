/**
 * @file tests/integration/api/register.integration.test.js
 * @description Integration tests for the user registration API endpoint.
 * These tests cover scenarios such as missing fields, existing users,
 * and successful user creation.
 */

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data, init = {}) => ({ data, status: init.status ?? 200 }),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed-password"),
}));

const mockDbConnect = jest.fn();
jest.mock("@/utils/dbConnect", () => ({
  __esModule: true,
  default: mockDbConnect,
}));

const mockFindOne = jest.fn();
const mockCreate = jest.fn();
jest.mock("@/models/user", () => ({
  __esModule: true,
  default: {
    findOne: (...args) => mockFindOne(...args),
    create: (...args) => mockCreate(...args),
  },
}));

const loadRoute = () => {
  jest.resetModules();
  return require("@/app/api/register/route");
};

describe("POST /api/register (integration)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFindOne.mockResolvedValue(null);
    mockCreate.mockImplementation(async (u) => ({ ...u, _id: "new-id" }));
  });

  test("returns 400 when required fields are missing", async () => {
    const route = loadRoute();
    const req = { json: async () => ({ name: "OnlyName" }) };

    const res = await route.POST(req);
    expect(res).toBeDefined();
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  test("returns 4xx when user already exists", async () => {
    const route = loadRoute();
    mockFindOne.mockResolvedValue({ _id: "exists", email: "a@b.c" });

    const req = {
      json: async () => ({ name: "Alice", email: "a@b.c", password: "secret" }),
    };

    const res = await route.POST(req);
    expect(mockDbConnect).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledWith({ email: "a@b.c" });
    expect(res).toBeDefined();
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  test("creates a new user and returns 201 on success", async () => {
    const route = loadRoute();
    const body = { name: "Bob", email: "bob@example.com", password: "pwd" };
    const req = { json: async () => body };

    const res = await route.POST(req);

    expect(mockDbConnect).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledWith({ email: body.email });
    expect(mockCreate).toHaveBeenCalled();
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.data).toBeDefined();
    expect(res.data.user).toBeDefined();
    if (res.data.user.password !== undefined) {
      expect(res.data.user.password).not.toBe(body.password);
    }
  });
});
