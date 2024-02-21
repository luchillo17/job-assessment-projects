import express from 'express';
import { ObjectId } from 'mongodb';

import { isAuthenticatedMiddleware } from '../config/auth.config.ts';
import { mongoClientPromise } from '../config/db.config.ts';
import {
  InsurancePolicy,
  insurancePolicySchema,
} from '../models/insurance-policy.model.ts';

const router = express.Router();

// Read list and create route
router
  .route('/api/insurance-policy')
  .all(isAuthenticatedMiddleware)
  .get(async (req, res, next) => {
    try {
      const client = await mongoClientPromise;
      const collection = client
        .db()
        .collection<InsurancePolicy>('InsurancePolicy');

      const policies = await collection.find().toArray();

      res.json(policies);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const policy = insurancePolicySchema.omit({ _id: true }).parse(req.body);

      const client = await mongoClientPromise;
      const collection = client
        .db()
        .collection<InsurancePolicy>('InsurancePolicy');

      const insertResult = await collection.insertOne(policy);

      if (insertResult.acknowledged) {
        return res.sendStatus(200);
      }

      res.sendStatus(500);
    } catch (error) {
      next(error);
    }
  });

// Read, update and delete (RUD of CRUD)
router
  .route('/api/insurance-policy/:id')
  .all(isAuthenticatedMiddleware)
  .get(async (req, res, next) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.sendStatus(400);
      }

      const client = await mongoClientPromise;
      const collection = client
        .db()
        .collection<InsurancePolicy>('InsurancePolicy');

      const result = await collection.findOne({ _id: new ObjectId(id) });

      if (!result) {
        return res.sendStatus(404);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.sendStatus(400);
      }

      const policy = insurancePolicySchema.parse(req.body);

      const client = await mongoClientPromise;
      const collection = client
        .db()
        .collection<InsurancePolicy>('InsurancePolicy');

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: policy },
        { upsert: true, returnDocument: 'after' }
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.sendStatus(400);
      }

      const client = await mongoClientPromise;
      const collection = client
        .db()
        .collection<InsurancePolicy>('InsurancePolicy');

      const result = await collection.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.acknowledged) {
        return res.sendStatus(200);
      }

      res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  });

export const InsurancePolicyRouter = router;
