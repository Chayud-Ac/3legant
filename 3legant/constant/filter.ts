export const CategoryFilters = [
  { name: "All Rooms", value: "allRooms" },
  { name: "Living Room", value: "livingRoom" },
  { name: "Bedroom", value: "bedRoom" },
  { name: "Kitchen", value: "kitchen" },
  { name: "Bathroom", value: "bathRoom" },
  { name: "Dinning", value: "dinning" },
  { name: "Outdoor", value: "outdoor" },
  { name: "New Arrival", value: "newArrival" },
];

export const priceFilters = [
  { name: "All Price", value: "option1" }, // Represents all prices
  { name: "0.00 - 99.99", value: "option2" },
  { name: "100.00 - 199.99", value: "option3" },
  { name: "200.00 - 299.99", value: "option4" },
  { name: "300.00 - 399.99", value: "option5" },
  { name: "400.00+", value: "option6" }, // Represents prices above 400
];

export const priceOptionRange = {
  option1: { minValue: 0, maxValue: 99999999 },
  option2: { minValue: 0, maxValue: 99.99 },
  option3: { minValue: 100, maxValue: 199.99 },
  option4: { minValue: 200, maxValue: 299.99 },
  option5: { minValue: 300, maxValue: 399.99 },
  option6: { minValue: 400, maxValue: 99999999 },
};
