import { lazyRetry } from './retry';
const Home = lazyRetry(() => import(/* webpackChunkName: "Home" */ 'pages/Home'));
const Search = lazyRetry(() => import(/* webpackChunkName: "Search" */ 'pages/Search'));
const Product = lazyRetry(() => import(/* webpackChunkName: "Product" */ 'pages/Product'));

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/items",
        component: Search
    },
    {
        path: "/items/:id",
        component: Product
    }
];

export default routes;
