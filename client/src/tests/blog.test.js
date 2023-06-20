import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import Blog from '../components/blog';

describe('does blogs render properly? ', () => {
  test('Does it render blogs?', () => {
    const blog = {
      author: 'bozidi',
      likes: 31,
      url: 'kisladidi',
      title: 'bu bir testtir ha',
    };
    const { container } = render(<Blog blog={blog}></Blog>);

    const author = screen.getByText(/bozidi/);
    const title = screen.getByText(/bu bir testtir ha/i);
    const showMore = container.getElementsByClassName('ShowMore');

    expect(author).toBeDefined();
    expect(title).toHaveTextContent('bu bir testtir ha');
    expect(showMore[0]).not.toBeVisible();
  });

  test('Does it render when wiev button is clicked?', async () => {
    const blog = {
      author: 'bozidi',
      likes: 31,
      url: 'kisladidi',
      title: 'bu bir testtir ha',
    };

    const mockWiev = jest.fn();

    const { container } = render(
      <Blog blog={blog} wievOrNot={mockWiev}></Blog>
    );
    const showMore = container.getElementsByClassName('ShowMore');
    const wievButton = container.getElementsByClassName('hideOrWiev');
    await fireEvent.click(wievButton[0]);

    expect(showMore[0]).toBeVisible();
    expect(mockWiev).toHaveBeenCalledTimes(1);
  });
  test('Does it render when wiev button is clicked?', async () => {
    const blog = {
      author: 'bozidi',
      likes: 31,
      url: 'kisladidi',
      title: 'bu bir testtir ha',
    };

    const mockWiev = jest.fn();

    const { container } = render(
      <Blog blog={blog} wievOrNot={mockWiev}></Blog>
    );

    const wievButton = container.getElementsByClassName('hideOrWiev');
    const showMore = container.getElementsByClassName('ShowMore');

    await fireEvent.click(wievButton[0]);
    await fireEvent.click(wievButton[0]);

    expect(mockWiev).toHaveBeenCalledTimes(2);
    expect(showMore[0]).not.toBeVisible();
  });
});
