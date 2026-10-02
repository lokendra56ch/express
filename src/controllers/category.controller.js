export const getAll = (req, res) => {
  // find all categories form db
  res.json({
    message: "All categories fetched",
    success: true,
    status: "success",
    data: [
      {
        _id: 1,
        name: "Category 1",
      },
      {
        _id: 2,
        name: "Category 2",
      },
    ],
  });
};

export const getById = (req, res) => {
  const { id } = req.params;
  // find category by form db
  res.json({
    message: `category:${id} fetched`,
    status: "success",
    success: true,
    data: {
      _id: id,
      name: "Category 1",
    },
  });
};

export const create = () => {
  console.log(req.body);
  // validate input
  // insert new user to db
  const category = {
    _id: 1,
    ...req.body,
  };

  res.json({
    data: category,
    message: "category created",
    status: "success",
    success: true,
  });
};

export const update = () => {
  const data = req.body;
  const { id } = req.params;

  res.json({
    message: `category: ${id} updated`,
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
    message: `category: ${id} deleted`,
    success: true,
    status: "success",
    data: null,
  });
};
