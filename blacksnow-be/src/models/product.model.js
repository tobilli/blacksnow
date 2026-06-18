// Product schema (plain JS representation)

const ProductSchema = {
  name: String,
  slug: String,
  description: String,
  category: String,
  collection: String,

  price: Number,
  finalPrice: Number,

  stockStatus: String,
  stockQuantity: Number,

  isNew: Boolean,
  isFeatured: Boolean,

  tags: [String],

  variants: {
    sizes: [String],
    colors: [
      {
        name: String,
        hexCode: String,
      },
    ],
  },

  images: [
    {
      url: String,
      alt: String,
    },
  ],
};

module.exports = { ProductSchema };