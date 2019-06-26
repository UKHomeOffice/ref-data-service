const getKeyByValue = (obj, value) => {
  return Object.keys(obj).find(key => obj[key] === value);
}

// takes an object of required fields and
// returns an array with all `touched` fields
const getTouchedFields = touchedFieldsObject => {
  let fields = [];

  if (Object.keys(touchedFieldsObject).length > 0) {
    for (const key in touchedFieldsObject) {
      if (touchedFieldsObject[key] === true) {
        fields.push(key);
      }
    }
  };
  return fields;
};

// takes an array of `touched` fields and check
// if there's a field missing in the values object
const touchedFieldHasValue = (fields, valuesObject) => {
  let displayErrorSummary = false;

  if (fields.length > 0) {
    fields.map(field => {
      if (!(field in valuesObject)) {
        displayErrorSummary = true;
      }
    })
  }
  return displayErrorSummary;
};

export {
  getKeyByValue,
  getTouchedFields,
  touchedFieldHasValue,
}
