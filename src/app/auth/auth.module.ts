import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(
            [
                { path: '', component: AuthComponent }
            ]
        ),
        SharedModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {

}