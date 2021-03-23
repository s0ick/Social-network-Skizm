import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "../Profile/ProfileInfo/ProfileStatus/ProfileStatus";

describe("ProfileStatusComponent", () => {
  test("Status from props should be in the state", () => {
    const component = create(<ProfileStatus status="s0ick" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("s0ick");
  });

  test("After creation <p> should be displayed", () => {
    const component = create(<ProfileStatus status="s0ick" />);
    const root = component.root;
    let p = root.findByType("p");
    expect(p.type).toBe("p");
  });

  test("After creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="s0ick" />);
    const root = component.root;
    
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });

  test("After creation <p> should contains with correct status", () => {
    const component = create(<ProfileStatus status="Hi, i am new user!" />);
    const root = component.root;
    let p = root.findByType("p");
    expect(p.children[0]).toBe('Hi, i am new user!');
  });

  test("Input should be displayed in editMode in", () => {
    const component = create(<ProfileStatus status="s0ick" />);
    const root = component.root;
    let p = root.findByType("p");
    p.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe('s0ick');
  });

  test("Callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="s0ick" updateStatus={mockCallback} />);
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});