import {Component, inject, OnInit, signal} from '@angular/core';
import {TechService} from '../services/tech.service';
import {Technology} from '../technology.type';
import {TechTable} from '../dumb-components/tech-table';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog.component';

@Component({
  selector: 'list-tech',
  imports: [
    TechTable,
    ConfirmDialogComponent
  ],
  template: `
    <app-tech-table [technologies]="technologies()" (onDelete)="openDeleteDialog($event)"
                    (onPublish)="publishTech($event)"/>

    <app-confirm-dialog
      [isOpen]="showDeleteDialog"
      (confirm)="deleteSelectedItem()"
      (cancel)="cancelDeleteDialog()"
      [title]="'Delete ' + selectedItem?.name + '?'"
      [message]="'This action cannot be undone.'"
      confirmText="Delete"
      cancelText="Cancel"
    />
  `,

})
export class ListTech implements OnInit {
  techService = inject(TechService)
  selectedItem: Technology | null = null
  showDeleteDialog = false;
  technologies = signal<Technology[]>([]);

  fetchTechnologies() {
    this.techService.getTechnologies().subscribe((techs) => {
      this.technologies.set(techs)
      console.log(techs)
    })
  }

  publishTech(tech: Technology) {
    if (tech.id == null) {
      return
    }
    if (this.techIsReadyForPublish(tech)) {
      this.techService.publish(tech.id).subscribe(() => {
        this.selectedItem = null;
        this.fetchTechnologies()
      });
    } else {
      alert("Technology is not ready for publish. Please make sure it has a ring, category, and description.")
    }
  }

  private techIsReadyForPublish(tech: Technology): boolean {
    return tech.ring != null && tech.category != null && tech.description != null && tech.description.trim() !== "";
  }

  ngOnInit() {
    this.fetchTechnologies()
  }

  openDeleteDialog(tech: Technology) {
    this.selectedItem = tech;
    this.showDeleteDialog = true;
  }

  cancelDeleteDialog() {
    this.selectedItem = null;
    this.showDeleteDialog = false;
  }

  deleteSelectedItem() {
    if (this.selectedItem?.id != null)
      this.techService.deleteTechnology(this.selectedItem?.id).subscribe(() => {
        this.showDeleteDialog = false;
        this.selectedItem = null;
        this.fetchTechnologies()
      });
  }

}
