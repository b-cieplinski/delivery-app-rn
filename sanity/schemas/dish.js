export default {
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "name of dish",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.required(200),
    },
    {
      name: "price",
      type: "number",
      title: "Price of the dish in GBP",
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Dish",
    },
  ],
}
