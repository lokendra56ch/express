export const getAll = (req, res) => {
  // find all products form db
  res.json({
    message: "All products fetched",
    success: true,
    status: "success",
    data: [
      {
        _id: 1,
        name: "Product 1",
      },
      {
        _id: 2,
        name: "Product 2",
      },
    ],
  });
};

export const getById = (req, res) => {
  const { id } = req.params;
  // find product by form db
  res.json({
    message: `product:${id} fetched`,
    status: "success",
    success: true,
    data: {
      _id: id,
      name: "Product 1",
    },
  });
};

export const create = () => {
  console.log(req.body);
  // validate input
  // insert new user to db
  const product = {
    _id: 1,
    ...req.body,
  };

  res.json({
    data: product,
    message: "product created",
    status: "success",
    success: true,
  });
};

export const update = () => {
  const data = req.body;
  const { id } = req.params;

  res.json({
    message: `product: ${id} updated`,
    success: true,
    status: "success",
    data: {
      _id: id,
      ...data,
    },
  });
};

export const remove = () => {
  const { id } = req.params;
  res.json({
    message: `product: ${id} deleted`,
    success: true,
    status: "success",
    data: null,
  });
};
