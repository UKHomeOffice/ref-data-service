const getKeyByValue = (obj, value) => {
  return Object.keys(obj).find(key => obj[key] === value);
}

// takes an array with the required fields and
// an object with all the form fields and
// returns an array with all fields that
// have been `touched` and are required
const getRequiredTouchedFieldKeys = (requiredFields, touchedFields) => {
  let fields = [];

  if (Object.keys(touchedFields).length > 0) {
    for (const key in touchedFields) {
      if (requiredFields.includes(key) && touchedFields[key] === true) {
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
  getRequiredTouchedFieldKeys,
  touchedFieldHasValue,
}
