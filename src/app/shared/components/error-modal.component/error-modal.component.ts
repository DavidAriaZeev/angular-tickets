import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-error-modal',
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent
  implements AfterViewInit, OnDestroy {

  /** signal inputs */
  readonly title = input.required<string>();
  readonly message = input.required<string>();

  /** close output */
  readonly clickClose = output<void>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private modalInstance: any;

  ngAfterViewInit(): void {
    const modalEl = this.host.nativeElement.querySelector('.modal');

    this.modalInstance = new bootstrap.Modal(modalEl, {
      backdrop: 'static',
      keyboard: false
    });

    // פותח אוטומטית כשנוצר
    this.modalInstance.show();
  }

  protected close(): void {
    this.modalInstance?.hide();
    this.clickClose.emit();
  }

  ngOnDestroy(): void {
    this.modalInstance?.dispose();
  }
}
