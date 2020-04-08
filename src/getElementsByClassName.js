const getElementsByClassName = (className) => {
  const results = [];

  const searchClass = (element) => {
    if (element.children === undefined) {
      return;
    }
    if (element.classList && element.classList.contains(className)) {
      results.push(element);
    }
    for (const currentElement of element.children) {
      searchClass(currentElement);
    }
  };
  searchClass(document);
  return results;
};

module.exports = { getElementsByClassName };
