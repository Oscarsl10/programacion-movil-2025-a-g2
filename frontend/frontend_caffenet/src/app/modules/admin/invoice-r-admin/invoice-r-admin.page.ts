import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comprobante } from 'src/app/common/interfaces/admin/comprobanteReserva';
import { ActivatedRoute } from '@angular/router';
import { ComprobanteAdminService } from 'src/app/common/services/comprobanteReserva-admin';
import { BottomBarAdminComponent } from "../../../shared/components/admin/bottom-bar-admin/bottom-bar-admin.component";
import { IonicModule } from '@ionic/angular';
import { AuthAdminService } from 'src/app/common/services/authAdminService';
import { Filesystem, Directory} from '@capacitor/filesystem';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-invoice-r-admin',
  templateUrl: './invoice-r-admin.page.html',
  styleUrls: ['./invoice-r-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomBarAdminComponent]
})
export class InvoiceRAdminPage {

  @ViewChild('invoiceContent', { static: false }) invoiceContent!: ElementRef;
  comprobante?: Comprobante;
  errorMsg?: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private compService: ComprobanteAdminService,
    private authService: AuthAdminService
  ) { }

  ionViewWillEnter() {
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

  async exportPDFAndOpen() {
    const element = this.invoiceContent.nativeElement;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const grayscaleCanvas = document.createElement('canvas');
    const ctx = grayscaleCanvas.getContext('2d');
    grayscaleCanvas.width = canvas.width;
    grayscaleCanvas.height = canvas.height;

    const imgData = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height);
    if (ctx && imgData) {
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    const imgDataURL = grayscaleCanvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a5');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const usableWidth = pageWidth - 2 * margin;
    const imgProps = pdf.getImageProperties(imgDataURL);
    const imgHeight = (imgProps.height * usableWidth) / imgProps.width;

    pdf.addImage(imgDataURL, 'PNG', margin, 10, usableWidth, imgHeight);
    const pdfOutput = pdf.output('datauristring');
    const base64Data = pdfOutput.split(',')[1];

    const fileName = `comprobante_${this.comprobante?.id || 'temp'}.pdf`;

    const saved = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents,

    });

    if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
      await FileOpener.openFile({
        path: saved.uri,
        mimeType: 'application/pdf',
      });
    } else {
      // En web simplemente abre en nueva pestaña
      const win = window.open();
      win?.document.write(`<iframe src="${pdfOutput}" frameborder="0" style="width:100%;height:100%"></iframe>`);
    }
  }
}
