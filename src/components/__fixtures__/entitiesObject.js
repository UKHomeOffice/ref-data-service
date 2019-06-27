const entitiesObject = {
  'status': 'success',
  'code': 200,
  'data': [
    {
      'entityName': 'country',
      'schema': {
        'label': 'Countries',
        'description': 'Countries',
        'schemalastupdated': '10/03/2019',
        'dataversion': 1,
        'required': [
          'id',
          'iso31661alpha2',
          'iso31661alpha3',
          'name',
          'continent',
          'iso31661numeric'
        ],
        'properties': {
          'id': {
            'format': 'integer',
            'type': 'integer',
            'description': {
              'label': 'Identifier',
              'description': 'database unique identity record',
              'summaryview': 'false'
            }
          },
          'iso31661alpha2': {
            'maxLength': 2,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': '2 digit alpha code',
              'description': 'Country 2 Character alpha code',
              'summaryview': 'true'
            }
          },
          'iso31661alpha3': {
            'maxLength': 3,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': '3 digit alpha code',
              'description': 'Country 3 Character alpha code',
              'summaryview': 'true'
            }
          },
          'name': {
            'maxLength': 40,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': 'Country name',
              'description': 'Country name',
              'summaryview': 'true'
            }
          },
          'continent': {
            'maxLength': 2,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': 'Continent',
              'description': 'Countinent country is part of',
              'summaryview': 'true'
            }
          },
          'dial': {
            'maxLength': 20,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': 'Phone dial code',
              'description': 'Country dailing prefix',
              'summaryview': 'true'
            }
          },
          'iso31661numeric': {
            'format': 'integer',
            'type': 'integer',
            'description': {
              'label': '3 digit numeric code',
              'description': 'Country numeric ISO code',
              'summaryview': 'true'
            }
          },
          'validfrom': {
            'format': 'date',
            'type': 'string',
            'description': {
              'label': 'Valid from date',
              'description': 'Item valid from date',
              'summaryview': 'false'
            }
          },
          'validto': {
            'format': 'date',
            'type': 'string',
            'description': {
              'label': 'Valid to date',
              'description': 'Item valid to date',
              'summaryview': 'false'
            }
          }
        }
      },
    },
    {
      'entityName': 'nationality',
      'label': 'Nationalities',
      'description': 'The list of recognised Nationalities, including some additonal information.',
      'schema': {
        'description': {
          'description': 'Nationalities',
          'schemalastupdated': '10/03/2019',
          'dataversion': 1
        },
        'required': [
          'id',
          'nationality',
          'visarequired',
          'evwoptional',
          'diplomaticexception',
          'specialexception'
        ],
        'properties': {
          'id': {
            'format': 'integer',
            'type': 'integer',
            'description': {
              'label': 'Identifier',
              'description': 'database unique identity record',
              'summaryview': 'false'
            }
          },
          'nationality': {
            'maxLength': 330,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': 'Identifier',
              'description': 'Nationality names',
              'summaryview': 'true'
            }
          },
          'iso31661alpha3': {
            'maxLength': 3,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': '3 digit alpha code',
              'description': 'Country 3 Character alpha code',
              'summaryview': 'true'
            }
          },
          'iso31661alpha2': {
            'maxLength': 2,
            'format': 'character varying',
            'type': 'string',
            'description': {
              'label': '2 digit alpha code',
              'description': 'Country 2 Character alpha code',
              'summaryview': 'true'
            }
          },
          'visarequired': {
            'format': 'boolean',
            'type': 'boolean',
            'description': {
              'label': 'Visa required',
              'description': 'Is VISA required to visit UK',
              'summaryview': 'false'
            }
          },
          'evwoptional': {
            'format': 'boolean',
            'type': 'boolean',
            'description': {
              'label': 'Optional - EVW',
              'description': 'Is Electronic Visa Waver optional to visit UK',
              'summaryview': 'false'
            }
          },
          'diplomaticexception': {
            'format': 'boolean',
            'type': 'boolean',
            'description': {
              'label': 'Exception - Diplomatic',
              'description': 'Are there diplomatic exceptions for visiting the UK',
              'summaryview': 'false'
            }
          },
          'specialexception': {
            'format': 'boolean',
            'type': 'boolean',
            'description': {
              'label': 'Exception - Special',
              'description': 'Are there special exceptions for visiting the UK',
              'summaryview': 'false'
            }
          },
          'countryid': {
            'format': 'integer',
            'type': 'integer',
            'description': {
              'label': 'Linked country id',
              'description': 'Country link to Country dataset',
              'summaryview': 'false',
              'linkedrecord': 'country(id)'
            }
          },
          'validfrom': {
            'format': 'date',
            'type': 'string',
            'description': {
              'label': 'Valid from date',
              'description': 'Item valid from date',
              'summaryview': 'false'
            }
          },
          'validto': {
            'format': 'date',
            'type': 'string',
            'description': {
              'label': 'Valid to date',
              'description': 'Item valid to date',
              'summaryview': 'false'
            }
          }
        }
      }
    }
  ]
};

export default entitiesObject;
