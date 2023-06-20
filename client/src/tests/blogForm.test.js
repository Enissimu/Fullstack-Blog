import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "../Forms/blogForm";

describe("Testing out the blogform", () => {
  test("Can you send a new blog?", async () => {
    const blog = {
      author: "bozidi",
      url: "kisladidi",
      title: "bu bir testtir ha",
    };

    const mockHandler = jest.fn();
    const { container } = render(
      <BlogForm createBlog={mockHandler}> </BlogForm>
    );

    const createButton = container.getElementsByClassName("createBlog");
    await fireEvent.click(createButton[0]);

    expect(mockHandler).toBeCalledTimes(1);
  });
});
