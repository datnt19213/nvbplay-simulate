// Unit tests for: useGetQueryCreateAllCities

import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useGetQueryCreateAllCities} from "../use-get-cities";

// Mock the necessary modules
jest.mock("@/services/addresses", () => ({
  getGoShipCities: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  keepPreviousData: jest.fn(),
}));

describe("useGetQueryCreateAllCities() useGetQueryCreateAllCities method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return cities data when query is successful", async () => {
      // Arrange: Mock successful query response
      const mockCitiesData = [
        {id: 1, name: "City A"},
        {id: 2, name: "City B"},
      ];
      (useQuery as jest.Mock).mockReturnValue({
        data: mockCitiesData,
        isLoading: false,
        isError: false,
      });

      // Act: Render the hook
      const {result} = renderHook(() => useGetQueryCreateAllCities());

      // Assert: Verify the hook returns the expected data
      expect(result.current.citiesData).toEqual(mockCitiesData);
      expect(result.current.citesQuery.isLoading).toBe(false);
      expect(result.current.citesQuery.isError).toBe(false);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle loading state correctly", async () => {
      // Arrange: Mock loading state
      (useQuery as jest.Mock).mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
      });

      // Act: Render the hook
      const {result} = renderHook(() => useGetQueryCreateAllCities());

      // Assert: Verify the hook returns loading state
      expect(result.current.citiesData).toBeNull();
      expect(result.current.citesQuery.isLoading).toBe(true);
    });

    it("should handle error state correctly", async () => {
      // Arrange: Mock error state
      (useQuery as jest.Mock).mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });

      // Act: Render the hook
      const {result} = renderHook(() => useGetQueryCreateAllCities());

      // Assert: Verify the hook returns error state
      expect(result.current.citiesData).toBeNull();
      expect(result.current.citesQuery.isError).toBe(true);
    });

    it("should use keepPreviousData as placeholderData", async () => {
      // Arrange: Mock the useQuery to check placeholderData
      (useQuery as jest.Mock).mockImplementation(({placeholderData}) => {
        return {
          data: placeholderData,
          isLoading: false,
          isError: false,
        };
      });

      // Act: Render the hook
      const {result} = renderHook(() => useGetQueryCreateAllCities());

      // Assert: Verify the placeholderData is keepPreviousData
      expect(result.current.citiesData).toBe(keepPreviousData);
    });
  });
});

// End of unit tests for: useGetQueryCreateAllCities
