import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  it('should render a list of search results', () => {
    const mockResults = [
      {
        searchterm: 'heren truien',
        nrResults: 1100,
      },
      {
        searchterm: 'dames truien',
        nrResults: 1501,
      },
    ];
    render(<SearchResults results={mockResults} searchTerm="trui" />);
    const results = screen.getAllByTestId('search-result');
    expect(results.length).toEqual(2);
  });

  it('should highlight the search term in the results', () => {
    const mockResults = [
      {
        searchterm: 'heren truien',
        nrResults: 1100,
      },
      {
        searchterm: 'dames truien',
        nrResults: 1501,
      },
    ];
    render(<SearchResults results={mockResults} searchTerm="trui" />);
    const [highlight] = screen.getAllByTestId('search-result-highlight');
    expect(highlight).toHaveTextContent('trui');
  });
});
