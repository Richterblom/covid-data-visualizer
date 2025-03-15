import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component'; // Import the GraphComponent

const routes: Routes = [
  { path: '', redirectTo: '/graph', pathMatch: 'full' }, // Set default route to GraphComponent
  { path: 'graph', component: GraphComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
