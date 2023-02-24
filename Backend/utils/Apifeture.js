class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const searchQuery = this.queryStr.query
      ? { name: { $regex: this.queryStr.query, $options: "i" } }
      : {};
    this.query = this.query.find({ ...searchQuery });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["query", "page", "limit"];
    removeFields.forEach((item) => {
      delete queryCopy[item];
    });

    // filter for price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  pagenation(perPage) {
    let currentPage = +this.queryStr.page || 1;
    let skip = perPage * (currentPage - 1);
    this.query = this.query.limit(perPage).skip(skip);

    return this;
  }
}

module.exports = { ApiFeature };
