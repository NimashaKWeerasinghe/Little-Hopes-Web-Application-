import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddEditDonations from "./components/orphange/AddEditDonations";
import { BrowserRouter } from "react-router-dom";

describe("AddDataForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Add new donation to Firestore", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );

    const dName = screen.getByPlaceholderText(/Full Name/i);
    const dAge = screen.getByPlaceholderText(/Age/i);
    const dGender = screen.getByPlaceholderText(/Gender/i);
    const dMaritalStatus = screen.getByPlaceholderText(/Marital Status/i);
    const dJob = screen.getByPlaceholderText(/Ocuupation/i);
    const dWorkClass = screen.getByPlaceholderText(/Work Class/i);
    const dAmount = screen.getByPlaceholderText(/Donated Amount/i);
    const dDate = screen.getByPlaceholderText(/Donated Date/i);

    const buttonAdd = screen.getByRole("button", { name: /Submit/i });

    fireEvent.change(dName, { target: { value: "Nadeemal Kaveesha #test" } });
    fireEvent.change(dAge, { target: { value: "35" } });
    fireEvent.change(dGender, { target: { value: "Male" } });
    fireEvent.change(dMaritalStatus, { target: { value: "Married" } });
    fireEvent.change(dJob, { target: { value: "Teacher" } });
    fireEvent.change(dWorkClass, { target: { value: "Private" } });
    fireEvent.change(dAmount, { target: { value: "5000" } });
    fireEvent.change(dDate, { target: { value: "12/12/2021" } });
    fireEvent.click(buttonAdd);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await waitFor(() =>
      expect(addDonation).toHaveBeenCalledWith({
        dName: "Nadeemal Kaveesha #test",
        dAge: "35",
        dGender: "Male",
        dMaritalStatus: "Married",
        dJob: "Teacher",
        dWorkClass: "Private",
        dAmount: "5000",
        dDate: "12/12/2021",
      })
    );
  });

  test("Add new adoption to Firestore", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );

    const dName = screen.getByPlaceholderText(/Full Name/i);
    const dAge = screen.getByPlaceholderText(/Age/i);
    const dGender = screen.getByPlaceholderText(/Gender/i);
  });
  test("Add new sponsership to Firestore", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );

    const dName = screen.getByPlaceholderText(/Full Name/i);
    const dAge = screen.getByPlaceholderText(/Age/i);
    const dGender = screen.getByPlaceholderText(/Gender/i);
  });
});
describe("Update Forms", () => {
  test("Update donation to Firestore", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );
  });

  test("Update adoption to Firestore", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );
  });

  test("Update sponsership to Firestore", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );
  });
});

describe("Delete Data", () => {
  test("Delete donation ", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );
  });

  test("Delete adoption", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );
  });

  test("Delete sponsership", async () => {
    const addDonation = jest.fn();
    render(
      <BrowserRouter>
        <AddEditDonations addDonation={addDonation} />
      </BrowserRouter>
    );
  });
});
