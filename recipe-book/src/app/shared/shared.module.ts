import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DropdownDirective} from "./dropdown.directive";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {AlertComponent} from "./alert/alert.component";

@NgModule({
  declarations: [
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ]
})
export class SharedModule {

}
