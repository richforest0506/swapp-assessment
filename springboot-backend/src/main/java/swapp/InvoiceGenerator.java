package swapp;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import swapp.model.*;

public class InvoiceGenerator {
  private List<User> lstUser;

  public InvoiceGenerator(List<User> lstUser) {
    super();
    this.lstUser = lstUser;
  }

  public void printTableData(PdfPTable table) {
    PdfPCell cell = new PdfPCell();
    int totalAmount = 0;

    for (User user : lstUser) {
      cell.setPhrase(new Phrase(user.getName()));
      cell.setHorizontalAlignment(Element.ALIGN_LEFT);
      cell.setBorder(Rectangle.NO_BORDER);
      cell.setFixedHeight(30f);
      table.addCell(cell);

      cell.setPhrase(new Phrase(String.valueOf(user.getAmount())));
      cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
      cell.setBorder(Rectangle.NO_BORDER);
      cell.setFixedHeight(30f);
      table.addCell(cell);
      totalAmount += user.getAmount();
    }

    // Print Total Amount
    com.itextpdf.text.Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
    cell.setPhrase(new Phrase("Total Amount:", font));
    cell.setHorizontalAlignment(Element.ALIGN_LEFT);
    cell.setVerticalAlignment(Element.ALIGN_BOTTOM);
    cell.setBorder(Rectangle.TOP);
    cell.setFixedHeight(30f);
    table.addCell(cell);

    cell.setPhrase(new Phrase(String.valueOf(totalAmount), font));
    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
    cell.setVerticalAlignment(Element.ALIGN_BOTTOM);
    cell.setBorder(Rectangle.TOP);
    cell.setFixedHeight(30f);
    table.addCell(cell);
  }

  public void generate(String fileName) throws DocumentException, IOException {

    File directory = new File("./invoices");
    if (!directory.exists())
      directory.mkdir();
    FileOutputStream fos = new FileOutputStream("./invoices/" + fileName);

    Document document = new Document(PageSize.A4);
    PdfWriter.getInstance(document, fos);
    document.open();
    com.itextpdf.text.Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
    Paragraph title = new Paragraph("Invoice", font);
    title.setAlignment(Paragraph.ALIGN_CENTER);
    title.setSpacingAfter(30f);
    document.add(title);

    PdfPTable table = new PdfPTable(2);
    table.setWidthPercentage(80f);

    printTableData(table);

    document.add(table);

    document.close();

    fos.close();
  }
}

