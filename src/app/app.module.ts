import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Import the standalone AppComponent
import { bootstrapApplication } from '@angular/platform-browser'; // Import bootstrapApplication function

@NgModule({
  imports: [BrowserModule],
  providers: [],
})
export class AppModule {}

// Bootstrap the standalone component using bootstrapApplication
bootstrapApplication(AppComponent);
