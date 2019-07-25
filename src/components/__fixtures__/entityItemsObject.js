const entityItemsObject = {
  "status": "success",
  "code": 200,
  "entitySchema": {
    "label": "Countries",
    "description": "Countries",
    "schemalastupdated": "10/03/2019",
    "dataversion": 1,
    "required": [
      "id",
      "iso31661alpha2",
      "iso31661alpha3",
      "name",
      "continent",
      "iso31661numeric"
    ],
    "properties": {
      "id": {
        "maxLength": null,
        "format": "integer",
        "type": "integer",
        "description": {
          "label": "Identifier",
          "description": "Database unique identity record",
          "summaryview": "false"
        }
      },
      "iso31661alpha2": {
        "maxLength": 2,
        "format": "character varying",
        "type": "character varying",
        "description": {
          "label": "2 digit alpha code",
          "description": "Country 2 Character alpha code",
          "summaryview": "true"
        }
      },
      "iso31661alpha3": {
        "maxLength": 3,
        "format": "character varying",
        "type": "character varying",
        "description": {
          "label": "3 digit alpha code",
          "description": "Country 3 Character alpha code",
          "summaryview": "true"
        }
      },
      "name": {
        "maxLength": 40,
        "format": "character varying",
        "type": "character varying",
        "description": {
          "label": "Country name",
          "description": "Country name",
          "summaryview": "true"
        }
      },
      "continent": {
        "maxLength": 2,
        "format": "character varying",
        "type": "character varying",
        "description": {
          "label": "Continent",
          "description": "Countinent country is part of",
          "summaryview": "true"
        }
      },
      "dial": {
        "maxLength": 20,
        "format": "character varying",
        "type": "character varying",
        "description": {
          "label": "Phone dial code",
          "description": "Country dialing prefix",
          "summaryview": "true"
        }
      },
      "iso31661numeric": {
        "maxLength": null,
        "format": "integer",
        "type": "integer",
        "description": {
          "label": "3 digit numeric code",
          "description": "Country numeric ISO code",
          "summaryview": "true"
        }
      },
      "validfrom": {
        "maxLength": null,
        "format": "timestamp with time zone",
        "type": "timestamp with time zone",
        "description": {
          "label": "Valid from date",
          "description": "Item valid from date",
          "summaryview": "false"
        }
      },
      "validto": {
        "maxLength": null,
        "format": "timestamp with time zone",
        "type": "timestamp with time zone",
        "description": {
          "label": "Valid to date",
          "description": "Item valid to date",
          "summaryview": "false"
        }
      }
    }
  },
  "data": [
    {
        "id": 1,
        "iso31661alpha2": "TW",
        "iso31661alpha3": "TWN",
        "name": "Taiwan",
        "continent": "AS",
        "dial": "886",
        "iso31661numeric": 158,
        "validfrom": null,
        "validto": null
    }
  ]
};

export default entityItemsObject;
