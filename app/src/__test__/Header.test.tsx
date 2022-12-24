/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import store from "../store";

// jest.mock("react-redux", () => ({
//     useSelector: jest.fn(() => ({
//       userInfo: {
//         data: {
//           name: "Test User"
//         }
//       }
//     })),
//     useDispatch: jest.fn()
//   }));

describe("Header", () => {
  it("renders the header with the correct content", () => {
    const { getByText } = render(<Provider store={store}><BrowserRouter><Header setSearch={() => {}} /></BrowserRouter></Provider>);
    const header = getByText("Patient Management");
    const loginLink = getByText("Login");
    expect(header).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  it("renders the search bar and calls the setSearch function on input", () => {
    const setSearch = jest.fn();
    const { getByPlaceholderText } = render(
       <Provider store={store}> <BrowserRouter><Header setSearch={setSearch} /></BrowserRouter></Provider>);
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(setSearch).toHaveBeenCalledWith("test");
  });

  it("should render the component and logout the user", async () => {
    const { getByText, getByTestId } = render(<Provider store={store}> <BrowserRouter><Header setSearch={jest.fn()} /></BrowserRouter></Provider>);
    expect(getByText((text) => text.includes('Patient Management'))).toBeInTheDocument();
    await waitFor(() => expect(getByText("Login")).toBeInTheDocument());
  });
});


