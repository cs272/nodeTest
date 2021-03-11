module.exports = (page, pageSize) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    console.log(offset); 
    return {
      offset,
      limit,
    };
  };