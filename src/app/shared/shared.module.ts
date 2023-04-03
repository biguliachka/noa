import { NgModule } from '@angular/core'

// @ts-ignore
import { MatDialogModule } from '@angular/material/dialog';

// @ts-ignore
import { MatFormFieldModule } from '@angular/material/form-field';
// @ts-ignore
import { MatInputModule } from '@angular/material/input';
// @ts-ignore
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL = [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
]

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class SharedModule { }
