import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import aiReducer from "../utils/Slices/AISlice";
import Header from "../components/Header";

// ---------------------------------------------------------
// Mocks
// ---------------------------------------------------------

const mockDispatch = vi.fn();

// ---------------------------------------------------------
// React Router Mock
// ---------------------------------------------------------

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

// ---------------------------------------------------------
// Redux Mock
// ---------------------------------------------------------

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");

  return {
    ...actual,

    useDispatch: () => mockDispatch,

    useSelector: (selector) =>
      selector({
        ai: {
          isShowSearchPage: false,
        },
      }),
  };
});

// ---------------------------------------------------------
// Custom Authentication Hook Mock
// ---------------------------------------------------------

vi.mock("../utils/customHooks/useAuthFlowHandler", () => ({
  default: vi.fn(),
}));

// ---------------------------------------------------------
// Imports of mocked functions
// ---------------------------------------------------------

import { useLocation } from "react-router-dom";

// =========================================================
// UNIT TESTS
// =========================================================

describe("Header - Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------
  // Helper
  // -------------------------------------------------------

  const renderHeader = (pathname = "/browse") => {
    useLocation.mockReturnValue({
      pathname,
    });

    return render(<Header />);
  };

  // -------------------------------------------------------
  // Basic Rendering
  // -------------------------------------------------------

  it("renders Cine Fest logo and heading", () => {
    renderHeader("/browse");

    expect(
      screen.getByRole("img", { name: "Cine Fest logo" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Cine Fest" })
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // Login Route
  // -------------------------------------------------------

  it("does not render AI Search button on login page", () => {
    renderHeader("/");

    expect(
      screen.queryByRole("button", { name: "Go To AI Search" })
    ).not.toBeInTheDocument();
  });

  // -------------------------------------------------------
  // AI Search
  // -------------------------------------------------------

  it("renders AI Search button on non-login page", () => {
    renderHeader("/browse");

    expect(
      screen.getByRole("button", { name: "Go To AI Search" })
    ).toBeInTheDocument();
  });

  it("dispatches AI Search action when AI Search button is clicked", async () => {
    const user = userEvent.setup();

    renderHeader("/browse");

    const aiSearchButton = screen.getByRole("button", {
      name: "Go To AI Search",
    });

    await user.click(aiSearchButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------
  // Profile Menu
  // -------------------------------------------------------

  it("opens user profile menu when profile image is clicked", async () => {
    const user = userEvent.setup();

    renderHeader("/browse");

    const images = screen.getAllByRole("img");

    // First image = Cine Fest logo
    // Second image = profile image
    await user.click(images[1]);

    expect(
      screen.getByText("User Name")
    ).toBeInTheDocument();

    expect(
      screen.getByText("+91-9999-999-999")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Sign Out" })
    ).toBeInTheDocument();
  });

  it("closes user profile menu when profile image is clicked again", async () => {
    const user = userEvent.setup();

    renderHeader("/browse");

    const images = screen.getAllByRole("img");

    await user.click(images[1]);

    expect(
      screen.getByText("User Name")
    ).toBeInTheDocument();

    await user.click(images[1]);

    expect(
      screen.queryByText("User Name")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Sign Out" })
    ).not.toBeInTheDocument();
  });
});

// =========================================================
// INTEGRATION TESTS
// =========================================================

describe("Header - Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------
  // Helper
  // -------------------------------------------------------

  const renderWithReduxAndRouter = (pathname = "/browse") => {
    const store = configureStore({
      reducer: {
        ai: aiReducer,
      },
    });

    useLocation.mockReturnValue({
      pathname,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[pathname]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    return store;
  };

  // -------------------------------------------------------
  // Redux + Router Rendering
  // -------------------------------------------------------

  it("renders Header with Redux and Router integration", () => {
    renderWithReduxAndRouter("/browse");

    expect(
      screen.getByRole("heading", { name: "Cine Fest" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Go To AI Search" })
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // Redux State
  // -------------------------------------------------------

it("integrates AI Search button with Redux", async () => {
  const user = userEvent.setup();

  renderWithReduxAndRouter("/browse");

  const aiSearchButton = screen.getByRole("button", {
    name: "Go To AI Search",
  });

  expect(aiSearchButton).toBeInTheDocument();

  await user.click(aiSearchButton);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

  // -------------------------------------------------------
  // Login Route
  // -------------------------------------------------------

  it("does not render AI Search button on login route", () => {
    renderWithReduxAndRouter("/");

    expect(
      screen.getByRole("heading", { name: "Cine Fest" })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Go To AI Search" })
    ).not.toBeInTheDocument();
  });
});