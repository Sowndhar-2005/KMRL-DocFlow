import { Router } from 'express';
import documentRoutes from './documentRoutes.js';
import searchRoutes from './searchRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import databaseAdminRoutes from './databaseAdminRoutes.js';

const apiRouter = Router();

// Mount route slices
apiRouter.use('/documents', documentRoutes);
apiRouter.use('/search', searchRoutes);
apiRouter.use('/database', databaseAdminRoutes);
apiRouter.use('/', analyticsRoutes);

export default apiRouter;
