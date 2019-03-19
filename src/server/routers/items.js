import express from 'express';

// local imports
import logger from '../../logger';

const router = new express.Router();

router.get('/api/datasets/:name/items/:id', (req, res) => {
  logger.info(`Fetching dataset ${req.params.name} item: ${req.params.id}`);
  res.status(200).json({"id": "1", "iso": "PRT", "name": "Portugal"})
});

router.post('/api/datasets/:name/items', (req, res) => {
  logger.info(`Creating new data item in dataset ${req.params.name}`);

});

router.patch('/api/datasets/items/:id', (req, res) => {
  logger.info(`Patching dataset ${req.params.name} item: ${req.params.id}`);
});

router.delete('/api/datasets/items/:id', (req, res) => {
  logger.info(`Deleting dataset ${req.params.name} item: ${req.params.id}`);
});

module.exports = router;
