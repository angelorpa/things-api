const { Model, fields, references } = require("./model");
const { paginationParseParams, sortParseParams } = require("./../../../utils");

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const populate = [...Object.getOwnPropertyNames(references)].join(" ");

  try {
    const [data = [], total = 0] = await Promise.all([
      Model.find({})
        .limit(limit)
        .skip(skip)
        .sort({
          [sortBy]: direction,
        })
        .populate(populate)
        .exec(),
      Model.countDocuments(),
    ]);

    res.json({
      data,
      meta: {
        limit,
        skip,
        total,
        sortBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.author = async (req, res, next) => {
  const { decoded = {} } = req;
  const { query = {} } = req;
  const { limit, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const populate = [...Object.getOwnPropertyNames(references)].join(" ");

  try {
    const [data = [], total = 0] = await Promise.all([
      Model.find({ author: decoded.id })
        .limit(limit)
        .skip(skip)
        .sort({
          [sortBy]: direction,
        })
        .populate(populate)
        .exec(),
      Model.countDocuments(),
    ]);

    res.json({
      data,
      meta: {
        limit,
        skip,
        total,
        sortBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id } = decoded;

  const document = new Model({
    ...body,
    author: id,
  });

  try {
    const data = await document.save();

    res.status(201);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;

  const populate = Object.getOwnPropertyNames(references).join(" ");

  try {
    const data = await Model.findById(id).populate(populate).exec();

    if (data) {
      req.doc = data;
      next();
    } else {
      next({
        statusCode: 404,
        message: "Document not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const data = await Model.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const data = await Model.findByIdAndDelete(id);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
