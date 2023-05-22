import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SearchBar from './SearchBar';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/search', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        search: 'default',
        suggestions: [
          {
            searchterm: 'heren truien',
            nrResults: 1100,
          },
          {
            searchterm: 'dames truien',
            nrResults: 1501,
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Searchbar', () => {
  it('should render input with "Zoeken" placeholder', () => {
    render(<SearchBar />);
    const placeholder = screen.getByLabelText(/Zoeken/i);
    expect(placeholder).toBeInTheDocument();
  });

  it('should have class "focus" on form when input is active', async () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText('Zoeken');
    fireEvent.focus(searchInput);
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar.className).toContain('focus');
  });

  it('should remove class "focus" when input is inactive', () => {
    render(<SearchBar />);
    const searchBar = screen.getByTestId('search-bar');
    const searchInput = screen.getByPlaceholderText('Zoeken');
    fireEvent.focus(searchInput);

    expect(searchBar.className).toContain('focus');
    fireEvent.blur(searchInput);

    expect(searchBar.className).not.toContain('focus');
  });

  it('should match input value with search term', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Zoeken');
    fireEvent.change(searchInput, {
      target: {
        value: 'test',
      },
    });
    expect(searchInput.value).toEqual('test');
  });

  it('should display a clear button when search term is not empty', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Zoeken');
    fireEvent.change(searchInput, {
      target: {
        value: 'test',
      },
    });
    const clearButton = screen.queryByTestId('clear-button');
    expect(clearButton).not.toBeNull();
  });

  it('should not display a clear button when search term is empty', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Zoeken');
    fireEvent.change(searchInput, {
      target: {
        value: '',
      },
    });
    const clearButton = screen.queryByTestId('clear-button');
    expect(clearButton).toBeNull();
  });

  it('should clear input when clear button is clicked', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Zoeken');
    fireEvent.change(searchInput, {
      target: {
        value: 'test',
      },
    });
    const clearButton = screen.queryByTestId('clear-button');
    fireEvent.click(clearButton);
    expect(searchInput.value).toEqual('');
  });

  it('should not display SearchResults when there are no matching results', async () => {
    render(<SearchBar />);
    const searchInput = screen.getByTestId('search-input');
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'kleding');
    const searchResults = screen.queryByTestId('search-results');

    expect(searchResults).toBeNull();
  });

  it('should display SearchResults when there are matching results', async () => {
    render(<SearchBar />);
    const searchInput = screen.getByTestId('search-input');
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'trui');
    const searchResults = screen.queryByTestId('search-results');

    expect(searchResults).not.toBeNull();
  });
});
