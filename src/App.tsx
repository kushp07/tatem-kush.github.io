import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  // TODO: add keyboard navigation here
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [savedData, setSavedData] = useState<any>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          focusPreviousInput();
          break;
        case "ArrowDown":
          event.preventDefault();
          focusNextInput();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    loadSavedData();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const focusNextInput = () => {
    const inputs = [firstNameRef, lastNameRef, emailRef, passwordRef];

    const currentInputIndex = inputs.findIndex(
      (inputRef) => inputRef.current === document.activeElement
    );
    const nextInputIndex = (currentInputIndex + 1) % inputs.length;

    inputs[nextInputIndex]?.current?.focus();
  };

  const focusPreviousInput = () => {
    const inputs = [firstNameRef, lastNameRef, emailRef, passwordRef];

    const currentInputIndex = inputs.findIndex(
      (inputRef) => inputRef.current === document.activeElement
    );
    const previousInputIndex =
      (currentInputIndex - 1 + inputs.length) % inputs.length;

    inputs[previousInputIndex]?.current?.focus();
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    // TODO: implement form data saving to local storage
    const formData = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    setSavedData(formData);
    // Save the form data to localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const loadSavedData = () => {
    const savedDataString = localStorage.getItem("formData");

    if (savedDataString) {
      const parsedData = JSON.parse(savedDataString);
      setSavedData(parsedData);
      firstNameRef.current!.value = parsedData.firstName || "";
      lastNameRef.current!.value = parsedData.lastName || "";
      emailRef.current!.value = parsedData.email || "";
      passwordRef.current!.value = parsedData.password || "";
    }
  };

  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col md:flex-row items-center justify-center">
      <div>
        <img src="/tatem-logo.png" className="w-8 h-8 mb-2 mx-auto" />
        <h1 className="text-3xl text-center mb-4">Tatem Inputs</h1>

        {savedData ? (
          <div className="flex flex-col bg-gray-100 rounded-md p-3 w-72 gap-4 my-5">
            <h1 className="text-center font-bold">Submitted form inputs:</h1>
            <div className="flex justify-between">
              <span className="font-semibold">{`First Name: `}</span>
              <h3 className="text-ellipsis overflow-hidden w-2/3 text-right">
                {savedData.firstName}
              </h3>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">{`Last Name: `}</span>
              <h3 className="text-ellipsis overflow-hidden w-2/3 text-right">
                {savedData.lastName}
              </h3>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">{`Email: `}</span>
              <h3 className="text-ellipsis overflow-hidden w-2/3 text-right">
                {savedData.email}
              </h3>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">{`Password: `}</span>
              <h3 className="text-ellipsis overflow-hidden w-2/3 text-right">
                {savedData.password}
              </h3>
            </div>
          </div>
        ) : (
          <div>No saved data to show</div>
        )}
      </div>
      <form
        className="flex mx-auto max-w-2xl flex-col items-center gap-3"
        onSubmit={(e) => submitForm(e)}
      >
        <label className="flex flex-col items-start w-full gap-1">
          <span className="text-xs text-left text-gray-700">First Name</span>
          <input
            className="w-full rounded border border-gray-100 px-3 py-1"
            ref={firstNameRef}
          />
        </label>
        <label className="flex flex-col items-start w-full gap-1">
          <span className="text-xs text-gray-700">Last Name</span>
          <input
            className="w-full rounded border border-gray-100 px-3 py-1"
            ref={lastNameRef}
          />
        </label>
        <label className="flex flex-col items-start w-full gap-1">
          <span className="text-xs text-gray-700">Email</span>
          <input
            className="w-full rounded border border-gray-100 px-3 py-1"
            ref={emailRef}
          />
        </label>
        <label className="flex flex-col items-start w-full gap-1">
          <span className="text-xs text-gray-700">Password</span>
          <input
            type="password"
            className="w-full rounded border border-gray-100 px-3 py-1"
            ref={passwordRef}
          />
        </label>
        <button
          className="mt-2 border rounded px-2 py-0.5 hover:cursor-pointer border-black hover:bg-black hover:text-white duration-150"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
