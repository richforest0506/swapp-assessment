package swapp.controller;

import swapp.InvoiceGenerator;
import swapp.model.User;
import swapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.itextpdf.text.DocumentException;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin("http://localhost:3000/")

@RestController

@RequestMapping("api/")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/users")
  public List<User> getUsers() {
    return this.userRepository.findAll();
  }

  @GetMapping("/invoice")
  public String printInvoice(@RequestParam("ids") long[] idsParam) throws DocumentException, IOException {
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd_HH-mm-ss");
    String fileName = "invoice_" + dateFormatter.format(LocalDateTime.now()) + ".pdf";

    List<User> users = new ArrayList<>();
    for (long id : idsParam) {
      Optional<User> user = userRepository.findById(id);
      if (user.isPresent())
        users.add(user.get());
    }

    InvoiceGenerator invoiceGenerator = new InvoiceGenerator(users);
    invoiceGenerator.generate(fileName);
    return fileName;
  }

  @GetMapping("/download/{fileName:.+}")
  public void downloadPDF(HttpServletRequest request, HttpServletResponse response,
      @PathVariable("fileName") String fileName) throws IOException {

    File file = new File("./invoices/" + fileName);
    if (file.exists()) {

      String mimeType = URLConnection.guessContentTypeFromName(file.getName());
      if (mimeType == null) {
        mimeType = "application/octet-stream";
      }

      response.setContentType(mimeType);
      response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
      response.setContentLength((int) file.length());

      InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
      FileCopyUtils.copy(inputStream, response.getOutputStream());
    }
  }
}
