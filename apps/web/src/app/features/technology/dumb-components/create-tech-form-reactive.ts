import {Component, inject, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Ring, Technology} from '../smart-container/technology.type';

@Component({
    selector: 'app-create-tech-form-reactive',
    imports: [
        ReactiveFormsModule
    ],
    template: `
        <form [formGroup]="techForm" (ngSubmit)="onSubmit()">
            <label for="name">Name: </label>
            <input class="input" id="name" type="text" formControlName="name">
            <label for="description">Description: </label>
            <textarea rows="5" class="input" id="description" formControlName="description"> </textarea>

            <label for="ring">Ring: </label>
            <select class="input" id="ring" formControlName="ring">
                <option [ngValue]="null" disabled>Select ring…</option>
                @for (value of RING_VALUES; track value) {
                    <option [ngValue]="value">{{ value }}</option>
                }
            </select>


            <input class="input" type="submit" [disabled]="!techForm.valid">

        </form>
        <p>Form Status: {{ techForm.status }}</p>
    `,
})
export class CreateTechFormReactive {
    private formBuilder: FormBuilder = inject(FormBuilder);
    RING_VALUES = Object.values(Ring) as readonly Ring[];
    techForm = this.formBuilder.group(
        {
            name: ['', [Validators.required, Validators.maxLength(20)]],
            description: ['', [Validators.required, Validators.maxLength(200)]],
            ring: ['']
        }
    );

    onSubmit() {

        this.onFormSubmitted.emit(this.techForm.value as Technology)
    }

    onFormSubmitted = output<Technology>()
    protected readonly Ring = Ring;
    protected readonly Object = Object;
}
