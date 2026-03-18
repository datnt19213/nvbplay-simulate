// Unit tests for: builderSlice

import builderSlice, {BuilderFilters, setFilterBuilder} from "../builder-slice";

describe("builderSlice() builderSlice method", () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      filters: null,
      changeSetupEquipmentModal: false,
    };
  });

  // Happy Path Tests
  describe("Happy Paths", () => {
    it("should set filters correctly when setFilterBuilder is dispatched", () => {
      // Arrange
      const filters: BuilderFilters = {
        prices: {from: 100, to: 500},
        brands: ["BrandA", "BrandB"],
        colors: ["Red", "Blue"],
        materials: ["Wood", "Metal"],
        weights: [10, 20],
      };

      // Act
      const newState = builderSlice.reducer(
        initialState,
        setFilterBuilder(filters)
      );

      // Assert
      expect(newState.filters).toEqual(filters);
    });

    it("should handle empty filters object correctly", () => {
      // Arrange
      const filters: BuilderFilters = {
        prices: {from: null, to: null},
        brands: [],
        colors: [],
        materials: [],
        weights: [],
      };

      // Act
      const newState = builderSlice.reducer(
        initialState,
        setFilterBuilder(filters)
      );

      // Assert
      expect(newState.filters).toEqual(filters);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle null filters gracefully", () => {
      // Arrange
      const filters = null;

      // Act
      const newState = builderSlice.reducer(
        initialState,
        setFilterBuilder(filters as any)
      );

      // Assert
      expect(newState.filters).toBeNull();
    });

    it("should not modify state when action payload is undefined", () => {
      // Arrange
      const filters = undefined;

      // Act
      const newState = builderSlice.reducer(
        initialState,
        setFilterBuilder(filters as any)
      );

      // Assert
      expect(newState).toEqual(initialState);
    });

    it("should handle filters with unexpected data types", () => {
      // Arrange
      const filters: any = {
        prices: {from: "invalid", to: "invalid"},
        brands: "not-an-array",
        colors: 123,
        materials: null,
        weights: "not-an-array",
      };

      // Act
      const newState = builderSlice.reducer(
        initialState,
        setFilterBuilder(filters)
      );

      // Assert
      expect(newState.filters).toEqual(filters);
    });
  });
});

// End of unit tests for: builderSlice
