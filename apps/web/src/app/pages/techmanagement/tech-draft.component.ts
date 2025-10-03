import {Component} from '@angular/core';
import {CreateNewTechnology} from '../../features/technology/smart-container/create-new-technology';
import {CreateDraftTechnology} from '../../features/technology/smart-container/create-draft-technology';

@Component({
  selector: "app-tech-add",
  template: `
    <create-draft-technology/>
  `,
  imports: [
    CreateDraftTechnology
  ]
})
export class TechDraftComponent {


}
