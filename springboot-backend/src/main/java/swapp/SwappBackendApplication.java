package swapp;

import swapp.model.User;
import swapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SwappBackendApplication implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(SwappBackendApplication.class, args);
  }

  @Autowired
  private UserRepository userRepository;

  @Override
  public void run(String... args) throws Exception {
    this.userRepository.save(new User("James", 1000));
    this.userRepository.save(new User("Tom", 1500));
    this.userRepository.save(new User("Tony", 1200));
    this.userRepository.save(new User("Alex", 1400));
    this.userRepository.save(new User("Hilton", 1100));
  }
}
