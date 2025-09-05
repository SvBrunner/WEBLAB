import {Component, inject, OnInit, signal} from '@angular/core';
import {TechService} from '../services/tech.service';
import {Technology} from './technology.type';
import {TechTable} from '../dumb-components/tech-table';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog.component';

@Component({
  selector: 'list-tech',
  imports: [
    TechTable,
    ConfirmDialogComponent
  ],
  template: `
    <app-tech-table [technologies]="technologies()" (onDelete)="openDeleteDialog($event)"/>

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
  technologies = signal<Technology[]>([]);
  selectedItem: Technology | null = null
  showDeleteDialog = false;

  fetchTechnologies() {
    this.techService.getTechnologies().subscribe((techs) => {
      this.technologies.set(techs)
      console.log(techs)
    })
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
