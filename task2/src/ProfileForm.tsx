import React, { ChangeEvent, FormEvent } from "react";
import { CheckboxInput, TextInput } from "./Input";

interface Profile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  receiveNewsletter?: boolean;
}
interface Errors extends Partial<Omit<Profile, "receiveNewsletter">> {}

// "Server-side" code
const mockPost = (profile: Profile) =>
  new Promise<
    { success: false; errors: Errors } | { success: true; profile: Profile }
  >((resolve) => {
    const errors: Errors = {};

    if (!profile.firstName) {
      errors.firstName = "Missing first name!";
    }
    if (!profile.lastName) {
      errors.lastName = "Missing last name!";
    }
    if (!profile.phoneNumber) {
      errors.phoneNumber = "Missing phone number!";
    } else if (profile.phoneNumber.replace(/[^0-9]/, "").length !== 8) {
      errors.phoneNumber = "Phone number must be 8 digits";
    }

    if (Object.keys(errors).length > 0) {
      resolve({ success: false, errors });
      return;
    }

    resolve({ success: true, profile });
  });

export class ProfileForm extends React.Component<
  {},
  Profile & {
    errors: Errors;
    successMessage: string | null;
  }
> {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    receiveNewsletter: false,
    errors: {
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
    },
    successMessage: null,
  };

  onInputChange = (
    _: ChangeEvent<HTMLInputElement>,
    value: string | boolean,
    name: string
  ) => {
    this.setState({ [name]: value } as any);
  };

  // Submit form and handle validation errors
  onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    this.setState({
      errors: {},
      successMessage: null,
    });

    const { firstName, lastName, phoneNumber, receiveNewsletter } = this.state;
    const response = await mockPost({
      firstName,
      lastName,
      phoneNumber,
      receiveNewsletter,
    });

    if (!response.success) {
      this.setState({ errors: response.errors });
    } else {
      // Set success message on successful form submission
      this.setState({ successMessage: "Profile saved successfully!" });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      receiveNewsletter,
      errors,
      successMessage,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="firstName">
          First name:
          <TextInput
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={this.onInputChange}
            error={errors.firstName}
          />
        </label>

        <label htmlFor="lastName">
          Last name:
          <TextInput
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={this.onInputChange}
            error={errors.lastName}
          />
        </label>

        <label htmlFor="phoneNumber">
          Phone number:
          <TextInput
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={this.onInputChange}
            error={errors.phoneNumber}
          />
        </label>

        <label htmlFor="receiveNewsletter">
          Receive newsletter?
          <CheckboxInput
            id="receiveNewsletter"
            name="receiveNewsletter"
            checked={receiveNewsletter}
            onChange={this.onInputChange}
          />
        </label>

        <button type="submit">Save changes</button>

        {successMessage && (
          <div style={{ color: "green", marginTop: "20px" }} role="alert">
            {successMessage}
          </div>
        )}
      </form>
    );
  }
}
