import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import { ParkingSessionInput } from '../interfaces/htmlInterface';

@Injectable()
export class PdfGenerationService {
  async generateInvoicePdf(
    data: ParkingSessionInput,
    savePath: string,
    htmlPath: string,
  ) {
    let browser;

    try {
      // Connect to browserless
      browser = await puppeteer.connect({
        browserWSEndpoint: process.env.PUPPETEER_ENDPOINT,
        protocolTimeout: 120000, // Increase timeout to 120 seconds
      });

      const page = await browser.newPage();

      // Read and modify HTML content
      let htmlContent = fs.readFileSync(htmlPath, 'utf8');
      htmlContent = htmlContent
        .replace(/##MALL##/g, data.name || '')
        .replace(/##INVOICE##/g, data.invoice || '')
        .replace(/##DATE##/g, data.date || '')
        .replace(/##VEH_NUM##/g, data.VEH_NUM || '')
        .replace(/##ENTRY_TIME##/g, JSON.stringify(data.entryTime) || '')
        .replace(/##EXIT_TIME##/g, JSON.stringify(data.exitTime) || '')
        .replace(/##DURATION##/g, JSON.stringify(data.duration) || '')
        .replace(/##TOTAL_AMOUNT##/g, JSON.stringify(data.totalamount) || '')
        .replace(/##MALL_ADDRESS##/g, data.mallAddress || '')
        .replace(/##PARKING_LEVEL##/g, data.levelCode || '');

      // Optionally, log the modified HTML content for debugging
      console.log('Modified HTML Content:', htmlContent);

      // Set the content of the page with a longer timeout and better wait conditions
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle2', // Wait for network activity to settle
        timeout: 120000, // Increase timeout to 120 seconds
      });

      // Generate PDF with a longer timeout
      await page.pdf({
        path: savePath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
        timeout: 120000, // Increase timeout for PDF generation
      });

      console.log('Invoice PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);

      // Enhanced error handling
      if (error.message.includes('Protocol error')) {
        console.error(
          'Puppeteer protocol error detected. Please check the browser instance configuration.',
        );
      } else if (error.message.includes('timeout')) {
        console.error(
          'The operation timed out. Increase the timeout or check the resource limits.',
        );
      } else if (error.message.includes('Target closed')) {
        console.error(
          'The browser instance was closed unexpectedly. Check resource limits or browser configuration.',
        );
      }

      throw new Error(`Failed to generate invoice PDF: ${error.message}`);
    } finally {
      // Ensure the browser is closed, even if an error occurs
      if (browser) {
        try {
          await browser.close();
        } catch (closeError) {
          console.error('Error closing browser:', closeError);
        }
      }
    }
  }
}
