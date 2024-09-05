export const RoomsFilters = [
  { name: "All Rooms", value: "allRooms" },
  { name: "Living Room", value: "livingRoom" },
  { name: "Bedroom", value: "bedRoom" },
  { name: "Kitchen", value: "kitchen" },
  { name: "Bathroom", value: "bathRoom" },
  { name: "Dinning", value: "dinning" },
  { name: "Outdoor", value: "outdoor" },
];

export const priceFilters = [
  { name: "All Price", value: "option1" }, // Represents all prices
  { name: "0.00 - 99.99", value: "option2" },
  { name: "100.00 - 199.99", value: "option3" },
  { name: "200.00 - 299.99", value: "option4" },
  { name: "300.00 - 399.99", value: "option5" },
  { name: "400.00+", value: "option6" }, // Represents prices above 400
];

export const priceOptionRange: {
  [key: string]: { minPrice: number; maxPrice: number };
} = {
  option1: { minPrice: 0, maxPrice: 99999999 },
  option2: { minPrice: 0, maxPrice: 100 },
  option3: { minPrice: 100, maxPrice: 200 },
  option4: { minPrice: 200, maxPrice: 300 },
  option5: { minPrice: 300, maxPrice: 400 },
  option6: { minPrice: 400, maxPrice: 999999999 },
};

export const reviewFilters = [
  { name: "All Reviews", value: "allReviews" },
  { name: "Newest", value: "newest" },
  { name: "Most Rating", value: "mostRating" },
];

// {"_id":{"$oid":"66bcb8296115e57bdf1e94f0"},
//   "name": "Plateware Wooden",
//   "slug": "plateware-wooden",
//   "description": "Small-sized plate made primarily from maple wood suitable with vintage oldish style.",
//   "price": 39.99,
//   "colorStock": {
//     "black": 10
//   },
//   "totalStock": 10,
//   "category": "Plates",
//   "images": {
//     "black": ["black.svg"]
//   },
//   "thumbnail": "thumbnail.svg",
//   "avgRating": 4.0
// }
