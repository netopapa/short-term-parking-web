import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { TranslationPipe } from './translation.pipe';

@NgModule({
  imports: [
    CommonModule, MatInputModule, MatSelectModule
  ],
  declarations: [TranslationPipe],
  exports: [TranslationPipe]
})
export class TranslationPipeModule { }
