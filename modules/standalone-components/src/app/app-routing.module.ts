import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';

// TODO: register the routes in main.ts, remove this module too
const routes: Route[] = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(comp => comp.AboutComponent)
        // component: AboutComponent,
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/routes').then(
                (mod) => mod.DASHBOARD_ROUTES
            )
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
