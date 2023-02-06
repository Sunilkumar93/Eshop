class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const searchQuery = this.queryStr.query
      ? { name: { $regex: this.queryStr.query, $options: "i" } }
      : {};
    this.query = this.queryStr.find({ ...searchQuery });
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
    queryStr.replace();

    return this;
  }
}
