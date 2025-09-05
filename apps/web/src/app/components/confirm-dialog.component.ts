import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <div class="modal" [class.is-active]="isOpen" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div class="modal-background" (click)="onCancel()"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p id="confirm-title" class="modal-card-title">
            {{ title }}
          </p>
          <button type="button" class="delete" aria-label="close" (click)="onCancel()"></button>
        </header>

        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success" (click)="onConfirm()">{{ confirmText || 'Confirm' }}</button>
            <button class="button" (click)="onCancel()"> {{ cancelText || 'Cancel' }}</button>
          </div>
        </footer>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm action';
  @Input() message = 'Are you sure you want to continue?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
