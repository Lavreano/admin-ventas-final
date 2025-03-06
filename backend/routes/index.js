import usersRouter from './usersRouter.js'
import productsRouter from './productsRouter.js'
import salesRouter from './salesRouter.js'
import paymentsRouter from './paymentsRouter.js'


export function routerAPI(app){
    app.use('/products', productsRouter);
    app.use('/users', usersRouter);
    app.use('/sales', salesRouter);
    app.use('/payments', paymentsRouter);
}