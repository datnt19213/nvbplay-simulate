
// Unit tests for: useGetQueryUpdateAllDistricts


import { useGetQueryUpdateAllDistricts } from '../use-get-districts';
import {getGoShipDistricts} from "@/services/addresses";
import {RootState} from "@/stores";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

// Mocking necessary modules
jest.mock("@/services/addresses", () => ({
  getGoShipDistricts: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

const queryClient = new QueryClient();

describe('useGetQueryUpdateAllDistricts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy paths', () => {
    it('should return districts data when provinceSelectedUpdate is provided', async () => {
      // Arrange
      const mockDistricts = [{ id: 1, name: 'District 1' }];
      (useSelector as jest.Mock).mockImplementation((selectorFn) =>
        selectorFn({ address: { provinceSelectedUpdate: { id: 123 } } } as RootState)
      );
      (getGoShipDistricts as jest.Mock).mockResolvedValue(mockDistricts);
      (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => ({
        mutate: mutationFn,
        data: mockDistricts,
      }));

      // Act
      const { result } = renderHook(() => useGetQueryUpdateAllDistricts(), {
        wrapper: () => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
      });

      await act(async () => {
        result.current.getDistrictFnc();
      });

      // Assert
      expect(getGoShipDistricts).toHaveBeenCalledWith(123);
      expect(result.current.data).toEqual(mockDistricts);
    });
  });

  describe('Edge cases', () => {
    it('should return an empty array when provinceSelectedUpdate is not provided', async () => {
      // Arrange
      (useSelector as jest.Mock).mockImplementation((selectorFn) =>
        selectorFn({ address: { provinceSelectedUpdate: null } } as RootState)
      );
      (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => ({
        mutate: mutationFn,
        data: [],
      }));

      // Act
      const { result } = renderHook(() => useGetQueryUpdateAllDistricts(), {
        wrapper: () => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
      });

      await act(async () => {
        result.current.getDistrictFnc();
      });

      // Assert
      expect(getGoShipDistricts).not.toHaveBeenCalled();
      expect(result.current.data).toEqual([]);
    });

    it('should handle errors gracefully when getGoShipDistricts fails', async () => {
      // Arrange
      const errorMessage = 'Failed to fetch districts';
      (useSelector as jest.Mock).mockImplementation((selectorFn) =>
        selectorFn({ address: { provinceSelectedUpdate: { id: 123 } } } as RootState)
      );
      (getGoShipDistricts as jest.Mock).mockRejectedValue(new Error(errorMessage));
      (useMutation as jest.Mock).mockImplementation(({ mutationFn }) => ({
        mutate: mutationFn,
        data: undefined,
        error: new Error(errorMessage),
      }));

      // Act
      const { result } = renderHook(() => useGetQueryUpdateAllDistricts(), {
        wrapper: () => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
      });

      await act(async () => {
        result.current.getDistrictFnc();
      });

      // Assert
      expect(getGoShipDistricts).toHaveBeenCalledWith(123);
      expect(result.current.data).toBeUndefined();
      expect(result.current.mutation.error).toEqual(new Error(errorMessage));
    });
  });
});

// End of unit tests for: useGetQueryUpdateAllDistricts
