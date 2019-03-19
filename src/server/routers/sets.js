import express from 'express';

// local imports
import logger from '../../logger'

const router = new express.Router();

router.get('/api/datasets', (req, res) => {
  logger.info('Fetching datasets');
  res.status(200).json(
    [
      {
        "id": "1",
        "iso": "PRT",
        "name": "Portugal"
      },
      {
        "id": "2",
        "iso": "GBR",
        "name": "Great Britain"
      }
    ]
  )
});

router.get('/api/datasets/:name', (req, res) => {
  logger.info(`Fetching dataset ${req.params.name}`);

});

router.get('/api/datasets/:name/schema', (req, res) => {
  logger.info(`Fetching dataset ${req.params.name} schema`);
});

router.get('/api/datasets/:name/search?', (req, res) => {
  logger.info(`Searching datasets ${req.params.name}`);
});

router.patch('/api/datasets/:name', (req, res) => {
  logger.info(`Patching dataset ${req.params.name}`);
});

router.delete('/api/datasets/:name', (req, res) => {
  logger.info(`Deleting dataset ${req.params.name}`);
});

module.exports = router;
