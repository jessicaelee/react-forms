import React from 'react';
import { render, fireEvent, getByDisplayValue } from '@testing-library/react';
import Boxlist from './Boxlist';

it("renders without crashing", function () {
    render(<Boxlist />)
})

it("matches snapshot", function () {
    const { asFragment } = render(<Boxlist />);
    expect(asFragment()).toMatchSnapshot();
})

it("will display one box and form", function () {
    const { getAllByRole } = render(<Boxlist />)

    expect(getAllByRole("button").length).toEqual(2)
    expect(getAllByRole("form").length).toEqual(1)
})

it("form is capable of being filled out and displayed", function () {
    const { getByLabelText, getByDisplayValue } = render(<Boxlist />)
    const widthInput = getByLabelText("Width:")
    const heightInput = getByLabelText("Height:")
    const backgroundColorInput = getByLabelText("Background color:")

    fireEvent.change(widthInput, { target: { value: 100 } })
    fireEvent.change(heightInput, { target: { value: 200 } })
    fireEvent.change(backgroundColorInput, { target: { value: "blue" } })

    expect(getByDisplayValue("100")).toBeInTheDocument();
    expect(getByDisplayValue("200")).toBeInTheDocument();
    expect(getByDisplayValue("blue")).toBeInTheDocument();
}
)

it("will add box to screen when filled out", function () {
    const { getByLabelText, queryByText, getAllByRole } = render(<Boxlist />)
    const widthInput = getByLabelText("Width:")
    const heightInput = getByLabelText("Height:")
    const backgroundColorInput = getByLabelText("Background color:")
    const addButton = queryByText("Add a new box!")

    fireEvent.change(widthInput, { target: { value: 100 } })
    fireEvent.change(heightInput, { target: { value: 100 } })
    fireEvent.change(backgroundColorInput, { target: { value: "red" } })
    fireEvent.click(addButton)

    expect(getAllByRole("button").length).toEqual(3);
    expect(getAllByRole("form").length).toEqual(1);
})

it("will remove box when click on X", function () {
    const { queryByText, getAllByRole } = render(<Boxlist />)

    const deleteButton = queryByText("X")

    fireEvent.click(deleteButton)

    expect(getAllByRole("button").length).toEqual(1);
    expect(getAllByRole("form").length).toEqual(1);
})