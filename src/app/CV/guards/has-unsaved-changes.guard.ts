import { CanDeactivateFn } from '@angular/router';
import {AddCvComponent} from "../add-cv/add-cv.component";

export const hasUnsavedChangesGuard: CanDeactivateFn<AddCvComponent> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
