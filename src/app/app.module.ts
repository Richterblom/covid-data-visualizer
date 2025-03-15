import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent, // Root component
    GraphComponent, // Graph component
  ],
  imports: [
    HttpClientModule,
    BrowserModule, // Required for bootstrapping the app
    AppRoutingModule, // Your routing module (if any)
    BrowserAnimationsModule, // Animation support (optional)
  ],
  providers: [],
  bootstrap: [AppComponent], // Specify the root component
})
export class AppModule {}
