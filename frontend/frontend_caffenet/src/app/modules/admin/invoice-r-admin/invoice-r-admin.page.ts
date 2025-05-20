import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent } from '@ionic/angular/standalone';
import { Comprobante } from 'src/app/common/interfaces/admin/comprobanteReserva';
import { ActivatedRoute } from '@angular/router';
import { ComprobanteAdminService } from 'src/app/common/services/comprobanteReserva-admin';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { IonicModule } from '@ionic/angular';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthAdminService } from 'src/app/common/services/authAdminService';

@Component({
  selector: 'app-invoice-r-admin',
  templateUrl: './invoice-r-admin.page.html',
  styleUrls: ['./invoice-r-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomBarAdminComponent]
})
export class InvoiceRAdminPage implements OnInit {

  @ViewChild('invoiceContent', { static: false }) invoiceContent!: ElementRef;
  comprobante?: Comprobante;
  errorMsg?: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private compService: ComprobanteAdminService,
    private authService: AuthAdminService
  ) { }

  ngOnInit() {
    this.authService.requireLogin(); // Verifica si el usuario está logueado
    const pagoId = Number(this.route.snapshot.paramMap.get('pagoId'));
    this.compService.generarComprobante(pagoId).subscribe(genResp => {
      if (!genResp.status) {
        this.errorMsg = genResp.message;
        this.loading = false;
        return;
      }
      this.compService.obtenerPorPago(pagoId).subscribe(getResp => {
        if (getResp.status && getResp.data) {
          this.comprobante = getResp.data;
        } else {
          this.errorMsg = getResp.message;
        }
        this.loading = false;
      }, () => {
        this.errorMsg = 'Error al obtener comprobante';
        this.loading = false;
      });
    }, () => {
      this.errorMsg = 'Error al generar comprobante';
      this.loading = false;
    });
  }

  exportPDF() {
    if (!this.invoiceContent) return;

    const element = this.invoiceContent.nativeElement;

    html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff'
    }).then(originalCanvas => {
      // Crear lienzo blanco y negro
      const grayscaleCanvas = document.createElement('canvas');
      const ctx = grayscaleCanvas.getContext('2d');
      grayscaleCanvas.width = originalCanvas.width;
      grayscaleCanvas.height = originalCanvas.height;

      const imgData = originalCanvas.getContext('2d')?.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
      if (ctx && imgData) {
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        ctx.putImageData(imgData, 0, 0);
      }

      const imgDataURL = grayscaleCanvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a5'); // A5 vertical

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const usableWidth = pageWidth - 2 * margin;

      const imgProps = pdf.getImageProperties(imgDataURL);
      const imgHeight = (imgProps.height * usableWidth) / imgProps.width;

      pdf.addImage(imgDataURL, 'PNG', margin, 10, usableWidth, imgHeight);
      pdf.save(`comprobante_${this.comprobante?.id}.pdf`);
    });
  }
}
